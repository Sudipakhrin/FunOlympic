const mainContainer = document.querySelector(".main-container");
const timeContainer = document.querySelector(".time-container");
const dialyEventsContainer = document.querySelector(".dialy-events-container");
const sportsContainer = document.querySelector(".sports-container");
const daysContainer = document.querySelector(".days-container");

const dialyEventsNumber = document.querySelector(".events-number");

const API_URLS = {
  general: "https://olypi.com",
  localTime: "https://olypi.com/general/?call=GetLocalTime",
  locations: {
    all: "https://olypi.com/locations/?call=GetAllLocations",
    byId: `https://olypi.com/locations/?call=GetLocation&id=1`,
  },
  days: "https://olypi.com/days/?call=Status",
  schedule: {
    sportEvents: `https://olypi.com/schedule/?call=SportEvents`,
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

  let todayEvents = await showData(API_URLS.schedule.todayEvents);
  todayEvents.length = 8;
  dialyEventsNumber.innerHTML = `First ${todayEvents.length} daily events`;
  todayEvents.forEach((event) => {
    dialyEventsContainer.innerHTML += `
    <div class="card-group">
    <div class="card p-2">
    <h3 class="text-center">#${event.id}</h3> 
    <p class="mb-0 text-center">${event.event}</p>
    <p class="text-center"><i class="far fa-clock"></i> ${formatTime(
      event.start
    )} - ${formatTime(event.end)}</p>
    <a href="${API_URLS.sports.byId}&id=${
      event.sport_id
    }" target="blank" class="d-flex align-items-center justify-content-center text-center btn btn-primary btn-sm">More Info</a>
    </div>
    </div>
    `;
  });
  let sports = await showData(API_URLS.sports.all);
  sports.shift(0);
  sports.length = 12;
  sports.forEach((sport) => {
    sportsContainer.innerHTML += `
    <div class="card sport p-3">
    <h3 class="text-center">#${(sport.id -= 1)}</h3>
    <p class="text-center">${sport.name}</p>
    <a href="${
      API_URLS.sports.all + sport.link
    }" target="blank" class="d-flex align-items-center justify-content-center text-center btn btn-primary btn-sm">More Info</a>
    </div>
    `;
  });
  let days = await showData(API_URLS.days);
  daysContainer.innerHTML = `
  <div class="card p-3 w-100 mt-2">
  <p class="text-center">Started <span class="started-text">${days.day}</span> days ago</p>
  <p class="text-center"><span class="started-text">${days.days_remaining}</span> days left</p>
  </div>
  `;
};
