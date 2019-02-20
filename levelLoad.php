<?php
$servername = "localhost";
$username = "wheatsta_syc";
$password = "WheatState67735";
$dbname = "wheatsta_summonyourcourage";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$sql = "SELECT * FROM levelData";
$result = $conn->query($sql);
$levels = array();

if ($result->num_rows > 0) {
    // output data of each row
    echo " <option data-level=''>Choose:</option> ";
    while($row = $result->fetch_assoc()) {
        echo " <option data-level='" . $row["level"] . "' data-id='" . $row["id"] . "'>". $row["name"] ."</option> ";
    }
} else {
    echo "0 results";
}
echo "";

$conn->close();
?>