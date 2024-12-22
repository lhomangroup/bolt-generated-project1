import React, { useState } from 'eact'
    import axios from 'axios'
    import { useParams } from 'eact-router-dom'

    function Reviews({ reviews, propertyId }) {
      const [rating, setRating] = useState(0)
      const [comment, setComment] = useState('')
      const { id } = useParams()

      const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`/api/reviews/${propertyId}`, { rating, comment })
       .then(response => {
            if (response.data.success) {
              alert('Avis ajouté avec succès')
              window.location.reload()
            } else {
              alert('Échec de l\'ajout de l\'avis')
            }
          })
       .catch(error => console.error(error))
      }

      return (
        <div>
          <h3>Avis et commentaires</h3>
          <ul>
            {reviews.map(review => (
              <li key={review.id}>
                <strong>Note:</strong> {review.rating}<br />
                <strong>Commentaire:</strong> {review.comment}
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <label>Note:</label>
            <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} required />
            <br />
            <label>Commentaire:</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
            <br />
            <button type="submit">Ajouter l'avis</button>
          </form>
        </div>
      )
    }

    export default Reviews
