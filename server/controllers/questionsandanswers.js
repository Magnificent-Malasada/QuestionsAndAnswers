const models = require('../models/questionsandanswers.js');

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
  }
};