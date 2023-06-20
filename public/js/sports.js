const timeContainer = document.querySelector(".time-container");
const sportsContainer = document.querySelector(".sports-main-container");

const footer = document.createElement("footer");
footer.innerHTML = `
<p class="mb-0">Tokio Olympics 2020</p>
<p class="mb-0">
  Made with ❤️ by
  <a href="github.com/GabrielCrackPro" target="blank" class="text-white"
    >@GabrielCrackPro</a
  >
</p>
`;
footer.classList.add("bg-primary");

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
    byId: "https://olypi.com/sports/?call=GetSport&id=",
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

  let sports = await showData(API_URLS.sports.all);
  sports.shift();
  sports.forEach((sport) => {
    sportsContainer.innerHTML += `
    <div class="card-group">
    <div class="card p-2">
    <h3>#${sport.id - 1}</h3>
    <p>${sport.name}</p>
    <a href="${
      API_URLS.sports.byId + sport.id
    }" target="blank" class="btn btn-primary btn-sm">More Info</a>
    </div>
    </div>
    `;
  });
  sportsContainer.innerHTML += footer.innerHTML;
};
