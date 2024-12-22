import React, { useState } from 'eact'
    import axios from 'axios'

    function PropertyCreate() {
      const [title, setTitle] = useState('')
      const [description, setDescription] = useState('')
      const [price, setPrice] = useState('')
      const [address, setAddress] = useState('')
      const [duration, setDuration] = useState('')
      const [type, setType] = useState('meuble')
      const [latitude, setLatitude] = useState('')
      const [longitude, setLongitude] = useState('')

      const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/properties', {
          title,
          description,
          price: parseFloat(price),
          address,
          duration: parseInt(duration),
          type,
          owner_id: 1, // Utiliser l'ID de l'utilisateur connecté
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        })
      .then(response => {
            if (response.data.success) {
              alert('Annonce créée avec succès')
            } else {
              alert('Échec de la création de l\'annonce')
            }
          })
      .catch(error => console.error(error))
      }

      return (
        <div>
          <h2>Créer une annonce</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <label>Description:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>
            <div>
              <label>Prix:</label>
              <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div>
              <label>Adresse:</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div>
              <label>Durée de location:</label>
              <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
            </div>
            <div>
              <label>Type de logement:</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="meuble">Meublé</option>
                <option value="non-meuble">Non meublé</option>
              </select>
            </div>
            <div>
              <label>Latitude:</label>
              <input type="number" step="0.0001" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
            </div>
            <div>
              <label>Longitude:</label>
              <input type="number" step="0.0001" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
            </div>
            <button type="submit">Créer l'annonce</button>
          </form>
        </div>
      )
    }

    export default PropertyCreate
