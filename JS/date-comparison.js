// console.log("test");
// let url = "https://567003-2.web.fhgr.ch/PHP/unload.php";
// let data;

// async function fetchData(url) {
//     try {
//         let response = await fetch(url);
//         let data = await response.json();
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// }

// function sortDatesDescending(a, b) {
//     return new Date(b) - new Date(a);
// }

// async function init() {
//     data = await fetchData(url);
//     console.log(data);

//     const currencyDropdown = document.getElementById('currencyDropdown');
//     const dateDropdown1 = document.getElementById('dateDropdown1');
//     const dateDropdown2 = document.getElementById('dateDropdown2');
//     const compareButton = document.getElementById('compareButton');
//     const chartContainer = document.getElementById('times_chart').getContext('2d');
//     const exchangeRateDisplay = document.getElementById('exchangeRateDisplay');

//     // Initialisiere das Chart-Objekt
//     let chart;

//     currencyDropdown.innerHTML = '';
//     dateDropdown1.innerHTML = '';
//     dateDropdown2.innerHTML = '';

//     const currencies = new Set();
//     const dates = new Set();

//     data.forEach(entry => {
//         if (!currencies.has(entry.currency)) {
//             currencies.add(entry.currency);
//             let option = document.createElement('option');
//             option.value = entry.currency;
//             option.textContent = entry.currency;
//             currencyDropdown.appendChild(option);
//         }

//         if (!dates.has(entry.created_at)) {
//             dates.add(entry.created_at);
//         }
//     });

//     // Sortiere die Daten nach Datum absteigend
//     const sortedDates = Array.from(dates).sort(sortDatesDescending);

//     sortedDates.forEach(date => {
//         let dateOption1 = document.createElement('option');
//         dateOption1.value = date;
//         dateOption1.textContent = date;
//         dateDropdown1.appendChild(dateOption1);

//         let dateOption2 = document.createElement('option');
//         dateOption2.value = date;
//         dateOption2.textContent = date;
//         dateDropdown2.appendChild(dateOption2);
//     });

//     // Standardwerte setzen
//     currencyDropdown.value = 'CHF';
//     dateDropdown1.value = sortedDates[sortedDates.length - 1]; // Ältestes Datum
//     dateDropdown2.value = sortedDates[0]; // Neuestes Datum

//     async function compareCurrencies() {
//         const selectedCurrency = currencyDropdown.value;
//         const selectedDate1 = dateDropdown1.value;
//         const selectedDate2 = dateDropdown2.value;

//         if (!selectedCurrency || !selectedDate1 || !selectedDate2) {
//             exchangeRateDisplay.innerHTML = 'Bitte wählen Sie eine Währung und zwei Daten aus.';
//             return;
//         }

//         const startDate = new Date(selectedDate1);
//         const endDate = new Date(selectedDate2);

//         if (startDate > endDate) {
//             exchangeRateDisplay.innerHTML = 'Das erste Datum muss vor dem zweiten Datum liegen.';
//             return;
//         }

//         const filteredData = data.filter(entry => entry.currency === selectedCurrency && new Date(entry.created_at) >= startDate && new Date(entry.created_at) <= endDate);
        
//         // Sortiere die Daten nach Datum
//         filteredData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

//         // Wenn ein Chart bereits existiert, zerstöre es
//         if (chart) {
//             chart.destroy();
//         }

//         const labels = filteredData.map(entry => entry.created_at);
//         const rates = filteredData.map(entry => 1 / parseFloat(entry.rate));

//         // Berechne die Anzahl Pommes für den ersten, letzten und den Durchschnittswechselkurs
//         const friesPriceUSD = 0.0504;
//         let firstRatePommes = (rates[0] / friesPriceUSD).toFixed(2);
//         let lastRatePommes = (rates[rates.length - 1] / friesPriceUSD).toFixed(2);
//         let averageRate = rates.reduce((a, b) => a + b, 0) / rates.length;
//         let averageRatePommes = (averageRate / friesPriceUSD).toFixed(2);

