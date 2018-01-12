var express = require('express');
var router = express.Router();
var config = require('../config/config.js');
var mysql = require('mysql');
var randToken = require('rand-token');
var bcrypt = require('bcrypt-nodejs');

var connection = mysql.createConnection(config);
connection.connect();

var randToken = require('rand-token');

router.post('/register', (req, res)=>{
	// console.log(req.body);
	const company = req.body.company;
	const email = req.body.email;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const hash = bcrypt.hashSync(req.body.password);
	const checkEmailQuery = `SELECT * FROM users
		WHERE email = ?;`;
	connection.query(checkEmailQuery, [email], (error, results)=>{
		if(error){
			throw error;
		}else{
			if(results.length !== 0){
				res.json({
					msg: 'emailExists'
				});
			}else{
				const addUser = `INSERT INTO users (company, email, password, firstName, lastName)
					VALUES
					(?, ?, ?, ?, ?);`;
				connection.query(addUser, [company, email, hash, firstName, lastName], (error)=>{
					if(error){
						throw error;
					}else{
						const token = randToken.uid(60);
						res.json({
							token,
							email,
							firstName,
							lastName,
							company
						});
					}
				});
			}
		}
	});
});

router.post('/login', (req, res)=>{
	// console.log(req.body);
	const email = req.body.email;
	const password = req.body.password;
	const checkEmailQuery = `SELECT * FROM users
		WHERE email = ?;`;
	connection.query(checkEmailQuery, [email], (error, results)=>{
		if(error){
			throw error;
		}else{
			if(results.length === 0){
				res.json({
					msg: 'noEmailExists'
				});
			}else{
				const checkHash = bcrypt.compareSync(password, results[0].password);
				const company = results[0].company;
				const firstName = results[0].firstName;
				const lastName = results[0].firstName;
				if(checkHash){
					const token = randToken.uid(60);
					res.json({
						token,
						email,
						firstName,
						lastName,
						company
					});
				}else{
					res.json({
						msg: 'badPass'
					});
				}
			}
		}
	});
});

router.get('/targets/:companyName/get', (req, res, next)=>{
	console.log("You made it, bro!")
	const companyName = req.params.companyName;
	const selectQuery = `SELECT * FROM targets
		INNER JOIN users ON users.company = targets.companyInterested
		WHERE users.company = ?;`;
	connection.query(selectQuery, [companyName], (error, results)=>{
		if(error){
			throw error
		}else{
			res.json(results);
		}
	});
});

module.exports = router;
