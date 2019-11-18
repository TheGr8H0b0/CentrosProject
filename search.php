<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);

$data = [
	'q' => 'iPhone',
	'location' => 'United States',
	'search_engine' => 'google.com',
	'gl' => 'US',
    'hl' => 'en'
];

curl_setopt($ch, CURLOPT_URL, "https://app.zenserp.com/api/v2/search?" . http_build_query($data));

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
	"Content-Type: application/json",
	"apikey: 5ac89c60-070a-11ea-b430-9177d74aa0f6",
));

$response = curl_exec($ch);
curl_close($ch);

$json = json_decode($response);

var_dump($json);

echo($json);

?>