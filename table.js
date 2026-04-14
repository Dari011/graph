tableData();

async function tableData() {
    const response = await fetch(DATA_URL);
    console.log(response);
    const data = await response.json();

    // Находим город с id=1 (Amsterdam)
    const cityData = data.find(city => city.id === CITY_ID);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Обновляем заголовок с названием города
    document.getElementById("city-title").textContent = `Climate Data - ${cityData.city}, ${cityData.country}`;

    let tableHTML = `<tr>
    <th>Month</th>
    <th>High (°C)</th>
    <th>Low (°C)</th>
    <th>Rainfall (mm)</th>
  </tr>`;

    for (let i = 0; i < cityData.monthlyAvg.length; i++) {
        tableHTML += `<tr>
      <td>${months[i]}</td>
      <td>${cityData.monthlyAvg[i].high}</td>
      <td>${cityData.monthlyAvg[i].low}</td>
      <td>${cityData.monthlyAvg[i].rainfall}</td>
    </tr>`;
    }

    document.getElementById("my_data").innerHTML = tableHTML;
}
