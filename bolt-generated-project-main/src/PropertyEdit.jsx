import React, { useState } from 'eact'
    import axios from 'axios'
    import { useParams, useHistory } from 'eact-router-dom'

    function PropertyEdit() {
      const { id } = useParams()
      const history = useHistory()
      const [title, setTitle] = useState('')
      const [description, setDescription] = useState('')
      const [price, setPrice] = useState('')
      const [address, setAddress] = useState('')
      const [duration, setDuration] = useState('')
      const [type, setType] = useState('meuble')
      const [latitude, setLatitude] = useState('')
      const [longitude, setLongitude] = useState('')

      useEffect(() => {
        axios.get(`/api/properties/${id}`)
       .then(response => {
            setTitle(response.data.title)
            setDescription(response.data.description)
            setPrice(response.data.price)
            setAddress(response.data.address)
            setDuration(response.data.duration)
            setType(response.data.type)
            setLatitude(response.data.latitude)
            setLongitude(response.data.longitude)
          })
       .catch(error => console.error(error))
      }, [id])

      const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`/api/properties/${id}`, {
          title,
          description,
          price: parseFloat(price),
          address,
          duration: parseInt(duration),
          type,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        })
       .then(response => {
            if (response.data.success) {
              alert('Annonce modifiée avec succès')
              history.push(`/properties/${id}`)
            } else {
              alert('Échec de la modification de l\'annonce')
            }
          })
       .catch(error => console.error(error))
      }

      return (
        <div>
          <h2>Éditer une annonce</h2>
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
            <button type="submit">Modifier l'annonce</button>
          </form>
        </div>
      )
    }

    export default PropertyEdit
