const token = 'insert token here';
let feature = document.getElementById('featureDropDown');
let state = document.getElementById('stateText');
let city = document.getElementById('cityText');
let dataField = document.getElementById('data');
let dataFieldTable = document.getElementById('dataTable');


async function fetchAsync (feature, state, city) {
    // await response of fetch call
    let response = await fetch(`http://api.wunderground.com/api/${token}/${feature}/q/${state}/${city}.json`);
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
    return data;
}
// trigger async function
// log response or catch error of fetch promise
document.getElementById('submitBtn').addEventListener("click", () => {
    fetchAsync(feature.value, state.value, city.value)
    .then(data => {
        // console.log(data);
        if (feature.value === "forecast") {
            // console.log(`The feature is in fact ${feature.value}!`);

            let forecastDay = data.forecast.simpleforecast.forecastday;
            for (let i = 0; i < forecastDay.length; i++) {
                //dataField.innerHTML = forecastDay[i].conditions;
                dataTable.innerHTML += `
                    <tr>
                        <td>${forecastDay[i].date.weekday}, ${forecastDay[i].date.monthname} ${forecastDay[i].date.day}</td>
                        <td>${forecastDay[i].high.fahrenheit}</td>
                        <td>${forecastDay[i].low.fahrenheit}</td>
                        <td>${forecastDay[i].conditions}</td>
                    </tr>
                `;
            }
        }
        if (feature.value === "conditions") {
            alert(`${feature.value} exists, but doesn't yet work!`);
        } 
        else if (feature.value === "hourly") {
            alert(`${feature.value} exists, but doesn't yet work!`);
        } 
        else if (feature.value === "hourly10day") {
            alert(`${feature.value} exists, but doesn't yet work!`);
        } 
        else if (feature.value === "yesterday") {
            alert(`${feature.value} exists, but doesn't yet work!`);
        } 
        else if (feature.value === "forecast10day") {
            alert(`${feature.value} exists, but doesn't yet work!`);
        } 
        else {
            alert(`${feature.value} is not found!`);
            return;
        }
    })
    .catch(reason => console.log(reason.message));

    // let forecastData = JSON.parse(data);
    // console.log(data);
});