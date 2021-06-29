const db = require('../../database/index.js');
const helper = require('./queryHelpers.js');

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
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    })
  },
  getQuestions: function (queryBody, callback) {
    let { product_id } = queryBody;
    let sqlString1 = `
    SELECT json_agg(t)
    FROM (
      SELECT
        questions.question_id,
        questions.product_id,
        questions.question_body,
        questions.question_date,
        questions.asker_name,
        questions.question_helpfulness,
        questions.question_reported
      FROM
        questions
      WHERE product_id = ($1) AND question_reported = false
      ) t
    `;
    db.query(sqlString1, [product_id], (err, results) => {
      if (err) {
        callback(err)
      } else {
        let allQuestionsPerProductId = results.rows[0].json_agg
        helper.transformData(product_id, allQuestionsPerProductId, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            callback(null, data);
          }
        });
      }
    })
  }
};
