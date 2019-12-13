<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);

$query = $_GET['query'];
$numResults = $_GET['numResults'];

$data = [
	'q' => $query,
	'location' => 'United States',
	'search_engine' => 'google.com',
	'gl' => 'US',
	'hl' => 'en',
	'tbm' => 'shop',
	'num' => $numResults
];

curl_setopt($ch, CURLOPT_URL, "https://app.zenserp.com/api/v2/search?" . http_build_query($data));

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
	"Content-Type: application/json",
	"apikey: bc82aae0-1df1-11ea-9a22-91bfa5ce1450",
	//next API Key: 07fb4640-1cff-11ea-8368-639576b08a86
));

$response = curl_exec($ch);

echo($response);

curl_close($ch);

$json = json_decode($response);

var_dump($json);

?>
