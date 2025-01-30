"use client"

import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || ""

interface MapComponentProps {
  heatmapData: [number, number, number][]
}

export default function MapComponent({ heatmapData }: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [77.209, 28.6139], // Delhi coordinates
      zoom: 10,
    })

    map.current.on("load", () => {
      map.current!.addSource("heatmap-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      })

      map.current!.addLayer({
        id: "heatmap-layer",
        type: "heatmap",
        source: "heatmap-source",
        paint: {
          "heatmap-weight": ["get", "weight"],
          "heatmap-intensity": 1,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(0, 0, 255, 0)",
            0.2,
            "royalblue",
            0.4,
            "cyan",
            0.6,
            "lime",
            0.8,
            "yellow",
            1,
            "red",
          ],
          "heatmap-radius": 20,
          "heatmap-opacity": 0.8,
        },
      })
    })
  }, [])

  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return

    const features = heatmapData.map(([lng, lat, weight]) => ({
      type: "Feature",
      properties: { weight },
      geometry: {
        type: "Point",
        coordinates: [lng, lat],
      },
    }))

    const source = map.current.getSource("heatmap-source") as mapboxgl.GeoJSONSource
    source.setData({
      type: "FeatureCollection",
      features,
    })

    // Adjust the map view to fit all points
    if (features.length > 0) {
      const bounds = new mapboxgl.LngLatBounds()
      features.forEach((feature) => {
        bounds.extend(feature.geometry.coordinates as [number, number])
      })
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 15 })
    }
  }, [heatmapData])

  return <div ref={mapContainer} className="w-full h-[600px]" />
}

