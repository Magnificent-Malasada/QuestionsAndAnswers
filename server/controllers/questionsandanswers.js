const models = require('../models/questionsandanswers.js');
const modelsGetQuestions = require('../models/getQuestionsByProductId.js');

module.exports = {
  putQuestionHelpful: function (req, res) {
    console.log('req.params', req.params)
    let question_id = req.params.question_id;
    models.updateQuestionHelpful(question_id, (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  },
  postQuestion: function (req, res) {
    models.addQuestion(req.body, (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send('Created')
      }
    })
  },
  getAllQuestions: function (req, res) {
    modelsGetQuestions(req.query, (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  }
};