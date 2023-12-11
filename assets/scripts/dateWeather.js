//---- DOM ----//
const timeDisplay = document.querySelector(".time");
const persianDateDisplay = document.querySelector(".persian-date");
const calenderElement = document.querySelector(".calender");
const weatherSection = document.querySelector(".todayWeather");

//---- api ----//
const timeUrl = "https://api.dastyar.io/express/clock/current";
const dateUrl = "https://kaaryar0506reactblog.liara.run/current/time";
const weatherUrl = "https://api.dastyar.io/express/weather?lat=35.67194277&lng=51.42434403&lang=fa&theme=light";

//---- get time and print it ----//
const getTime = async () => {
  const res = await fetch(timeUrl);
  const data = await res.json();
  const millisecond = data.current;
  const currentTime = new Date(millisecond);
  const houre = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const time = `<h2 class="time">${houre < 10 ? "0" + houre : houre}:${
    minute < 10 ? "0" + minute : minute
  }</h2>`;
  return (timeDisplay.innerHTML = time);
};
getTime();

// ---- display the time ----//
setInterval(() => {
  getTime();
}, 1000);

//---- get calender and print it ----//
const setDate = async () => {
  try {
    const res = await fetch(dateUrl);
    const data = await res.json();
    //---- persian date ----//
    const persianDay = data.shamsi.dayInMonth;
    const persianMonth = data.shamsi.month;
    persianDateDisplay.innerHTML = `${persianDay} ${persianMonth}`;
    //---- islamic and gregorian date ----//
    const islamicDay = data.islamicHijri.dayInMonth;
    const islamicMonth = data.islamicHijri.month;
    const islamicYear = data.islamicHijri.year.slice(0, 4);
    const gregorianDay = data.miladi.dayInMonth;
    const gregorianMonth = data.miladi.month.slice(0, 3);
    const gregorianYear = data.miladi.year;
    calenderElement.innerHTML = `<p class="islamic-date">${islamicYear}/${islamicMonth}/${islamicDay}</p>
  <p class="gregorian-date" dir="ltr">${gregorianYear}/${gregorianMonth}/${gregorianDay}</p>`;
  } catch (error) {
    console.log(error);
  }
};
setDate();

// ---- get the weather and print it ----//
const setWeather = async () => {
  //-- get data --//
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    const current = Math.round(data[0].current);
    const icon = data[0].weather.icon;
    const description = data[0].customDescription.text;
    const descriptionEmoji = data[0].customDescription.emoji;
    const max = Math.round(data[0].max);
    const min = Math.round(data[0].min);
    //-- print data --//
    weatherSection.innerHTML = `<h2 class="d-flex align-center justify-center">${current}°
  <img src="https://openweathermap.org/img/wn/${icon}.png">
  </h2>
    <p class="temperature-description">${description} ${descriptionEmoji}</p>
    <div class="max-min d-flex justify-center">
      <p class="maximum">${max}° حداکثر</p>
      <span>.</span>
      <p class="minimum">${min}° حداقل</p>
    </div>`;
  } catch (error) {
    console.log(error);
  }
};

setWeather();