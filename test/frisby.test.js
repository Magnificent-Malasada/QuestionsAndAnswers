const frisby = require('frisby');

const server = 'http://localhost:4000';

it ('should return a status of 200 for hello', function () {
  return frisby
    .get(`${server}/hello`)
    .expect('status', 200);
});

it ('POST should return a status of 201 for _______', function () {
  return frisby
    .post('http://api.example.com/posts', {
      title: 'My New Blog Post',
      content: '<p>A cool blog post!</p>'
    })
    .expect('status', 201);
});

// super test send to database and do a get request after to test that item is there -- focus on integration test for the api

// one place def for unit test would be to use node to format response correctly (or other helper functions), unit test that