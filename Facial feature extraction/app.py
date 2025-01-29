from flask import Flask, request, jsonify
import cv2
import numpy as np
from deepface import DeepFace
from sklearn.cluster import KMeans
import os

app = Flask(__name__)

# Folder where uploaded images will be stored temporarily
UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def analyze_image(image_path):
    # Load the image
    img = cv2.imread(image_path)
    rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Analyze gender, race, age, and emotion using DeepFace
    print("[INFO] Analyzing features...")
    results = DeepFace.analyze(rgb_img, actions=['gender', 'race', 'age', 'emotion'], enforce_detection=False)
    
    # If results are a list (multiple faces detected), process the first one
    if isinstance(results, list):
        result = results[0]  # Use the first result if there are multiple faces
        gender = result['gender']
        dominant_race = result['dominant_race']
        age = result['age']
        emotion = result['dominant_emotion']
    else:
        gender = results['gender']
        dominant_race = results['dominant_race']
        age = results['age']
        emotion = results['dominant_emotion']

    # Update race classification to include "Indian"
    if dominant_race.lower() == 'asian':
        dominant_race = 'Indian'  # Mapping 'Asian' to 'Indian' for simplicity

    # Detect face using OpenCV
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    faces = face_cascade.detectMultiScale(img, scaleFactor=1.1, minNeighbors=5)

    if len(faces) == 0:
        print("[ERROR] No face detected.")
        return {
            "error": "No face detected in the image"
        }

    # Assume one face for simplicity; you can extend this to handle multiple faces
    for (x, y, w, h) in faces:
        face = img[y:y + h, x:x + w]

        # Detect skin color
        skin_color = detect_skin_color(face)

        # Detect eye color
        eye_color = detect_eye_color(face)

        # Return results
        return {
            "gender": gender,
            "race": dominant_race,
            "age": age,
            "emotion": emotion,
            "skin_color": skin_color,
            "eye_color": eye_color
        }


def detect_skin_color(face):
    """
    Estimate the skin color using the dominant color in the central region of the face and classify as light, medium, or dark.
    """
    h, w, _ = face.shape
    center_face = face[h // 3: 2 * h // 3, w // 3: 2 * w // 3]  # Central region of the face
    reshaped_data = center_face.reshape((-1, 3))

    # Use KMeans clustering to find the dominant color
    kmeans = KMeans(n_clusters=1, random_state=42)
    kmeans.fit(reshaped_data)
    dominant_color = kmeans.cluster_centers_[0]

    # Normalize the color to a scale of 0 to 255 and compute the average brightness
    avg_brightness = np.mean(dominant_color)

    # Classify skin color based on brightness (this is a heuristic approach)
    if avg_brightness < 85:
        return "Dark"
    elif avg_brightness < 170:
        return "Medium"
    else:
        return "Light"


def detect_eye_color(face):
    """
    Detect eye color by focusing on the eye region and analyzing the dominant color.
    """
    gray = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
    eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_eye.xml")
    eyes = eye_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

    if len(eyes) == 0:
        return "Unable to detect eyes"

    eye_colors = []
    for (ex, ey, ew, eh) in eyes:
        eye_region = face[ey:ey + eh, ex:ex + ew]
        reshaped_data = eye_region.reshape((-1, 3))

        # Use KMeans to detect the dominant eye color
        kmeans = KMeans(n_clusters=1, random_state=42)
        kmeans.fit(reshaped_data)
        dominant_color = kmeans.cluster_centers_[0]

        # Heuristic for common eye colors based on RGB values
        if np.allclose(dominant_color, [0, 0, 0], atol=40):  # Close to black
            eye_colors.append("Black")
        elif dominant_color[0] > dominant_color[1] and dominant_color[0] > dominant_color[2]:  # Predominantly red (brown)
            eye_colors.append("Brown")
        elif dominant_color[2] > dominant_color[0] and dominant_color[2] > dominant_color[1]:  # Predominantly blue
            eye_colors.append("Blue")
        elif dominant_color[1] > dominant_color[0] and dominant_color[1] > dominant_color[2]:  # Predominantly green
            eye_colors.append("Green")
        else:
            eye_colors.append("Unknown")

    return eye_colors[0] if eye_colors else "Unknown"


@app.route('/analyze', methods=['POST'])
def analyze():
    if 'image' not in request.files:
        return jsonify({"error": "No image part"}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # Save the image to the uploads folder
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(image_path)

    # Process the image using your analyze_image function
    result = analyze_image(image_path)

    # Return the result back to the frontend
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
