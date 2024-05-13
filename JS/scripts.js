// // Best Practice:
// // - Fetch in eine Funktion packen
// // - Fetch asynchron ausführen

// console.log ("Hello world");
// let url = "https://567003-2.web.fhgr.ch/PHP/unload.php";
// let data;

//  async function fetchData(url) {
//     try {
//         let response = await fetch(url);
//         let data = await response.json();
//         return data;
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// fetchData(url);

// async function init() {
//     let response = await fetch (url);
//     data = await response.json();
//     console.log(data);
// }
// init();

// const rates_Chart = document.querySelector('#rates_Chart');

//   new Chart(rates_Chart, {
//     type: 'line',
//     data: {
//       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//       datasets: [{
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });
console.log("test");
let url = "https://567003-2.web.fhgr.ch/PHP/unload.php";
let data;

async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function init() {
    data = await fetchData(url);
    console.log(data);

    // Extrahiere Labels, Daten und Währungscodes aus den abgerufenen Daten
    let labels = data.map(entry => entry.currency + ' (' + entry.created_at + ')'); // Währung + Erstellungsdatum
    let rates = data.map(entry => parseFloat(entry.rate)); // Konvertiere Rate in Float

    // ToDo: Dropdown einfügen (im Sytlesheet denke ich) welches entry.currency darstellt (for schlaufe in JS)
    // Aufgrund einschränkungen der API, Wechselkurs umrechnen (z.B. Yen = 10, (1 Euro = 10 Yen) heisst Yen hat rechenwert von 0.1)
    // Dann Rechenwert vergleichen und darstellen (rechenwertKurs1 * rechenwertKurs2 = Wechselkurs zwischen den beiden Kursen)
    // Evtl. Beide Kurse auf dem Graph vergleichen (wenn möglich) 
    // Andere Datenabfrage via API checken für History Daten. Via PHP diese History Daten abfragen. Dann via JS das Graph Script mit den Daten füttern.
    const rates_Chart = document.querySelector('#rates_Chart');

    new Chart(rates_Chart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Wechselkurs',
                data: rates,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

init();

async function init() {
    let data = await fetchData(url);
    console.log(data);

    const currencyDropdown1 = document.getElementById('currencyDropdown1');
    const currencyDropdown2 = document.getElementById('currencyDropdown2');
    const dateDropdown = document.getElementById('dateDropdown');
    const compareButton = document.getElementById('compareButton');
    const chartContainer = document.getElementById('rates_Chart');
    const exchangeRateDisplay = document.getElementById('exchangeRateDisplay');

    // Initialisiere das Chart-Objekt
    let chart;

    currencyDropdown1.innerHTML = '';
    currencyDropdown2.innerHTML = '';
    dateDropdown.innerHTML = '';

    const currencies = new Set();
    const dates = new Set();

    data.forEach(entry => {
        if (!currencies.has(entry.currency)) {
            currencies.add(entry.currency);
            let option1 = document.createElement('option');
            option1.value = entry.currency;
            option1.textContent = entry.currency;
            currencyDropdown1.appendChild(option1);

            let option2 = document.createElement('option');
            option2.value = entry.currency;
            option2.textContent = entry.currency;
            currencyDropdown2.appendChild(option2);
        }

        if (!dates.has(entry.created_at)) {
            dates.add(entry.created_at);
            let dateOption = document.createElement('option');
            dateOption.value = entry.created_at;
            dateOption.textContent = entry.created_at;
            dateDropdown.appendChild(dateOption);
        }
    });

    compareButton.addEventListener('click', () => {
        const selectedCurrency1 = currencyDropdown1.value;
        const selectedCurrency2 = currencyDropdown2.value;
        const selectedDate = dateDropdown.value;

        const filteredData1 = data.filter(entry => entry.currency === selectedCurrency1 && entry.created_at === selectedDate);
        const filteredData2 = data.filter(entry => entry.currency === selectedCurrency2 && entry.created_at === selectedDate);

        // Wenn ein Chart bereits existiert, zerstöre es
        if (chart) {
            chart.destroy();
        }

        // Erstelle ein neues Chart als Balkendiagramm
        chart = new Chart(chartContainer.getContext('2d'), {
            type: 'bar', // Ändere den Typ von 'line' zu 'bar'
            data: {
                labels: [selectedCurrency1, selectedCurrency2], // Ändere die Labels, um die Währungsnamen anzuzeigen
                datasets: [{
                    label: 'Wechselkurs am ' + selectedDate,
                    data: [filteredData1.length ? filteredData1[0].rate : 0, filteredData2.length ? filteredData2[0].rate : 0],
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

       // Anzeige der Wechselkurse als Text unter dem Diagramm
if (filteredData1.length && filteredData2.length) {
    const bigMacPriceUSD = 5.69;
    let rate1 = parseFloat(filteredData1[0].rate);
    let rate2 = parseFloat(filteredData2[0].rate);
    let percentBigMac1 = ((1 / rate1) * bigMacPriceUSD).toFixed(2);
    let percentBigMac2 = ((1 / rate2) * bigMacPriceUSD).toFixed(2);

    exchangeRateDisplay.innerHTML = `1 ${selectedCurrency1} = ${rate1} USD (${percentBigMac1}% eines Big Macs)<br>1 ${selectedCurrency2} = ${rate2} USD (${percentBigMac2}% eines Big Macs)`;
} else {
    exchangeRateDisplay.innerHTML = 'Wechselkurse nicht verfügbar.';
}
    });
}

init();
