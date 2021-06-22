DROP DATABASE IF EXISTS QuestionsAndAnswers;

CREATE DATABASE QuestionsAndAnswers;

USE QuestionsAndAnswers;

CREATE TABLE products (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT
);

CREATE TABLE questions (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  question_body VARCHAR(500) NOT NULL,
  question_date DATE NOT NULL,
  asker_name VARCHAR(50) NOT NULL,
  asker_email VARCHAR(50) NOT NULL
  question_helpfulness INT,
  question_reported INT,
  FOREIGN KEY (product_id)
    REFERENCES products(id)
);

CREATE TABLE answers (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  answer_body VARCHAR(500) NOT NULL,
  answer_date DATE NOT NULL,
  answerer_name VARCHAR(50) NOT NULL,
  answerer_email VARCHAR(50) NOT NULL,
  answer_helpfulness INT,
  FOREIGN KEY (photo_id)
    REFERENCES photos(id),
  FOREIGN KEY (question_id)
    REFERENCES questions(id)
);

CREATE TABLE photos (
  id INT PRIMARY NOT NULL AUTO_INCREMENT,
  url VARCHAR(500) NOT NULL
  FOREIGN KEY (answer_id) REFERENCES answers(id),
)