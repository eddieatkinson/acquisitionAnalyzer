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

router.post('/addCompany', (req, res)=>{
	const companyInterested = req.body.companyInterested;
	const targetCompany = req.body.targetCompanyName;
	const contactFirstName = req.body.contactFirstName;
	const contactLastName = req.body.contactLastName;
	const contactEmail = req.body.contactEmail;
	const contactPhone = req.body.contactPhone;
	const revenues = req.body.revenues;
	const expenses = req.body.expenses;
	const netIncome = req.body.netIncome;
	const insertTarget = `INSERT INTO targets (name, companyInterested, revenues, expenses, netIncome)
		VALUES
		(?, ?, ?, ?, ?);`;
	connection.query(insertTarget, [targetCompany, companyInterested, revenues, expenses, netIncome], (error)=>{
		if(error){
			throw error;
		}else{
			const targetIdQuery = `SELECT * FROM targets
										WHERE name = ?;`;
			connection.query(targetIdQuery, [targetCompany], (error, results)=>{
				if(error){
					throw error;
				}else{
					const targetId = results[0].id;
					const insertContact = `INSERT INTO targetContacts (targetId, contactFirstName, contactLastName, contactPhone, contactEmail)
						VALUES
						(?, ?, ?, ?, ?);`;
					connection.query(insertContact, [targetId, contactFirstName, contactLastName, contactPhone, contactEmail], (error)=>{
						if(error){
							throw error;
						}else{

							res.json({
								msg: 'targetInfoAdded'
							});
						}
					});
				}
			});
		}
	});
});

router.get('/targets/:companyName/get', (req, res, next)=>{
	const companyName = req.params.companyName;
	const selectQuery = `SELECT *, targets.id AS targetsId FROM targets
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

router.get('/targetInfo/:targetId/get', (req, res, next)=>{
	const targetId = req.params.targetId;
	const selectQuery = `SELECT * FROM targets
		INNER JOIN targetContacts ON targetContacts.targetId = targets.id
		WHERE targets.id = ?;`;
	connection.query(selectQuery, [targetId], (error, results)=>{
		if(error){
			throw error
		}else{
			res.json(results[0]);
		}
	});
});

module.exports = router;
