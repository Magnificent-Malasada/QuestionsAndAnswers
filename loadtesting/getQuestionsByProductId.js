import http from 'k6/http';
import { sleep, check } from 'k6';
export let options = {
  stages: [
    { duration: '10s', target: 20 },
    { duration: '10s', target: 100 },
  ]
};
const localhost = 'http://localhost:4000';

export default function () {

  const max = 1000011;

  let product_id = Math.floor(Math.random() * max) || 1;

  let res = http.get(`${localhost}/qa/questions?product_id=${product_id}&page=1&count=5`);
  check(res, {
    "status was 200": (res) => res.status == 200
  });
  sleep(1);
}