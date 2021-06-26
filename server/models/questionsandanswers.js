const db = require('../../database/index.js');

module.exports = {
  updateQuestionHelpful: function (questionId, callback) {
    const sqlString = `UPDATE questions
    SET question_helpfulness = question_helpfulness + 1
    WHERE question_id = ($1)`;
    db.query(sqlString, [questionId], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    })
    // db.query(`SELECT * FROM questions where product_id = '25167'`, (err, results) => {
    //   console.log(results);
    // })
  },
  addQuestion: function () {

  }
};
