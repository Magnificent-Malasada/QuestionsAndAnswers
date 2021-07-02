const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || "4000";
const db = require('../database');
const qa = require('./controllers/questionsandanswers.js');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/qa/questions/', qa.getAllQuestions);

app.put('/qa/questions/:question_id/helpful', qa.putQuestionHelpful);

app.post('/qa/questions', qa.postQuestion);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});