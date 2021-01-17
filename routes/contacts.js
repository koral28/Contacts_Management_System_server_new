var express = require("express");
var router = express.Router();
var connection = require("../configs/contactDB");

router.get("/", function (req, res, next) {
  connection.query("SELECT * from contacts", (err, rows, fields) => {
    if (!err) {
      return res.send(rows);
    } else {
      return res.send(err);
    }
  });
});

router.route("/").post(function (req, resp) {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    postalCode: req.body.postalCode,
  };

  const newContact =
    "INSERT INTO contacts(firstName,lastName,phone,email,street,city,state,postalCode) VALUES ?";
  const values = [
    [
      contact.firstName,
      contact.lastName,
      contact.phone,
      contact.email,
      contact.street,
      contact.city,
      contact.state,
      contact.postalCode,
    ],
  ];
  connection.query(newContact, [values], (err, rows, fields) => {
    if (err) {
      return resp.send(err);
    } else {
      return resp.send("Added!");
    }
  });
});

router.route("/:firstName").put(function (req, resp) {
  const firstName = req.params.firstName;

  const newContact = `UPDATE contacts SET firstName =? , lastName =? , phone =? , email =? , street=? , city=? , state=? , postalCode=?   WHERE firstname = ?`;

  let data = [
    req.body.firstName,
    req.body.lastName,
    req.body.phone,
    req.body.email,
    req.body.street,
    req.body.city,
    req.body.state,
    req.body.postalCode,
    firstName,
  ];

  connection.query(newContact, data, (err, rows, fields) => {
    if (err) {
      return resp.send(err);
    } else {
      return resp.send("Updated!");
    }
  });
});

router.route("/:firstName").delete(function (req, resp) {
  let firstName = req.params.firstName;
  const sql = "DELETE FROM contacts WHERE firstName =?";
  connection.query(sql, [firstName], function (err, result) {
    if (err) {
      return resp.send(err);
    } else {
      return resp.send("deleted!");
    }
  });
});

module.exports = router;
