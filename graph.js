// Изменение ID города 
const CITY_ID = 1;
const DATA_URL = 'https://raw.githubusercontent.com/RFUNN/JSON_Data/main/climate.json';  // Онлайн
// const DATA_URL = './databases/climate.json';  // Локальная база

getData();

async function getData() {
    const response = await fetch(DATA_URL);
    console.log(response);
    const data = await response.json();

    // Находим город с выбранным ID
    const cityData = data.find(city => city.id === CITY_ID);
    console.log(cityData);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const highTemps = [];
    const lowTemps = [];
    const rainfall = [];

    for (let i = 0; i < cityData.monthlyAvg.length; i++) {
        highTemps.push(cityData.monthlyAvg[i].high);
        lowTemps.push(cityData.monthlyAvg[i].low);
        rainfall.push(cityData.monthlyAvg[i].rainfall);
    }

    // Создание графика
    new Chart(document.getElementById("bar-chart"), {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: "High Temperature (°C)",
                    borderColor: '#ff6384',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    data: highTemps,
                    fill: false
                },
                {
                    label: "Low Temperature (°C)",
                    borderColor: '#36a2eb',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    data: lowTemps,
                    fill: false
                },
                {
                    label: "Rainfall (mm)",
                    borderColor: '#4bc0c0',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    data: rainfall,
                    yAxisID: 'y-axis-2',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            legend: {
                display: true,
                labels: {
                    fontSize: 18
                }
            },
            title: {
                display: true,
                text: cityData.city + ', ' + cityData.country + ' - Climate Data',
                fontSize: 20
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature (°C)',
                        fontSize: 18
                    }
                }, {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        drawOnChartArea: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Rainfall (mm)',
                        fontSize: 18
                    }
                }]
            }
        }
    });
}