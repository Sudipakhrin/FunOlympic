const scheduleContainer = document.querySelector(".main-container-schedule");
const timeContainer = document.querySelector(".time-container");

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const API_URLS = {
  general: "https://olypi.com",
  localTime: "https://olypi.com/general/?call=GetLocalTime",
  locations: {
    all: "https://olypi.com/locations/?call=GetAllLocations",
    byId: `https://olypi.com/locations/?call=GetLocation&id=`,
  },
  days: "https://olypi.com/days/?call=Status",
  schedule: {
    sportID: getRandomNumber(1, 50),
    sportEvents: `https://olypi.com/schedule/?call=SportEvents&id=`,
    todayEvents: "https://olypi.com/schedule/?call=TodaysEvents",
    liveEvents: "https://olypi.com/schedule/?call=LiveNow",
  },
  sports: {
    all: "https://olypi.com/sports/?call=GetAllSports",
    byId: "https://olypi.com/sports/?call=GetSport",
  },
  weather: {
    live: "https://olypi.com/weather/?call=Live",
    forecast: "https://olypi.com/weather/?call=Forecast",
  },
};
const getData = async (url) => {
  let data = await fetch(url).then((response) => response.json());
  return data;
};
const showData = async (url) => {
  let data = await getData(url);
  return data.result;
};
const formatDate = (date) => {
  return new Date(date).toLocaleString().slice(0, -3);
};
const formatTime = (time) => {
  return new Date(time).toLocaleString().slice(9, -3);
};
const removeQuotations = (str) => {
  str = str.replace(/\"/g, "");
  return str;
};
window.onload = async () => {
  let currentTime = await showData(API_URLS.localTime);
  timeContainer.textContent = formatDate(currentTime);

  let schedule = await showData(
    API_URLS.schedule.sportEvents + API_URLS.schedule.sportID
  );
  schedule.forEach((event) => {
    if (event.completed) event.completed = "Yes";
    else event.completed = "No";

    if (event.is_medañ) event.is_medal = "Yes";
    else event.is_medal = "No";
    if (event.is_final) event.is_final = "Yes";
    else event.is_final = "No";
    scheduleContainer.innerHTML += `
    <div class="card p-3">
    <h3>#${event.id}</h3>
    <p>${removeQuotations(event.event)}</p>
    <p><i class="far fa-calendar"></i> ${formatDate(event.start)}</p>
    <p> <i class="far fa-clock"></i>${formatTime(event.start)} - ${formatTime(
      event.end
    )}</p>
    <p>Completed: ${event.completed} Medal: ${event.is_medal} Final: ${
      event.is_final
    }</p>
    </div>
    `;
  });
};
