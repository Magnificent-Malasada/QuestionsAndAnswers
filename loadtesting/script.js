import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  vus: 10,
  duration: '30s',
};
export default function () {
  http.post('http://localhost:4000/qa/questions');
  sleep(1);
}