const db = require('../../database/index.js');

module.exports = getQuestionsByProductId = function (queryBody, callback) {
  let { product_id } = queryBody;
  let sqlString = `
  SELECT json_agg(t)
  FROM (
    SELECT
      questions.question_id,
      questions.question_body,
      questions.question_date,
      questions.asker_name,
      questions.question_helpfulness,
      questions.question_reported,
      answers.answer_id,
      answers.answer_body,
      answers.answer_date,
      answers.answerer_name,
      answers.answer_helpfulness,
      photos.url
    FROM
      questions
    INNER JOIN answers ON answers.question_id = questions.question_id
    INNER JOIN photos ON photos.answer_id = answers.answer_id
    WHERE product_id = ($1) AND question_reported = false
  ) t;
  `;
  db.query(sqlString, [product_id], (err, results) => {
    if (err) {
      callback(err)
    } else {
      if (results.rows[0].json_agg === null) {
        callback(null, null);
      } else {
        let allQuestionsPerProductId = results.rows[0].json_agg;
        let transformed = {
          "product_id": product_id.toString(),
          "results": []
        };
        let currentKeysInResultsArray = [];
        let currentAnswerIdArray = [];

        for (let i = 0; i < allQuestionsPerProductId.length; i++) {
          let questionObjectFromDB = allQuestionsPerProductId[i];
          let { question_id, question_body, question_date, asker_name, question_helpfulness, question_reported } = questionObjectFromDB;
          if (currentKeysInResultsArray.indexOf(question_id) === -1) {
            let questionBodyToAdd = {
              "question_id": question_id,
              "question_body": question_body,
              "question_date": question_date,
              "asker_name": asker_name,
              "question_helpfulness": question_helpfulness,
              "question_reported": question_reported,
              "answers": {}
            };
            transformed.results.push(questionBodyToAdd);
          }
          currentKeysInResultsArray.push(question_id);
        }
        for (let j = 0; j < transformed.results.length; j++) {
          let questionBodyInResults = transformed.results[j];
          let { question_id } = questionBodyInResults;
          for (let k = 0; k < allQuestionsPerProductId.length; k++) {
            let questionObjectFromDB = allQuestionsPerProductId[k];
            if (questionObjectFromDB.answer_id && question_id === questionObjectFromDB.question_id && currentAnswerIdArray.indexOf(questionObjectFromDB.answer_id) === -1) {
              let answerBodyToAdd = {
                "answer_id": questionObjectFromDB.answer_id,
                "answer_body": questionObjectFromDB.answer_body,
                "answer_date": questionObjectFromDB.answer_date,
                "answerer_name": questionObjectFromDB.answerer_name,
                "answer_helpfulness": questionObjectFromDB.answer_helpfulness,
                "photos": []
              }
              questionBodyInResults.answers[questionObjectFromDB.answer_id] = answerBodyToAdd;
              currentAnswerIdArray.push(questionObjectFromDB.answer_id);
            }
            if (questionObjectFromDB.answer_id && question_id === questionObjectFromDB.question_id && currentAnswerIdArray.indexOf(questionObjectFromDB.answer_id) > -1) {
              questionBodyInResults.answers[questionObjectFromDB.answer_id].photos.push(questionObjectFromDB.url);
            }
          }
        }
        callback(null, transformed);
      }
    }
  })
};
