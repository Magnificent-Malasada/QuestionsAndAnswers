import http from 'k6/http';
import { sleep, check } from 'k6';
export let options = {
  stages: [
    { duration: '30s', target: 10 },
  ]
};
export default function () {
  let res = http.post('http://localhost:4000/qa/questions');
  check(res, {
    "status was 200": (res) => res.status == 200,
  });
  sleep(1);
}