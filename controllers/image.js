const Clarifai = require('clarifai');

const handleAPICall = (req, res) => {
  const app = new Clarifai.App({
    apiKey: '1400ccf87b0a4d7aa663d891820f5799'
  });

  app.models
      .predict(
        "c0c0ac362b03416da06ab3fa36fb58e3", req.body.input)
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
