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
  },
  addQuestion: function (questionBody, callback) {
    const { name, email, body, product_id } = questionBody;
    const sqlString = `
      INSERT INTO questions (question_body, question_date, asker_name, asker_email, product_id)
      VALUES ($1, current_timestamp, $2, $3, $4)
      `;
    db.query(sqlString, [body, name, email, product_id], (err, results) => {
      console.log('sqlString', sqlString)
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    })
  }
};
