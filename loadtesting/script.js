import http from 'k6/http';
import { sleep, check } from 'k6';
export let options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '10s', target: 1000 },
  ]
};
export default function () {
  let res = http.post('http://localhost:4000/qa/questions');
  check(res, {
    "status was 200": (r) => r.status == 200
  });
  sleep(1);
}