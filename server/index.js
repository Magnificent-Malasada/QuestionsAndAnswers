const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const db = require('../database');
const qa = require('./controllers/questionsandanswers.js');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.put('/qa/questions/:question_id/helpful', qa.putQuestionHelpful);

// app.post('/qa/questions/:question_id/answers', (req, res) => {
//   console.log(req.params)
//   res.send('Post request success!')
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});