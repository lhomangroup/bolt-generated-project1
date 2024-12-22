import React, { useState, useEffect } from 'eact'
    import { Link } from 'eact-router-dom'
    import axios from 'axios'

    function PropertiesList() {
      const [properties, setProperties] = useState([])
      const [filters, setFilters] = useState({
        price: '',
        location: '',
        type: '',
        duration: ''
      })

      useEffect(() => {
        fetchProperties()
      }, [filters])

      const fetchProperties = () => {
        axios.get('/api/properties', { params: filters })
      .then(response => setProperties(response.data))
      .catch(error => console.error(error))
      }

      const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters(prevFilters => ({
      ...prevFilters,
          [name]: value
        }))
      }

      return (
        <div>
          <h2>Liste des propriétés</h2>
          <form>
            <div>
              <label>Prix:</label>
              <input type="number" name="price" value={filters.price} onChange={handleFilterChange} />
            </div>
            <div>
              <label>Localisation:</label>
              <input type="text" name="location" value={filters.location} onChange={handleFilterChange} />
            </div>
            <div>
              <label>Type de logement:</label>
              <select name="type" value={filters.type} onChange={handleFilterChange}>
                <option value="">Tous</option>
                <option value="meuble">Meublé</option>
                <option value="non-meuble">Non meublé</option>
              </select>
            </div>
            <div>
              <label>Durée de location:</label>
              <select name="duration" value={filters.duration} onChange={handleFilterChange}>
                <option value="">Tous</option>
                <option value="1">1 mois</option>
                <option value="3">3 mois</option>
                <option value="6">6 mois</option>
                <option value="12">12 mois</option>
                <option value="24">24 mois</option>
                <option value="36">36 mois</option>
              </select>
            </div>
          </form>
          <ul>
            {properties.map(property => (
              <li key={property.id}>
                <Link to={`/properties/${property.id}`}>{property.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )
    }

    export default PropertiesList
