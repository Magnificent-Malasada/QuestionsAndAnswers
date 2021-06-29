DROP DATABASE IF EXISTS QuestionsAndAnswers;

CREATE DATABASE QuestionsAndAnswers;

USE QuestionsAndAnswers;

-- table creation

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

-- GET list of question per product id NO reported questions
SELECT json_agg(t)
FROM (
  SELECT
    questions.question_id,
    questions.product_id,
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
  WHERE product_id = 25167 AND question_reported = false
) t;

-- GET part 1/3 select all questions from the product id
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
  WHERE product_id = 25167 AND question_reported = false
) t;

-- GET part 2/3 select all answers from the question id

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
  ) t;

-- GET part 3/3 select all photos from answer id

FROM (
  SELECT
    photos.url
  FROM
    answers
  WHERE answer_id = (?)
) t;

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
