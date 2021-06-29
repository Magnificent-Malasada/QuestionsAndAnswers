const getAnswers = require('./getAnswersPerQuestionId.js');

module.exports = {
  transformData: function (productId, questionsPerProductId, callback) {
    let transformed = {
      "product_id": productId.toString(),
      "results": questionsPerProductId
    };

    for (let i = 0; i < transformed.results.length; i++) {
      let resultsObject = transformed.results[i];
      resultsObject.answers = {};
      let { question_id } = transformed.results[i];
      getAnswers(question_id, (err, answers) => {
        if (err) {
          console.log(err)
        } else {
          console.log(null, answers);
          let answerData = answers;
          if (Array.isArray(answerData)) {
            answerData.forEach((answer) => {
              let { answer_id, answer_body, answer_date, answerer_name, answer_helpfulness } = answer;
              let answerObject = {
                "id": answer_id,
                "body": answer_body,
                "date": answer_date,
                "answerer_name": answerer_name,
                "helpfulness": answer_helpfulness
              }
              //console.log(`resultsObject.answers[${answer_id}]`, resultsObject.answers[`${answer_id}`]);
              resultsObject.answers[answer_id] = answerObject;
              console.log('transformed a', transformed);
              console.log('answers', resultsObject.answers[answer_id]);
            })
            if (i === transformed.results.length - 1) {
              callback(null, transformed)
            }
          }
        }
      })
    }
  }
}