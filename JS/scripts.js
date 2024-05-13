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

    // Dropdown-Menüs vorbereiten
    const currencyDropdown1 = document.getElementById('currencyDropdown1');
    const currencyDropdown2 = document.getElementById('currencyDropdown2');
    const dateDropdown = document.getElementById('dateDropdown');
    const resultDiv = document.getElementById('result');
    const compareButton = document.getElementById('compareButton');

    // Lösche vorhandene Einträge in den Dropdowns
    currencyDropdown1.innerHTML = '';
    currencyDropdown2.innerHTML = '';
    dateDropdown.innerHTML = '';

    // Ein Set, um Duplikate von Währungen und Daten zu vermeiden
    const currencies = new Set();
    const dates = new Set();

    // Fülle die Dropdown-Menüs mit Daten
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

    // Hinzufügen eines Event-Listeners zum Vergleichsbutton
    compareButton.addEventListener('click', () => {
        const selectedCurrency1 = currencyDropdown1.value;
        const selectedCurrency2 = currencyDropdown2.value;
        const selectedDate = dateDropdown.value;

        // Finde die entsprechenden Daten für die ausgewählten Währungen am gewählten Datum
        let rate1 = data.find(entry => entry.currency === selectedCurrency1 && entry.created_at === selectedDate)?.rate;
        let rate2 = data.find(entry => entry.currency === selectedCurrency2 && entry.created_at === selectedDate)?.rate;

        // Anzeige der Ergebnisse
        if (rate1 && rate2) {
            resultDiv.innerHTML = `Wechselkurs am ${selectedDate}:<br>
                                   1 ${selectedCurrency1} = ${rate1} USD<br>
                                   1 ${selectedCurrency2} = ${rate2} USD`;
        } else {
            resultDiv.innerHTML = 'Für das gewählte Datum sind keine Daten für eine oder beide Währungen verfügbar.';
        }
    });
}

init();



