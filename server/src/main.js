const express = require('express')
const cors = require('cors')
const initDatabase = require('./database')

function run(port) {
  const app = express()
  const db = initDatabase()

  // cross origin request 
  app.use(cors())

  app.get('/', (req, res) => {
    res.json({
      hello: 'From Pokedex API'
    })
  })

  app.get('/pokemons', (req, res) => {
    db.select('*').from('pokemons').orderBy('numéro').then(data => {
      res.json(data)
    })
  })

  app.get('/pokemons/:id', (req, res) => {
    var id = req.params.id.slice(-3);
    db.select('*').from('pokemons').where('numéro', '=', id).orderBy('numéro').then(data => {
      res.json(data)
    })
    //res.json({
    //  id: req.params.id,
    //  firstname: "Majdi",
    //  lastname: "Toumi"
    //})
  })
  
  app.listen(port, () => {
    console.log(`✨ Server is listening on port ${port}`)
  })
}

/**
 * Entry point
 */
// ["node", "src/main.js", "4242"] -> ["4242"]
const args = process.argv.slice(2)
if (args.length !== 1) {
  console.log("Usage: node src/main.js <port>")
  process.exit(0)
}

const port = args[0]
run(parseInt(port, 10))
