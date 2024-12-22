import express from 'express'
    import sqlite3 from 'sqlite3'
    import bodyParser from 'body-parser'
    import cors from 'cors'

    const app = express()
    const port = 3000

    app.use(bodyParser.json())
    app.use(cors())

    const db = new sqlite3.Database(':memory:')

    db.serialize(() => {
      db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT, role TEXT)")
      db.run("CREATE TABLE properties (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, price REAL, address TEXT, duration INTEGER, type TEXT, owner_id INTEGER, latitude REAL, longitude REAL)")
      db.run("CREATE TABLE virtual_tours (id INTEGER PRIMARY KEY AUTOINCREMENT, property_id INTEGER, video_url TEXT)")
      db.run("CREATE TABLE reviews (id INTEGER PRIMARY KEY AUTOINCREMENT, property_id INTEGER, rating INTEGER, comment TEXT)")
    })

    app.post('/api/register', (req, res) => {
      const { name, email, password, role } = req.body
      db.run("INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)", [name, email, password, role], function(err) {
        if (err) {
          res.json({ success: false, message: err.message })
        } else {
          res.json({ success: true, message: 'Inscription réussie', userId: this.lastID })
        }
      })
    })

    app.post('/api/login', (req, res) => {
      const { email, password } = req.body
      db.get("SELECT * FROM users WHERE email =? AND password =?", [email, password], (err, row) => {
        if (err) {
          res.json({ success: false, message: err.message })
        } else if (row) {
          res.json({ success: true, message: 'Connexion réussie', userId: row.id })
        } else {
          res.json({ success: false, message: 'Email ou mot de passe incorrect' })
        }
      })
    })

    app.get('/api/properties', (req, res) => {
      const { price, location, type, duration } = req.query
      let query = "SELECT * FROM properties"
      const params = []
      if (price) {
        query += " WHERE price <=?"
        params.push(price)
      }
      if (location) {
        query += (params.length > 0? " AND" : " WHERE") + " address LIKE?"
        params.push(`%${location}%`)
      }
      if (type) {
        query += (params.length > 0? " AND" : " WHERE") + " type =?"
        params.push(type)
      }
      if (duration) {
        query += (params.length > 0? " AND" : " WHERE") + " duration =?"
        params.push(duration)
      }
      db.all(query, params, (err, rows) => {
        if (err) {
          res.json({ success: false, message: err.message })
        } else {
          res.json(rows)
        }
      })
    })

    app.get('/api/properties/:id', (req, res) => {
      const { id } = req.params
      db.get("SELECT * FROM properties WHERE id =?", [id], (err, row) => {
        if (err) {
          res.json({ success: false, message: err.message })
        } else {
          res.json(row)
        }
      })
    })

    app.post('/api/properties', (req, res) => {
      const { title, description, price, address, duration, type, owner_id, latitude, longitude } = req.body
      db.run("INSERT INTO properties (title, description, price, address, duration, type, owner_id, latitude, longitude) VALUES (?,?,?,?,?,?,?,?,?)", [title, description, price, address, duration, type, owner_id, latitude, longitude], function(err) {
        if (err) {
          res.json({ success: false, message: err.message })
        } else {
          res.json({ success: true, message: 'Propriété ajoutée', propertyId: this.lastID })
        }
      })
    })

    app.put('/api/properties/:id', (req, res) => {
      const { id } = req.params
      const { title, description, price, address, duration, type, latitude, longitude } = req.body
      db.run("UPDATE properties SET title =?, description =?, price =?, address =?, duration =?, type =?, latitude =?, longitude =? WHERE id =?", [title, description, price, address, duration, type, latitude, longitude, id], function(err) {
        if (err) {
          res.json({ success: false, message: err.message })
        } else {
          res.json({ success: true, message: 'Propriété modifiée' })
        }
      })
    })

    app.post('/api/virtual-tours', (req, res) => {
      const { property_id, video_url } = req.body
      db.run("INSERT INTO virtual_tours (property_id, video_url) VALUES (?,?)", [property_id, video_url], function(err) {
        if (err) {
          res.json({ success: false, message: err.message })
        } else {
          res.json({ success: true, message: 'Visite virtuelle ajoutée' })
        }
      })
    })

    app.get('/api/virtual-tours/:id', (req, res) => {
      const { id } = req.params
      db.all("SELECT * FROM virtual_tours WHERE property_id =?", [id], (err, rows) => {
        if (err) {
          res.json({ success: false, message: err.message })
        } else {
          res.json(rows)
        }
      })
    })

    app.post('/api/reviews', (req, res) => {
      const { property_id, rating, comment } = req.body
      db.run("INSERT INTO reviews (property_id, rating, comment) VALUES (?,?,?)", [property_id, rating, comment], function(err) {
        if (err) {
          res.json({ success: false, message: err.message })
        } else {
          res.json({ success: true, message: 'Avis ajouté' })
        }
      })
    })

    app.get('/api/reviews/:id', (req, res) => {
      const { id } = req.params
      db.all("SELECT * FROM reviews WHERE property_id =?", [id], (err, rows) => {
        if (err) {
          res.json({ success: false, message: err.message })
        } else {
          res.json(rows)
        }
      })
    })

    app.listen(port, () => {
      console.log(`Serveur en cours d'exécution sur http://localhost:${port}`)
    })
