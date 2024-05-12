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



