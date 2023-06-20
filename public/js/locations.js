const timeContainer = document.querySelector(".time-container");
const locationsContainer = document.querySelector(".main-container-locations");
const API_URLS = {
  general: "https://olypi.com",
  localTime: "https://olypi.com/general/?call=GetLocalTime",
  locations: {
    all: "https://olypi.com/locations/?call=GetAllLocations",
    byId: `https://olypi.com/locations/?call=GetLocation&id=`,
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
    map: "https://www.google.com/maps/place/lat+lon",
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
  const locations = await showData(API_URLS.locations.all);
  console.log(locations);
  locations.forEach((location) => {
    locationsContainer.innerHTML += `
    <div class="card-group">
    <div class="card p-3">
    <h3>#${location.id}</h3>
    <p>${location.name}</p>
    <p>Lat: ${location.lat} Long: ${location.lon}</p>
    <div class="btn-group">
    <a href="https://www.google.com/maps/place/${location.lat}+${
      location.lon
    }" target="blank" class="btn btn-primary btn-sm">View on Googlr Maps</a>
      <a href="${
        API_URLS.locations.byId + location.id
      }" target="blank" class="btn btn-primary btn-sm">More Info</a>
    </div>
    </div>
    </div>
    `;
  });
};
