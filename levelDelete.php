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

$row = $_POST["level"];

// sql to delete a record
$sql = "DELETE FROM levelData WHERE id=".$row;

if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();
?>