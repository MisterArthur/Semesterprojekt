<?php

function fetchWeatherData() {
    $url = "http://api.exchangeratesapi.io/v1/latest?access_key=f3e1adbabca2edf5bdfd624b2eb6a28a";

    // Initialisiert eine cURL-Sitzung
    $ch = curl_init($url);

    // Setzt Optionen
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Führt die cURL-Sitzung aus und erhält den Inhalt
    $response = curl_exec($ch);

    // Schließt die cURL-Sitzung
    curl_close($ch);

    // Dekodiert die JSON-Antwort und gibt Daten zurück
    return json_decode($response, true);
    //echo $response;
}

// Gibt die Daten zurück, wenn dieses Skript eingebunden ist
return fetchWeatherData();
?>