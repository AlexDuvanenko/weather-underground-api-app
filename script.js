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
        if (feature.value === "forecast" || feature.value === "forecast10day") {
            let forecastDay = data.forecast.simpleforecast.forecastday;
            dataTable.innerHTML = `
            <tr>
                <th> Day </th>
                <th> High </th>
                <th> Low </th>
                <th> Conditions </th>
            </tr>
            `;
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
        else if (feature.value === "conditions") {
            let forecastDay = data.current_observation;
            dataTable.innerHTML = `
                <tr>
                    <th> Location </th>
                    <th> Current Temperature </th>
                    <th> Feels Like </th>
                    <th> Weather Condition </th>
                    <th> Humidity </th>
                    <th> Visibility </th>
                </tr>
                <tr>
                    <td>${forecastDay.display_location.city}, ${forecastDay.display_location.state}</td>
                    <td>${forecastDay.temp_f} F</td>
                    <td>${forecastDay.feelslike_f} F</td>
                    <td>${forecastDay.weather}</td>
                    <td>${forecastDay.relative_humidity}</td>
                    <td>${forecastDay.visibility_mi} mile(s)</td>
                </tr>
            `;
        } 
        else if (feature.value === "hourly") {
            //alert(`${feature.value} exists, but doesn't yet work!`);
            let forecastDay = data.hourly_forecast;
            dataTable.innerHTML = `
            <tr>
                <th> Time </th>
                <th> Temperature </th>
                <th> Feels Like </th>
                <th> Weather Condition </th>
                <th> Humidity </th>
            </tr>
            `;
            for (let i = 0; i < forecastDay.length; i++) {
                dataTable.innerHTML += `
                    <tr>
                        <td> ${forecastDay[i].FCTTIME.civil}, ${forecastDay[i].FCTTIME.month_name} ${forecastDay[i].FCTTIME.mday}, ${forecastDay[i].FCTTIME.year} </td>
                        <td> ${forecastDay[i].temp.english} F</td>
                        <td> ${forecastDay[i].feelslike.english} F</td>
                        <td> ${forecastDay[i].condition}</td>
                        <td> ${forecastDay[i].humidity}%</td>
                    </tr>
                `;
            }
        } 
        else if (feature.value === "yesterday") {
            alert(`${feature.value} exists, but doesn't yet work!`);
        }
        else {
            alert(`${feature.value} is not found!`);
            return;
        }
    })
    .catch(reason => console.log(reason.message));

    // let forecastData = JSON.parse(data);
    //console.log(data);
});