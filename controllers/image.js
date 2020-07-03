const Clarifai = require('clarifai');

const handleAPICall = (req, res) => {
  const app = new Clarifai.App({
    apiKey: '1400ccf87b0a4d7aa663d891820f5799'
  });

  app.models
      .predict(
        "a403429f2ddf4b49b307e318f00e528b", req.body.input)
      .then(data => { res.json(data) });
}

const handleEntryUpdate = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => res.json(entries[0]))
  .catch(err => res.status(400).json('unable to retrieve entries'))
}

module.exports = {
  handleEntryUpdate,
  handleAPICall
}
