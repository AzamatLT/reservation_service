import http from 'k6/http';
import { random_number_between } from './generator.js';
import { sleep } from 'k6';




  export default function () {
    const random_number = random_number_between(4, 200);
    const headers = {
      'X-MESSAGE-ID': random_number,
    };
  
    const response = http.get('http://localhost:8080/cancelreserve', {
      headers: headers,
    });
  
    console.log('status code - ', response.status);




}