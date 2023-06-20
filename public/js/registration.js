// This script should be placed at the end of your HTML body, or in an external JS file
fetch('https://restcountries.eu/rest/v2/all')
  .then(response => response.json())
  .then(countries => {
    const selectElement = document.querySelector('#country');
    countries.forEach(country => {
      const optionElement = document.createElement('option');
      optionElement.value = country.alpha3Code; // Use 3-letter country code as the value
      optionElement.textContent = country.name;
      selectElement.appendChild(optionElement);
    });
  })
  .catch(error => console.error('Error:', error));
