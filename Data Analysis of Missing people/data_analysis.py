import pandas as pd
import json
from collections import defaultdict

# Load the CSV file into a DataFrame
file_path = "cleandata.csv"  # Replace with your CSV file path
df = pd.read_csv(file_path)

# Initialize the nested dictionary structure
data = defaultdict(lambda: defaultdict(lambda: {"noofMissing": 0, "address": []}))

# Process the DataFrame
for _, row in df.iterrows():
    state = row["State"]
    district = row["Dist"]
    address = row["Address"]
    
    # Update the count of missing people and add the address
    data[state][district]["noofMissing"] += 1
    data[state][district]["address"].append(address)

# Convert defaultdict to a normal dict for JSON serialization
final_data = {state: [{"district": {district: info}} for district, info in districts.items()] for state, districts in data.items()}

# Save the final JSON to a file
output_file = "output.json"
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(final_data, f, indent=4, ensure_ascii=False)

print(f"JSON data has been saved to {output_file}")
