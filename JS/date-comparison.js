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

async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function init() {
    const url = "https://567003-2.web.fhgr.ch/PHP/unload.php";
    let data = await fetchData(url);
    console.log(data);

    const currencyDropdown = document.getElementById('currencyDropdown');
    const dateDropdown1 = document.getElementById('dateDropdown1');
    const dateDropdown2 = document.getElementById('dateDropdown2');
    const compareButton = document.getElementById('compareButton');
    const chartContainer = document.getElementById('rates_Chart');
    const exchangeRateDisplay = document.getElementById('exchangeRateDisplay');

    // Initialisiere das Chart-Objekt
    let chart;

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
            let dateOption1 = document.createElement('option');
            dateOption1.value = entry.created_at;
            dateOption1.textContent = entry.created_at;
            dateDropdown1.appendChild(dateOption1);

            let dateOption2 = document.createElement('option');
            dateOption2.value = entry.created_at;
            dateOption2.textContent = entry.created_at;
            dateDropdown2.appendChild(dateOption2);
        }
    });

    compareButton.addEventListener('click', async () => {
        const selectedCurrency = currencyDropdown.value;
        const selectedDate1 = dateDropdown1.value;
        const selectedDate2 = dateDropdown2.value;

        if (!selectedCurrency || !selectedDate1 || !selectedDate2) {
            exchangeRateDisplay.innerHTML = 'Bitte wählen Sie eine Währung und zwei Daten aus.';
            return;
        }

        const filteredData1 = data.filter(entry => entry.currency === selectedCurrency && entry.created_at === selectedDate1);
        const filteredData2 = data.filter(entry => entry.currency === selectedCurrency && entry.created_at === selectedDate2);

        // Wenn ein Chart bereits existiert, zerstöre es
        if (chart) {
            chart.destroy();
        }

        // Umrechnung der Wechselkurse in USD
        let rate1 = filteredData1.length ? parseFloat(filteredData1[0].rate) : 0;
        let rate2 = filteredData2.length ? parseFloat(filteredData2[0].rate) : 0;

        // Umrechnung in die Form "1 Währung = x USD"
        rate1 = 1 / rate1;
        rate2 = 1 / rate2;

        // Erstelle ein neues Chart als Balkendiagramm
        chart = new Chart(chartContainer.getContext('2d'), {
            type: 'bar',
            data: {
                labels: [selectedDate1, selectedDate2],
                datasets: [{
                    label: `Wechselkurs von ${selectedCurrency} über Zeit`,
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

        // Anzeige der Wechselkurse als Text unter dem Diagramm
        if (filteredData1.length && filteredData2.length) {
            exchangeRateDisplay.innerHTML = `1 ${selectedCurrency} am ${selectedDate1} = ${rate1.toFixed(4)} USD<br>1 ${selectedCurrency} am ${selectedDate2} = ${rate2.toFixed(4)} USD`;
        } else {
            exchangeRateDisplay.innerHTML = 'Wechselkurse nicht verfügbar.';
        }
    });
}

init();
