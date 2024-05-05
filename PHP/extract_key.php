<?php

function fetchWeatherData() {
    $url = "http://api.exchangeratesapi.io/v1/";
    
    // API Key - Replace 'YOUR_API_KEY_HERE' with your actual API key
    $apiKey = 'f3e1adbabca2edf5bdfd624b2eb6a28a';

    // Initialize a cURL session
    $ch = curl_init($url);

    // Sets options
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    // Set HTTP Header for Authentication
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer ' . $apiKey
    ));

    // Execute the cURL session and get the content
    $response = curl_exec($ch);

    // Close the cURL session
    curl_close($ch);

    // Decode the JSON response and return data
    //return json_decode($response, true);
    echo $response;
}

// Returns the data when this script is included
return fetchWeatherData();
?>