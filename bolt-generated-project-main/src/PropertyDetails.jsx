import React, { useState, useEffect } from 'eact'
    import { useParams } from 'eact-router-dom'
    import axios from 'axios'

    function PropertyDetails() {
      const { id } = useParams()
      const [property, setProperty] = useState(null)
      const [virtualTour, setVirtualTour] = useState(null)
      const [reviews, setReviews] = useState([])
      const [ownerReviews, setOwnerReviews] = useState([])

      useEffect(() => {
        axios.get(`/api/properties/${id}`)
      .then(response => {
            setProperty(response.data)
            axios.get(`/api/virtual-tours/${id}`)
          .then(response => setVirtualTour(response.data))
          .catch(error => console.error(error))
          })
      .catch(error => console.error(error))
      }, [id])

      useEffect(() => {
        axios.get(`/api/reviews/${id}`)
      .then(response => setReviews(response.data))
      .catch(error => console.error(error))
      }, [id])

      useEffect(() => {
        axios.get(`/api/owner-reviews/${id}`)
      .then(response => setOwnerReviews(response.data))
      .catch(error => console.error(error))
      }, [id])

      if (!property) {
        return <div>Chargement...</div>
      }

      return (
        <div>
          <h2>{property.title}</h2>
          <p>{property.description}</p>
          <p>Prix: {property.price} €/mois</p>
          <p>Adresse: {property.address}</p>
          <p>Durée de location: {property.duration} mois</p>
          <p>Type de logement: {property.type}</p>
          <button>Contactez le propriétaire</button>
          <button>Réserver</button>
          {virtualTour && (
            <div>
              <h3>Visite virtuelle</h3>
              <VirtualTour tour={virtualTour} />
            </div>
          )}
          <h3>Avis et commentaires des locataires</h3>
          <Reviews reviews={reviews} propertyId={id} />
          <h3>Avis et commentaires des propriétaires</h3>
          <OwnerReviews reviews={ownerReviews} propertyId={id} />
        </div>
      )
    }

    export default PropertyDetails
