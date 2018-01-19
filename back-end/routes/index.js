var express = require('express');
var router = express.Router();
var config = require('../config/config.js');
var mysql = require('mysql');
var request = require('request');
var randToken = require('rand-token');
var bcrypt = require('bcrypt-nodejs');
var https = require('https');

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

router.post('/updateProfile', (req, res)=>{
	const oldCompany = req.body.oldCompanyName
	const token = req.body.token;
	const oldEmail = req.body.oldEmail;
	const company = req.body.companyName;
	const email = req.body.email;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const hash = bcrypt.hashSync(req.body.password);
	const updateUser = `UPDATE users
		SET company = ?, email = ?, firstName = ?, lastName = ?
		WHERE email = ?;`;
	connection.query(updateUser, [company, email, firstName, lastName, oldEmail], (error)=>{
		if(error){
			throw error;
		}else{
			const updateCompanyInTargets = `UPDATE targets
				SET companyInterested = ?
				WHERE companyInterested = ?;`;
			connection.query(updateCompanyInTargets, [company, oldCompany], (error)=>{
				if(error){
					throw error;
				}else{
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
	});
});

router.post('/updateTarget', (req, res)=>{
	console.log(req.body);
	const companyInterested = req.body.companyInterested;
	const targetId = req.body.targetId;
	const newCompanyName = req.body.newName;
	const contactFirstName = req.body.newContactFirstName;
	const contactLastName = req.body.newContactLastName;
	const contactEmail = req.body.newContactEmail;
	const contactPhone = req.body.newcontactPhone;
	const revenues = req.body.newRevenues;
	const expenses = req.body.newExpenses;
	const netIncome = req.body.newNetIncome;
	const status = req.body.status;
	const updateTarget = `UPDATE targets
		SET name = ?, revenues = ?, expenses = ?, netIncome = ?, status = ?
		WHERE id = ?;`;
	connection.query(updateTarget, [newCompanyName, revenues, expenses, netIncome, status, targetId], (error)=>{
		if(error){
			throw error;
		}else{
			const updateContacts = `UPDATE targetContacts
				SET contactFirstName = ?, contactLastName = ?, contactPhone = ?, contactEmail = ?
				WHERE targetId = ?;`;
			connection.query(updateContacts, [contactFirstName, contactLastName, contactPhone, contactEmail, targetId], (error)=>{
				if(error){
					throw error;
				}else{
					const selectQuery = `SELECT *, targets.id AS targetsId FROM targets
						INNER JOIN users ON users.company = targets.companyInterested
						WHERE users.company = ? and targets.deleted = 'false'
						ORDER BY targetsId DESC;`;
					connection.query(selectQuery, [companyInterested], (error, results)=>{
						if(error){
							throw error
						}else{
							res.json(results);
						}
					});
				}
			});
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
		WHERE users.company = ? and targets.deleted = 'false'
		ORDER BY targetsId DESC;`;
	connection.query(selectQuery, [companyName], (error, results)=>{
		if(error){
			throw error
		}else{
			res.json(results);
		}
	});
});

router.get('/deleteTarget/:targetId/:companyName/get', (req, res, next)=>{
	const targetId = req.params.targetId;
	const companyName = req.params.companyName;
	const deleteTarget = `UPDATE targets
		SET deleted = 'true'
		WHERE id = ?;`;
	connection.query(deleteTarget, [targetId], (error)=>{
		if(error){
			throw error;
		}else{
			const selectQuery = `SELECT *, targets.id AS targetsId FROM targets
				INNER JOIN users ON users.company = targets.companyInterested
				WHERE users.company = ? and targets.deleted = 'false'
				ORDER BY targetsId DESC;`;
			connection.query(selectQuery, [companyName], (error, results)=>{
				if(error){
					throw error
				}else{
					console.log(results)
					res.json(results);
				}
			});
		}
	});
});

router.get('/reactivateTarget/:targetId/:companyName/get', (req, res, next)=>{
	const targetId = req.params.targetId;
	const companyName = req.params.companyName;
	const reactivateTarget = `UPDATE targets
		SET deleted = 'false'
		WHERE id = ?;`;
	connection.query(reactivateTarget, [targetId], (error)=>{
		if(error){
			throw error;
		}else{
			const selectQuery = `SELECT *, targets.id AS targetsId FROM targets
				INNER JOIN users ON users.company = targets.companyInterested
				WHERE users.company = ? and targets.deleted = 'true'
				ORDER BY targetsId DESC;`;
			connection.query(selectQuery, [companyName], (error, results)=>{
				if(error){
					throw error
				}else{
					console.log(results)
					res.json(results);
				}
			});
		}
	});
});

router.get('/deletedTargets/:companyName/get', (req, res, next)=>{
	const companyName = req.params.companyName;
	const selectQuery = `SELECT *, targets.id AS targetsId FROM targets
		INNER JOIN users ON users.company = targets.companyInterested
		WHERE users.company = ? and targets.deleted = 'true'
		ORDER BY targetsId DESC;`;
	connection.query(selectQuery, [companyName], (error, results)=>{
		if(error){
			throw error
		}else{
			console.log(results)
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

router.get('/searchTicker/:tickerSymbol/get', (req, res, next)=>{
	var username = "5eae4435c16547d8f72d9b3220e03ba1";
	var password = "c08c546c4820b32563622d3e809a0e4f";
	var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
	const tickerSymbol = req.params.tickerSymbol;
	// console.log(auth);
	// console.log(tickerSymbol);
	const url = `https://api.intrinio.com/financials/standardized?identifier=${tickerSymbol}&statement=income_statement&fiscal_year=2016&fiscal_period=FY`;
	request({
		url: url,
		headers: {
			"Authorization": auth
		}
	}, (error, response, companyData)=>{
		// console.log(response);
		var parsedCompanyData = JSON.parse(companyData);
		console.log(parsedCompanyData.data);
		res.json(parsedCompanyData.data);
	});
});

module.exports = router;
