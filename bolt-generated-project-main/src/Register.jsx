import React, { useState } from 'eact'
    import axios from 'axios'

    function Register() {
      const [name, setName] = useState('')
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [role, setRole] = useState('locataire')

      const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/register', { name, email, password, role })
      .then(response => {
            if (response.data.success) {
              alert('Inscription réussie')
            } else {
              alert('Échec de l\'inscription')
            }
          })
      .catch(error => console.error(error))
      }

      return (
        <div>
          <h2>S'inscrire</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nom:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label>Mot de passe:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
              <label>Rôle:</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="locataire">Locataire</option>
                <option value="proprietaire">Propriétaire</option>
              </select>
            </div>
            <button type="submit">S'inscrire</button>
          </form>
        </div>
      )
    }

    export default Register