//         // Erstelle ein neues Chart als Liniendiagramm
//         chart = new Chart(chartContainer, {
//             type: 'line',
//             data: {
//                 labels: labels,
//                 datasets: [{
//                     label: `Wechselkurs von ${selectedCurrency} über Zeit`,
//                     data: rates,
//                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                     borderColor: 'rgba(54, 162, 235, 1)',
//                     borderWidth: 1,
//                     fill: false
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 scales: {
//                     y: {
//                         beginAtZero: true,
//                         title: {
//                             display: true,
//                             text: 'Wechselkurs (in USD)'
//                         }
//                     },
//                     x: {
//                         title: {
//                             display: true,
//                             text: 'Datum'
//                         },
//                         type: 'time',
//                         time: {
//                             unit: 'day',
//                             displayFormats: {
//                                 day: 'YYYY-MM-DD'
//                             }
//                         }
//                     }
//                 }
//             }
//         });

//         // Anzeige der Wechselkurse und Anzahl der Pommes als Text unter dem Diagramm
//         if (filteredData.length) {
//             let exchangeRateHTML = `Wechselkurs von ${selectedCurrency} vom ${selectedDate1} bis ${selectedDate2}<br>`;
//             exchangeRateHTML += `
//                 ${labels[0]}: 1 ${selectedCurrency} = ${rates[0].toFixed(4)} USD (${firstRatePommes} Pommes)<br>
//                 ${labels[labels.length - 1]}: 1 ${selectedCurrency} = ${rates[rates.length - 1].toFixed(4)} USD (${lastRatePommes} Pommes)<br>
//                 Durchschnitt: 1 ${selectedCurrency} = ${averageRate.toFixed(4)} USD (${averageRatePommes} Pommes)<br>
//             `;
//             exchangeRateDisplay.innerHTML = exchangeRateHTML;
//         } else {
//             exchangeRateDisplay.innerHTML = 'Wechselkurse nicht verfügbar.';
//         }
//     }

//     // Event-Listener für den Button
//     compareButton.addEventListener('click', compareCurrencies);

//     // Initialer Vergleich bei Laden der Seite
//     compareCurrencies();
// }

// init();

console.log("test");
let url = "https://567003-2.web.fhgr.ch/PHP/unload.php";
let data;

async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

function sortDatesDescending(a, b) {
    return new Date(b) - new Date(a);
}

async function init() {
    data = await fetchData(url);
    console.log(data);

    const currencyDropdown = document.getElementById('currencyDropdown');
    const dateDropdown1 = document.getElementById('dateDropdown1');
    const dateDropdown2 = document.getElementById('dateDropdown2');
    const compareButton = document.getElementById('compareButton');
    const chartContainer = document.getElementById('times_chart').getContext('2d');
    const exchangeRateDisplay = document.getElementById('exchangeRateDisplay');
    const averageFriesChartContainer = document.getElementById('averageFriesChart').getContext('2d');

    // Initialisiere die Chart-Objekte
    let chart;
    let averageFriesChart;

    currencyDropdown.innerHTML = '';
    dateDropdown1.innerHTML = '';
    dateDropdown2.innerHTML = '';

    const currencies = new Set();
    const dates = new Set();

    data.forEach(entry => {
        if (!currencies.has(entry.currency)) {
            currencies.add(entry.currency);
            let option = document.createElement('option');
            option.value = entry.currency;
            option.textContent = entry.currency;
            currencyDropdown.appendChild(option);
        }

        if (!dates.has(entry.created_at)) {
            dates.add(entry.created_at);
        }
    });

    // Sortiere die Daten nach Datum absteigend
    const sortedDates = Array.from(dates).sort(sortDatesDescending);

    sortedDates.forEach(date => {
        let dateOption1 = document.createElement('option');
        dateOption1.value = date;
        dateOption1.textContent = date;
        dateDropdown1.appendChild(dateOption1);

        let dateOption2 = document.createElement('option');
        dateOption2.value = date;
        dateOption2.textContent = date;
        dateDropdown2.appendChild(dateOption2);
    });

    // Standardwerte setzen
    currencyDropdown.value = 'CHF';
    dateDropdown1.value = sortedDates[sortedDates.length - 1]; // Ältestes Datum
    dateDropdown2.value = sortedDates[0]; // Neuestes Datum

    async function compareCurrencies() {
        const selectedCurrency = currencyDropdown.value;
        const selectedDate1 = dateDropdown1.value;
        const selectedDate2 = dateDropdown2.value;

        if (!selectedCurrency || !selectedDate1 || !selectedDate2) {
            exchangeRateDisplay.innerHTML = 'Bitte wählen Sie eine Währung und zwei Daten aus.';
            return;
        }

        const startDate = new Date(selectedDate1);
        const endDate = new Date(selectedDate2);

        if (startDate > endDate) {
            exchangeRateDisplay.innerHTML = 'Das erste Datum muss vor dem zweiten Datum liegen.';
            return;
        }

        const filteredData = data.filter(entry => entry.currency === selectedCurrency && new Date(entry.created_at) >= startDate && new Date(entry.created_at) <= endDate);
        
        // Sortiere die Daten nach Datum
        filteredData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        // Wenn ein Chart bereits existiert, zerstöre es
        if (chart) {
            chart.destroy();
        }

        const labels = filteredData.map(entry => entry.created_at);
        const rates = filteredData.map(entry => 1 / parseFloat(entry.rate));

        // Berechne die Anzahl Pommes für den ersten, letzten und den Durchschnittswechselkurs
        const friesPriceUSD = 0.0504;
        let firstRatePommes = (rates[0] / friesPriceUSD).toFixed(2);
        let lastRatePommes = (rates[rates.length - 1] / friesPriceUSD).toFixed(2);
        let averageRate = rates.reduce((a, b) => a + b, 0) / rates.length;
        let averageRatePommes = (averageRate / friesPriceUSD).toFixed(2);

        // Erstelle ein neues Chart als Liniendiagramm
        chart = new Chart(chartContainer, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `Wechselkurs von ${selectedCurrency} über Zeit`,
                    data: rates,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Wechselkurs (in USD)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Datum'
                        },
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'YYYY-MM-DD'
                            }
                        }
                    }
                }
            }
        });

        // Anzeige der Wechselkurse und Anzahl der Pommes als Text unter dem Diagramm
        if (filteredData.length) {
            let exchangeRateHTML = `Wechselkurs von ${selectedCurrency} vom ${selectedDate1} bis ${selectedDate2}<br>`;
            exchangeRateHTML += `
                ${labels[0]}: 1 ${selectedCurrency} = ${rates[0].toFixed(4)} USD (${firstRatePommes} Pommes)<br>
                ${labels[labels.length - 1]}: 1 ${selectedCurrency} = ${rates[rates.length - 1].toFixed(4)} USD (${lastRatePommes} Pommes)<br>
                Durchschnitt: 1 ${selectedCurrency} = ${averageRate.toFixed(4)} USD (${averageRatePommes} Pommes)<br>
            `;
            exchangeRateDisplay.innerHTML = exchangeRateHTML;
        } else {
            exchangeRateDisplay.innerHTML = 'Wechselkurse nicht verfügbar.';
        }

        // Erstelle das Balkendiagramm für die durchschnittliche Anzahl Pommes
        if (averageFriesChart) {
            averageFriesChart.destroy();
        }

        averageFriesChart = new Chart(averageFriesChartContainer, {
            type: 'bar',
            data: {
                labels: ['Durchschnittliche Pommesanzahl'],
                datasets: [{
                    label: `Durchschnittliche Anzahl Pommes für 1 ${selectedCurrency}`,
                    data: [averageRatePommes],
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Anzahl Pommes'
                        }
                    }
                }
            }
        });
    }

    // Event-Listener für den Button
    compareButton.addEventListener('click', compareCurrencies);

    // Initialer Vergleich bei Laden der Seite
    compareCurrencies();
}

init();
