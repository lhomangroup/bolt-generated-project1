import React, { useState, useEffect } from 'eact'
    import { MapContainer, TileLayer, Marker, Popup } from 'eact-leaflet'
    import axios from 'axios'

    function PropertyMap() {
      const [properties, setProperties] = useState([])

      useEffect(() => {
        axios.get('/api/properties')
      .then(response => setProperties(response.data))
      .catch(error => console.error(error))
      }, [])

      return (
        <MapContainer center={[48.8566, 2.3522]} zoom={12} style={{ height: '100vh', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {properties.map(property => (
            <Marker key={property.id} position={[property.latitude, property.longitude]}>
              <Popup>
                <h3>{property.title}</h3>
                <p>{property.description}</p>
                <p>Prix: {property.price} €/mois</p>
                <p>Adresse: {property.address}</p>
                <p>Durée de location: {property.duration} mois</p>
                <p>Type de logement: {property.type}</p>
                <button>Contactez le propriétaire</button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )
    }

    export default PropertyMap
