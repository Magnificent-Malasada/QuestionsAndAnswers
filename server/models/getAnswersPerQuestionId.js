const db = require('../../database/index.js');

module.exports = function getAnswers(questionId, callback) {
  const sqlString2 = `
  SELECT json_agg(t)
  FROM (
    SELECT
      answers.answer_id,
      answers.answer_body,
      answers.answer_date,
      answers.answerer_name,
      answers.answer_helpfulness
    FROM
      answers
    WHERE question_id = ($1)
  ) t
  `;
  db.query(sqlString2, [questionId], (err, results) => {
    if (err) {
      callback(err)
    } else {
      callback(null, results.rows[0].json_agg)
    }
  })
}