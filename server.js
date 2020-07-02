const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
var knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'facerecognition'
  }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'Mayank',
      email: 'mp.pandey86@gmail.com',
      password: 'random',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Naman',
      email: 'np.naman98@gmail.com',
      password: 'random1',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'mp.pandey86@gmail.com'
    }
  ]
}

app.get('/', (req, res) => { res.send(db.users) });
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, saltRounds) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleEntryUpdate(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleAPICall(req, res) });

app.listen(process.env.PORT, () => {
  console.log('hello i am working fine');
})
