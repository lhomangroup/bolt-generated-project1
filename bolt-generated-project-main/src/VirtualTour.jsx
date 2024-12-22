import React, { useState, useEffect } from 'eact'
    import { MapContainer, TileLayer, Marker, Popup } from 'eact-leaflet'
    import axios from 'axios'

    function VirtualTour({ tour }) {
      const [tourData, setTourData] = useState(null)

      useEffect(() => {
        setTourData(tour)
      }, [tour])

      if (!tourData) {
        return <div>Chargement...</div>
      }

      return (
        <MapContainer center={[tourData.latitude, tourData.longitude]} zoom={15} style={{ height: '60vh', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[tourData.latitude, tourData.longitude]}>
            <Popup>
              <h3>{tourData.title}</h3>
              <p>{tourData.description}</p>
              <iframe src={tourData.videoUrl} width="560" height="315" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </Popup>
          </Marker>
        </MapContainer>
      )
    }

    export default VirtualTour
