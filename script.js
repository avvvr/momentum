// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  city = document.querySelector('.city');

const leftArrow = document.querySelector('.load-previous-bg-btn'),
  rightArrow = document.querySelector('.load-next-bg-btn'),
  blockquote = document.querySelector('blockquote'),
  figcaption = document.querySelector('figcaption'),
  changeQuoteBtn = document.querySelector('.change-quote-btn'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  humidity = document.querySelector('.humidity'),
  wind = document.querySelector('.wind');

let currentName,
  currentFocus,
  currentNumber = 0,
  currentCity;
currentShift = new Date().getHours();

let numbersArray = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

async function getQuote() {
  console.log('getQuote');
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.quoteText);
  console.log(data.quoteAuthor);
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}

function setWeather(e) {
  if (e.type === 'focus') {
    currentCity = localStorage.getItem('city');
    e.target.innerText = " ";
  } else if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.code === 'Enter') {
      localStorage.setItem('city', e.target.innerText);
      getWeather();
      city.blur();
    }
  } else if (e.type === 'blur') {
    //if (e.code === 'Enter') {
    //city.blur();

    if (e.target.innerText.trim() == "") {
      e.target.innerText = currentCity;
      localStorage.setItem('city', currentCity);
    } else
      localStorage.setItem('city', e.target.innerText);
    //}
    getWeather();
  }
}

