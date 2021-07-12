const models = require('../models/questionsandanswers.js');
const modelsGetQuestions = require('../models/getQuestionsByProductId.js');
const redis = require('../index.js');

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
    const { product_id } = req.query;
    modelsGetQuestions(req.query, (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        // Set data to Redis
        redis.client.setex(product_id, 3600, JSON.stringify(data));
        res.status(200).send(data)
      }
    })
  }
};