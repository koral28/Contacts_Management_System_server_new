const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "35.202.255.231",
  user: "root",
  password: "1234",
  insecureAuth: true,
  database: "contactsdb",
});

connection.connect((err) => {
  if (!err) {
    console.log("Database is connected!");
  } else
    console.log(
      "Database not connected! : " + JSON.stringify(err, undefined, 2)
    );
});

module.exports = connection;
