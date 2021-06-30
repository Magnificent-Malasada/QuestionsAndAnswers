import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  http.put('http://localhost:4000/qa/questions/88148/helpful');
  sleep(1);
}