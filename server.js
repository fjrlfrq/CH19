const express = require('express') 
const bodyParser = require('body-parser')
const fs = require('fs')
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

const path = require('path')

const port = 3000

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//template engine
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index', {daftar: data})
})

app.get('/add', (req, res) => {
  res.render('add')
})

app.post('/add', (req, res) => {
  data.push({ string: req.body.string, integer: req.body.integer, float: req.body.float, dtes: req.body.dtes, dte: req.body.dte, boolean: req.body.boolean });  
  fs.writeFileSync("data.json", JSON.stringify(data), "utf-8")
  res.redirect('/')
})

app.get('/delete/:id', (req, res) => {
  const index = req.params.id
  data.splice(index, 1)
  fs.writeFileSync("data.json", JSON.stringify(data), "utf-8")
  res.redirect('/')
})

app.get('/edit/:id', (req, res) => {
  const index = req.params.id
  res.render('edit', {item: data[index]})
})

app.post('/edit/:id', (req, res) => {
  const index = req.params.id
  data[index] = {string: req.body.string, integer: req.body.integer, float: req.body.float, dte: req.body.dte, boolean: req.body.boolean}
  fs.writeFileSync("data.json", JSON.stringify(data), "utf-8")
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})