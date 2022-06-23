
const express = require('express');
const app = express();
// const cors = require('cors');
// app.use(cors());


const bodyParser = require('body-parser');

const mysql = require('mysql2');

// JSON.stringify(result)

//http://localhost:8081/poc2?xyz=3

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'cdac',
	database: 'WPT',
	port: 3306
});

app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

var result;

app.post('/poc1', function (req, res) {

	console.log("reading input " + req.body.v1 + "  second " + req.body.v2)

	var xyz = { v1: 37, v2: 35 };
	res.send(xyz);
});


app.get('/getbookdetails', function (req, res) {
	// console.log("reading input " + req.query.xyz);
	// var xyz ={ v1:37, v2:35};
	let bookid = req.query.bookid;
	console.log(bookid);
	let output = { status: false, bookdetails: {} };

	connection.query("select * from book where bookid=?", [bookid], (err, res1) => {
		if (err) {
			console.log("Database is not coonnected !!!!");
		} else {
			console.log("Database success")
			if (res1.length > 0) {
				output.status = true;
				output.bookdetails = res1[0];
			} else {
				output.status = false;
			}
		}
		console.log(output);
		res.send(output);
	});
});

app.get('/updatebookdetails', function (req, res) {
	// console.log("reading input " + req.query.xyz);
	// var xyz ={ v1:37, v2:35};
	let input = { bookid: req.query.bookid, bookname: req.query.bookname, price: req.query.price };
	console.log(input);
	let output = false;

	connection.query("update book set bookname =?, price=? where bookid =? ", [input.bookname, input.price, input.bookid], (err, res1) => {
		if (err) {
			console.log("Database is not coonnected !!!!");
		} else {
			console.log("Database success")
			if (res1.affectedRows > 0) {
				output = true;
			} else {
				output = false;
			}
		}
		res.send(output);
	});
});


app.listen(8081, function () {
	console.log("server listening at port 8081...");
});