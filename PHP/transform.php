<?php

// Bindet das Skript 130_extract.php für Rohdaten ein
$data = include('extract.php');


// Extract rates from the data
$rates = $data['rates'];

// Initialize an array to store transformed data
$transformedData = [];

// Transform rates data
foreach ($rates as $currency => $rate) {
    $transformedData[] = [
        'currency' => $currency,
        'rate' => $rate
    ];
}

// Encode the transformed data back to JSON
$jsonTransformedData = json_encode($transformedData, JSON_PRETTY_PRINT);

// Return the JSON data
return $jsonTransformedData;