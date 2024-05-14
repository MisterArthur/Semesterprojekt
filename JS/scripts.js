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

/*async function init() {
    data = await fetchData(url);
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

    compareButton.addEventListener('click', async () => {
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

        // Anzeige der Wechselkurse als Text unter dem Diagramm und Erstellen von Kuchendiagrammen
        if (filteredData1.length && filteredData2.length) {
            const bigMacPriceUSD = 5.69;
            let rate1 = parseFloat(filteredData1[0].rate);
            let rate2 = parseFloat(filteredData2[0].rate);
            let percentBigMac1 = ((1 / rate1) * bigMacPriceUSD).toFixed(2);
            let percentBigMac2 = ((1 / rate2) * bigMacPriceUSD).toFixed(2);

            exchangeRateDisplay.innerHTML = `1 ${selectedCurrency1} = ${rate1} USD (${percentBigMac1}% eines Big Macs)<br>1 ${selectedCurrency2} = ${rate2} USD (${percentBigMac2}% eines Big Macs)`;

            // Kuchendiagramme zeichnen
            const bigMacChart1 = document.getElementById('bigMacChart1').getContext('2d');
            const bigMacChart2 = document.getElementById('bigMacChart2').getContext('2d');

            // Daten für die Kuchendiagramme
            const data1 = {
                labels: ['Prozent eines Big Macs', 'Rest'],
                datasets: [{
                    data: [percentBigMac1, 100 - percentBigMac1],
                    backgroundColor: ['#FF6384', '#DDDDDD']
                }]
            };

            const data2 = {
                labels: ['Prozent eines Big Macs', 'Rest'],
                datasets: [{
                    data: [percentBigMac2, 100 - percentBigMac2],
                    backgroundColor: ['#36A2EB', '#DDDDDD']
                }]
            };

            // Optionen für die Kuchendiagramme
            const options = {
                responsive: false,
                maintainAspectRatio: true
            };

            // Erstellen der Kuchendiagramme
            new Chart(bigMacChart1, {
                type: 'pie',
                data: data1,
                options: options
            });

            new Chart(bigMacChart2, {
                type: 'pie',
                data: data2,
                options: options
            });
        } else {
            exchangeRateDisplay.innerHTML = 'Wechselkurse nicht verfügbar.';
        }
    });
}

init();
*/
async function init() {
    data = await fetchData(url);
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

    compareButton.addEventListener('click', async () => {
        const selectedCurrency1 = currencyDropdown1.value;
        const selectedCurrency2 = currencyDropdown2.value;
        const selectedDate = dateDropdown.value;

        const filteredData1 = data.filter(entry => entry.currency === selectedCurrency1 && entry.created_at === selectedDate);
        const filteredData2 = data.filter(entry => entry.currency === selectedCurrency2 && entry.created_at === selectedDate);

        // Wenn ein Chart bereits existiert, zerstöre es
        if (chart) {
            chart.destroy();
        }

        // Umrechnung der Wechselkurse in USD
        let rate1 = filteredData1.length ? 1 / parseFloat(filteredData1[0].rate) : 0;
        let rate2 = filteredData2.length ? 1 / parseFloat(filteredData2[0].rate) : 0;

        // Erstelle ein neues Chart als Balkendiagramm
        chart = new Chart(chartContainer.getContext('2d'), {
            type: 'bar',
            data: {
                labels: [selectedCurrency1, selectedCurrency2],
                datasets: [{
                    label: 'Wechselkurs am ' + selectedDate,
                    data: [rate1, rate2],
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

        // Anzeige der Wechselkurse als Text unter dem Diagramm und Erstellen von Kuchendiagrammen
        if (filteredData1.length && filteredData2.length) {
            const bigMacPriceUSD = 5.69;
            let percentBigMac1 = ((1 / rate1) * bigMacPriceUSD).toFixed(2);
            let percentBigMac2 = ((1 / rate2) * bigMacPriceUSD).toFixed(2);

            exchangeRateDisplay.innerHTML = `1 ${selectedCurrency1} = ${rate1.toFixed(4)} USD (${percentBigMac1}% eines Big Macs)<br>1 ${selectedCurrency2} = ${rate2.toFixed(4)} USD (${percentBigMac2}% eines Big Macs)`;

            // Kuchendiagramme zeichnen
            const bigMacChart1 = document.getElementById('bigMacChart1').getContext('2d');
            const bigMacChart2 = document.getElementById('bigMacChart2').getContext('2d');

            // Daten für die Kuchendiagramme
            const data1 = {
                labels: ['Prozent eines Big Macs', 'Rest'],
                datasets: [{
                    data: [percentBigMac1, 100 - percentBigMac1],
                    backgroundColor: ['#FF6384', '#DDDDDD']
                }]
            };

            const data2 = {
                labels: ['Prozent eines Big Macs', 'Rest'],
                datasets: [{
                    data: [percentBigMac2, 100 - percentBigMac2],
                    backgroundColor: ['#36A2EB', '#DDDDDD']
                }]
            };

            // Optionen für die Kuchendiagramme
            const options = {
                responsive: false,
                maintainAspectRatio: true
            };

            // Erstellen der Kuchendiagramme
            new Chart(bigMacChart1, {
                type: 'pie',
                data: data1,
                options: options
            });

            new Chart(bigMacChart2, {
                type: 'pie',
                data: data2,
                options: options
            });
        } else {
            exchangeRateDisplay.innerHTML = 'Wechselkurse nicht verfügbar.';
        }
    });
}

init();

let rate1 = filteredData1.length ? 1 / parseFloat(filteredData1[0].rate) : 0;
let rate2 = filteredData2.length ? 1 / parseFloat(filteredData2[0].rate) : 0;

exchangeRateDisplay.innerHTML = `1 ${selectedCurrency1} = ${rate1.toFixed(4)} USD (${percentBigMac1}% eines Big Macs)<br>1 ${selectedCurrency2} = ${rate2.toFixed(4)} USD (${percentBigMac2}% eines Big Macs)`;


