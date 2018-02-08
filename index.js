const https = require('https');
const fetch = require('node-fetch');
const express = require('express');
const app = express();

const mobikeApiUrl = 'http://mwx.mobike.com/mobike-api/rent/nearbyBikesInfo.do';
// const fetchOptions = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   };
// fetch(mobikeApiUrl, fetchOptions)
//   .then(res => res.json())
//   .then(body => console.log(body));

// app.use(express.static('./'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/mobike', (req, res) => {
  const lat = req.query.latitude;
  const lng = req.query.longitude;
  getMobikes(lat, lng)
    .then(res => res.json())
    .then(body => res.send(body))
    .catch(() => {});
});
app.listen(process.env.PORT || 8080);

function getMobikes(lat, lng) {
  return fetch(`${mobikeApiUrl}?latitude=${lat}&longitude=${lng}`);
}
// const options = {
//   host: 'httpbin.org',
//   path: '/post',
//   // host: 'mwx.mobike.com',
//   // path: '/mobike-api/rent/nearbyBikesInfo.do',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Content-Length': '34'
//   }
// };

// let req = https.request(options, res => {
//   let result = '';
//   res.on('data', chunk => {
//     result += chunk;
//   });
//   res.on('end', () => console.log(result));
//   res.on('error', console.log);
// });
// req.write('latitude=1.3521&longitude=103.8198');
// req.end();