async function getWeather() {
  if (localStorage.getItem('city') === null) {
    currentCity = '[Введите город]';
    localStorage.setItem('city', ccurrentCity);
    city.textContent = '[Ваш город]';
  } else {
    city.textContent = localStorage.getItem('city');
    currentCity = localStorage.getItem('city');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=1ab1020e879cd274413cb91921dd97be&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if(data.message=='city not found'){
      alert('Город не найден.\nВведите другой.');
    }

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp} ℃`;
    humidity.textContent = `Влажность: ${data.main.humidity}%`;
    wind.textContent = `Ветер: ${data.wind.speed} м/с`;

    console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
  }
}

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  if (min == 0 && sec == 0) {
    location.reload();
  }
  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  setTimeout(showTime, 1000);
}

function showDate() {
  //alert("show date");
  const currentDay = {
    0: "Воскресенье",
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота",
  };
  const currentMonth = {
    0: "января",
    1: "февраля",
    2: "марта",
    3: "апреля",
    4: "мая",
    5: "июня",
    6: "июля",
    7: "августа",
    8: "сентября",
    9: "октября",
    10: "ноября",
    11: "декабря",
  };

  let today = new Date(),
    date = today.getDate(),
    day = currentDay[today.getDay()],
    month = currentMonth[today.getMonth()];

  let div = document.createElement('div');
  div.className = "date";
  div.innerHTML = `${day}, ${date} ${month}`;
  time.after(div);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function loadPreviousBg() {
  leftArrow.disabled = true;
  setTimeout(function () {
    leftArrow.disabled = false
  }, 1000);
  rightArrow.disabled = true;
  setTimeout(function () {
    rightArrow.disabled = false
  }, 1000);
  //let today = new Date(),
    //hour = today.getHours();

  const img = document.createElement('img');
  if (currentShift > 1) {
    currentShift--;
    if (currentShift >= 6 && currentShift < 12) {
      const src = `assets/images/morning/${numbersArray[currentShift-1]}.jpg`;
      img.src = src;
      img.onload = () => {
        document.body.style.backgroundImage = `url('${src}')`;
      };
    } else if (currentShift >= 12 && currentShift < 18) {
      const src = `assets/images/day/${numbersArray[currentShift-1]}.jpg`;
      img.src = src;
      img.onload = () => {
        document.body.style.backgroundImage = `url('${src}')`;
      };

    } else if (currentShift >= 18 && currentShift < 24) {
      const src = `assets/images/evening/${numbersArray[currentShift-1]}.jpg`;
      img.src = src;
      img.onload = () => {
        document.body.style.backgroundImage = `url('${src}')`;
      };

    } else if (currentShift == 24 || (currentShift > 0 && currentShift < 6)) {
      if (currentShift == 0)
        currentShift = 24;
      const src = `assets/images/night/${numbersArray[currentShift-1]}.jpg`;
      img.src = src;
      img.onload = () => {
        document.body.style.backgroundImage = `url('${src}')`;
      };
    }
  }
}

function loadNextBg() {
  leftArrow.disabled = true;
  setTimeout(function () {
    leftArrow.disabled = false
  }, 1000);
  rightArrow.disabled = true;
  setTimeout(function () {
    rightArrow.disabled = false
  }, 1000);
  let today = new Date(),
    hour = today.getHours();
  const img = document.createElement('img');
  if (currentShift < 24) {
    currentShift++;
    if (currentShift >= 6 && currentShift < 12) {
      const src = `assets/images/morning/${numbersArray[currentShift-1]}.jpg`;
      img.src = src;
      img.onload = () => {
        document.body.style.backgroundImage = `url('${src}')`;
      };
    } else if (currentShift >= 12 && currentShift < 18) {
      const src = `assets/images/day/${numbersArray[currentShift-1]}.jpg`;
      img.src = src;
      img.onload = () => {
        document.body.style.backgroundImage = `url('${src}')`;
      };
    } else if (currentShift >= 18 && currentShift < 24) {
      const src = `assets/images/evening/${numbersArray[currentShift-1]}.jpg`;
      img.src = src;
      img.onload = () => {
        document.body.style.backgroundImage = `url('${src}')`;
      };
    } else if (currentShift == 24 || (currentShift > 0 && currentShift < 6)) {
      if (currentShift == 0)
        currentShift = 24;
      const src = `assets/images/night/${numbersArray[currentShift-1]}.jpg`;
      img.src = src;
      img.onload = () => {
        document.body.style.backgroundImage = `url('${src}')`;
      };
    }
  }
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
  if (hour == 0)
    hour = 24;
  console.log(`Номер картинки: ${numbersArray[hour - 1]}`);

  if (hour >= 6 && hour < 12) {
    // Morning
    greeting.textContent = 'Доброе утро, ';
    document.body.style.backgroundImage = `url('assets/images/morning/${numbersArray[hour-1]}.jpg')`;

  } else if (hour >= 12 && hour < 18) {
    // Afternoon
    greeting.textContent = 'Доброго дня, ';
    document.body.style.backgroundImage = `url('assets/images/day/${numbersArray[hour-1]}.jpg')`;

  } else if (hour >= 18 && hour < 24) {
    // Evening
    greeting.textContent = 'Доброго вечера, ';
    document.body.style.color = 'white';
    document.body.style.backgroundImage = `url('assets/images/evening/${numbersArray[hour-1]}.jpg')`;

  } else if (hour = 24 || (hour > 0 && hour < 6)) {
    // Night
    greeting.textContent = 'Доброй ночи, ';
    document.body.style.color = 'white';
    document.body.style.backgroundImage = `url('assets/images/night/${numbersArray[hour-1]}.jpg')`;
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    currentName = '[Ваше Имя]';
    localStorage.setItem('name', currentName);
    name.textContent = '[Ваше Имя]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'focus') {
    currentName = localStorage.getItem('name');
    e.target.innerText = " ";
  } else if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else if (e.type === 'blur') {
    if (e.target.innerText.trim() == "") {
      e.target.innerText = currentName;
      localStorage.setItem('name', currentName);
    } else
      localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  //alert('help');
  if (localStorage.getItem('focus') === null) {
    currentFocus = '[Ваша цель]';
    localStorage.setItem('focus', currentFocus);
    focus.textContent = '[Ваша цель]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'focus') {
    currentFocus = localStorage.getItem('focus');
    e.target.innerText = " ";
  } else if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else if (e.type === 'blur') {
    if (e.target.innerText.trim() == "") {
      e.target.innerText = currentFocus;
      localStorage.setItem('focus', currentFocus);
    } else
      localStorage.setItem('focus', e.target.innerText);
  }
}

// Run
showTime();
showDate();
setBgGreet();
getName();
getFocus();
getWeather();

name.addEventListener('focus', setName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('focus', setFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

city.addEventListener('focus', setWeather);
city.addEventListener('keypress', setWeather);
city.addEventListener('blur', setWeather);
document.addEventListener('DOMContentLoaded', setWeather);

leftArrow.addEventListener('click', loadPreviousBg);
rightArrow.addEventListener('click', loadNextBg);
document.addEventListener('DOMContentLoaded', getQuote);
changeQuoteBtn.addEventListener('click', getQuote);