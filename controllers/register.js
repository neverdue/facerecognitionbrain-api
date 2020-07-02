const handleRegister = (req, res, db, bcrypt, saltRounds) => {
  const { name, email, password } = req.body;

  if(!email || !name || !password) {
    return res.status(400).json('invalid request')
  }

  const hashed_pswd = bcrypt.hashSync(password, saltRounds);

  db.transaction(trx => {
    trx.insert({
      email: email,
      hash: hashed_pswd
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0],
          name: name,
          joined: new Date()
        })
        .then(user => {
          res.json(user[0]);
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
    .catch(err => res.status(400).json(`can't register`))
}

module.exports = {
  handleRegister
}
