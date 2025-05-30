'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

// /////////////////////////////////////// 260 First AJAX Call XMLHttpsRequest

const renderCountry = function (data, className = '') {
  const html = ` <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
};

// //AJAX call country 1
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   console.log(request.responseText);

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     //render country 1
//     renderCountry(data);

//     // get neighbour country
//     const [neighbour] = data.borders;
//     if (!neighbour) return;

//     //AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryData('usa');

//////////////////////////////////////263 promises and fecth api

// const request = fetch(`https://restcountries.com/v2/name/canada`);
// console.log(request);

// const getCountryData = function (country) {
//   const request = fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]));
// };
// getCountryData('singapore');

///////////////////////////////////// 264 Chaining Promises\

const getJSON = function (url, errorMsg = 'something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// const getCountryData = function (country) {
//   //country 1

//   getJSON(`https://restcountries.com/v2/name/${country}`, 'country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       console.log(neighbour);
//       if (!neighbour) throw new Error('no neighbour found');

//       //country 2
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         'country not found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.log(`${err} BOOM ISSUE`);
//       renderError(`something went wrong ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('australia');
// });

// const getCountryData = function (country) {
//   //country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       //country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.log(`${err} BOOM ISSUE`);
//       renderError(`something went wrong ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('singapore');
// });

////////////////////////////////////////////////////2 268 challenge #1

// const JSONData = function (api) {
//   return fetch(api).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     return response.json();
//   });
// };

// const geoLocating = function (lat, lng) {
//   JSONData(
//     `https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//   )
//     .then(data =>
//       JSONData(`https://restcountries.com/v2/name/${data.countryName}`)
//     )
//     .then(data => renderCountry(data[0]))
//     .catch(err => {
//       console.log(`${err} BOOM ISSUE`);
//       renderError(`something went wrong ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   geoLocating('52', '13.474');
// });

///////////////////////////////////////// 271 building a simple promise

// const lotterPromise = new Promise(function (resolve, reject) {
//   console.log('lotterdraw happening');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('you win');
//     } else {
//       reject(new Error('you lose'));
//     }
//   }, 2000);
// });

// lotterPromise.then(res => console.log(res)).catch(err => console.log(err));

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// //used to prevent callback hell
// wait(2)
//   .then(() => {
//     console.log('waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('iwaited for 3 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('iwaited for 4 seconds');
//     return wait(1);
//   });

// Promise.resolve('abc124').then(x => console.log(x));

/////////////////////////////////////// 272 promisifying the geolocation api

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//     // navigator.geolocation.getCurrentPosition(
//     //   posistion => resolve(posistion),
//     //   err => reject(err)
//     // );
//   });
// };

// const JSONData = function (api) {
//   return fetch(api).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     return response.json();
//   });
// };

// const whereAmI = function () {
//   getPosition()
//     .then(post => {
//       const { latitude: lat, longitude: lng } = post.coords;
//       return JSONData(
//         `https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//       );
//     })
//     .then(data =>
//       JSONData(`https://restcountries.com/v2/name/${data.countryName}`)
//     )
//     .then(data => renderCountry(data[0]))
//     .catch(err => {
//       console.log(`${err} BOOM ISSUE`);
//       renderError(`something went wrong ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   whereAmI();
// });

//////////////////////////////////// challenge 2

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
// const imgConatiner = document.querySelector('.images');

// const createImage = function (imgpath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgpath;
//     img.addEventListener('load', function () {
//       imgConatiner.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', function () {
//       reject(new Error('img not found'));
//     });
//   });
// };

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('img has loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     createImage('img/img-2.jpg');
//     return wait(2);
//   });

///////////////////////////////////// 274 consuming promises with async await

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// async function whereAmI() {
//   // GEOLOCATION
//   try {
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     //REVERSE GEOCODING
//     const resGeo = await fetch(
//       `https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//     );
//     if (!resGeo.ok) throw new Error('problem getting location data');
//     const dataGeo = await resGeo.json();
//     const country = dataGeo.countryName;
//     console.log(dataGeo);

//     //COUNDTRY DATA
//     const res = await fetch(`https://restcountries.com/v2/name/${country}`);
//     if (!res.ok) throw new Error('problem getting location data');
//     const data = await res.json();
//     console.log(data);
//     renderCountry(data[0]);
//   } catch (err) {
//     console.log(err);
//     renderError('something wennt wrong boom');

//     //reject promise returned from async func
//     throw err;
//   }
// }

// whereAmI();
// console.log('first');

// async function start() {
//   try {
//     const getLocation = await whereAmI();
//     console.log(`2 ${getLocation}`);
//   } catch (err) {
//     renderError('something wennt wrong boom');
//   }
// }

///////////////////////////////////////277 Running pro,ises in parallel

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    // console.log([data1.capital, data2.capital, data3.capital]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};

// get3Countries('singapore', 'malaysia', 'thailand');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error('req took too long'));
    }, s * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/malaysia`),
  timeout(2),
])
  .then(res => console.log(res[0]))
  .catch(err => console.log(err));

Promise.all([
  Promise.resolve('sucess'),
  Promise.reject('rejected'),
  Promise.resolve('ok'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

Promise.any([
  Promise.resolve('sucess'),
  Promise.reject('rejected'),
  Promise.resolve('ok'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

const imgConatiner = document.querySelector('.images');

const createImage = function (imgpath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgpath;
    img.addEventListener('load', function () {
      imgConatiner.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('img not found'));
    });
  });
};

let currentImg;

const loadAll = async function (array) {
  try {
    const imgs = array.map(async img => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
  } catch (err) {
    console.log(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
/////// challenge 3
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
// const imgConatiner = document.querySelector('.images');

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('img has loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     createImage('img/img-2.jpg');
//     return wait(2);
//   });
