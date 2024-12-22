import React, { useState } from 'eact'
    import axios from 'axios'

    function Login() {
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')

      const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/login', { email, password })
      .then(response => {
            if (response.data.success) {
              alert('Connexion réussie')
            } else {
              alert('Échec de la connexion')
            }
          })
      .catch(error => console.error(error))
      }

      return (
        <div>
          <h2>Se connecter</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label>Mot de passe:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Se connecter</button>
          </form>
        </div>
      )
    }

    export default Login
