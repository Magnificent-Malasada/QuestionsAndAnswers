const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || "4000";
const redis = require('redis');
const redis_port = process.env.PORT || "6379";
const client = redis.createClient(redis_port);
const db = require('../database');
const qa = require('./controllers/questionsandanswers.js');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Cache middleware
function cache(req, res, next) {
  const { product_id } = req.query;
  client.get(product_id, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(data);
    } else {
      next();
    }
  })
}

app.get('/qa/questions/', cache, qa.getAllQuestions);

app.put('/qa/questions/:question_id/helpful', qa.putQuestionHelpful);

app.post('/qa/questions', qa.postQuestion);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

module.exports.client = client;