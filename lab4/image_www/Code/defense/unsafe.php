<?php
// Function to create a sql connection.
function getDB() {
  $dbhost = "10.9.0.6";
  $dbuser = "seed";
  $dbpass = "dees";
  $dbname = "sqllab_users";

  // Create a DB connection
  $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error . "\n");
  }
  return $conn;
}

function validateInput($input) {
  return preg_replace('/[^a-zA-Z0-9_.-]/', '', $input);
}

$s_input_uname = isset($_GET['username']) ? validateInput($_GET['username']) : null;
$input_pwd = isset($_GET['Password']) ? $_GET['Password'] : null;
$hashed_pwd = sha1($input_pwd);

// create a connection
$conn = getDB();

// do the query
// Prepare SQL statement with placeholders
$stmt = $conn->prepare(
  "SELECT id, name, eid, salary, ssn 
  FROM credential WHERE 
  name = ? 
  AND Password = ?"
);

// Bind parameters to the prepared statement
$stmt->bind_param("ss", $s_input_uname, $hashed_pwd);

// Execute the prepared statement
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  // only take the first row 
  $firstrow = $result->fetch_assoc();
  $id     = $firstrow["id"];
  $name   = $firstrow["name"];
  $eid    = $firstrow["eid"];
  $salary = $firstrow["salary"];
  $ssn    = $firstrow["ssn"];
}

// close the prepared statement
$stmt->close();

// close the sql connection
$conn->close();
