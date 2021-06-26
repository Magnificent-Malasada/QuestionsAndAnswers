DROP DATABASE IF EXISTS QuestionsAndAnswers;

CREATE DATABASE QuestionsAndAnswers;

USE QuestionsAndAnswers;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  question_date_ms BIGINT NOT NULL,
  question_date DATE,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(50) NOT NULL,
  question_helpfulness INTEGER,
  question_reported BOOLEAN
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  answer_body VARCHAR(1000) NOT NULL,
  answer_date_ms BIGINT NOT NULL,
  answer_date DATE,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(50) NOT NULL,
  answer_helpfulness INTEGER,
  answer_reported BOOLEAN,
  question_id INTEGER REFERENCES questions (id)
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY NOT NULL,
  url VARCHAR(2000) NOT NULL,
  answer_id INTEGER REFERENCES answers (id)
)

-- ETL

\COPY questions(id, product_id, question_body, question_date_ms, asker_name, asker_email, question_reported, question_helpfulness)
FROM '/Users/jennngai/Downloads/questions.csv'
DELIMITER ','
CSV HEADER;

-- GET list of question per product id
SELECT json_agg(t)
FROM (
  SELECT
    questions.id as [results.question_id],
    questions.product_id as product_id,
    questions.question_body as [results.question_body],
    questions.question_date as [results.question_date],
    questions.asker_name as [results.asker_name],
    questions.question_helpfulness as [results.question_helpfulness]
    questions.question_reported as [results.reported]
    answers.id as [results.answers]
    answers.answer_body as [results.answers.body]
    answers.answer_date as [results.answers.date]
    answers.answerer_name as [results.answers.answerer_name]
    answers.answer_helpfulness as [results.answers.helpfulness]
    photos.url as [results.answers.photos]
  FROM
    questions
  INNER JOIN answers ON answers.question_id = questions.id
  INNER JOIN photos ON photos.answer_id = answers.id
  WHERE product_id = 25167
) t;

-- test

SELECT json_agg(questions)
FROM (
  SELECT *
  FROM
    questions
  INNER JOIN answers ON answers.question_id = questions.question_id
  INNER JOIN photos ON photos.answer_id = answers.answer_id
  WHERE product_id = 25167
) as questions;

 -- GET list of answers per question id


-- PUT updates answer to show it has been reported

UPDATE answers
SET answer_reported = NOT answer_reported
WHERE answer_id = :id

-- PUT updates answer to show it was helpful

UPDATE answers
SET answer_helpfulness = answer_helpfulness + 1
WHERE id = :id

-- PUT updates question to show it was helpful

UPDATE questions
SET question_helpfulness = question_helpfulness + 1
WHERE id = :id

-- POST an answer for a given question

BEGIN;
INSERT INTO answers (answer_body, answer_date, answerer_name, answerer_email)
VALUES (body, current_timestamp, name, email)

INSERT INTO photos (url)
VALUES (photos)
COMMIT;

-- POST a question for a given product

INSERT INTO questions (question_body, question_date, asker_name, asker_email)
VALUES (body, current_timestamp, name, email)
WHERE product_id = product_id;




