const express = require('express')
const cors = require('cors')
const app = express()
const session = require('express-session')
// var cookieParser = require('cookie-parser')

const port = 3900

app.use(express.json())
app.use(
  cors({
    exposedHeaders: ['set-cookie'],
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1',
      'http://104.142.122.231'
    ]
  })
)
// app.use(cookieParser())
app.use(
  session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 10
    }
  })
)
app.set('trust proxy', 1)

app.post(`/sendDog`, (req, res) => {
  console.log('session: ', req.session.id)
  console.log('session', req.session.user)
  if (!req.session.hasOwnProperty('user')) {
    req.session.user = {
      dogs: [],
      cats: []
    }
  }

  req.session.user.dogs.push(req.body.data)
  console.log(req.session.user)
  req.session.save()

  res.sendStatus(200)
})
app.post(`/sendCat`, (req, res) => {
  if (!req.session.hasOwnProperty('user')) {
    req.session.user = {
      dogs: [],
      cats: []
    }
  }
  req.session.user.cats.push(req.body.data)
  res.sendStatus(200)
})
app.get(`/getAnimals`, (req, res) => {
  const dogs = req.session?.user?.dogs || []
  const cats = req.session?.user?.cats || []
  res.status(200).send([...dogs, ...cats])
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
