<?php
$servername = "localhost";
$username = "wheatsta_syc";
$password = "WheatState67735";
$dbname = "wheatsta_summonyourcourage";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$name = $_POST["name"];
$author = $_POST["author"];
$background = $_POST["background"];
$collisions = $_POST["collisions"];
$courage = $_POST["courage"];
$map = $_POST["map"];
$goals = $_POST["goals"];
$level = $_POST["level"];


$sql = "INSERT INTO levelData ( name, author, background, collisions, courage, map, goals, level )
VALUES ('$name', '$author', '$background', '$collisions','$courage', '$map', '$goals', '$level')";

//$level = $_POST["level"];


//$sql = "INSERT INTO levelData ( level )
//VALUES ('$level')";

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>