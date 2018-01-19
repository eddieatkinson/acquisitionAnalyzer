import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddCompanyAction from '../actions/AddCompanyAction';
import SearchTicker from '../actions/SearchTicker';
import accounting from 'accounting';

class AddCompany extends Component{
	constructor(){
		super();
		this.state = {
			error: ' ',
			revenues: 0,
			expenses: 0,
			netIncome: 0,
			companyInfo: []
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRevenuesChange = this.handleRevenuesChange.bind(this);
		this.handleExpensesChange = this.handleExpensesChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(event){
		event.preventDefault();
		const tickerSymbol = document.getElementById('tickerSymbol').value.toUpperCase();
		if(tickerSymbol === ''){
			this.setState({
				error: 'You cannot search an empty ticker.'
			});
		}else{
			this.props.searchTicker(tickerSymbol);
		}
	}

	handleSubmit(event){
		console.log(this.props.auth);
		event.preventDefault();
		const companyInterested = this.props.auth.company;
		const targetCompanyName = document.getElementById('companyName').value;
		const contactFirstName = document.getElementById('contactFirstName').value;
		const contactLastName = document.getElementById('contactLastName').value;
		const contactPhone = document.getElementById('contactPhone').value;
		const contactEmail = document.getElementById('contactEmail').value;
		const revenues = accounting.unformat(document.getElementById('revenues').value);
		const expenses = accounting.unformat(document.getElementById('expenses').value);
		const netIncome = accounting.unformat(document.getElementById('netIncome').value);
		const notes = document.getElementById('notes').value;
		const formData = {
			companyInterested,
			targetCompanyName,
			contactFirstName,
			contactLastName,
			contactPhone,
			contactEmail,
			revenues,
			expenses,
			netIncome,
			notes
		}
		console.log(formData);
		if(revenues === 0 || expenses === 0){
			this.setState({
				error: 'Please enter values for both revenue and expenses.'
			});
		}else{
			const addCompanyPromise = new Promise((resolve, reject)=>{
				this.props.addCompanyAction(formData);
				resolve("Resolved!");
			});
			addCompanyPromise.then((value)=>{
				console.log(value);
				this.props.history.push('/message/companyAdded');
			});
		}
	}

	handleRevenuesChange(event){
		var revenues = accounting.unformat(event.target.value);
		// console.log(revenues);
		this.setState({
			revenues: revenues,
			netIncome: revenues - this.state.expenses
		});
	}

	handleExpensesChange(event){
		var expenses = accounting.unformat(event.target.value);
		// console.log(expenses);
		this.setState({
			expenses: expenses,
			netIncome: this.state.revenues - expenses
		});
	}

	componentWillReceiveProps(newProps){
		var resultsFromSearch = newProps.searchResults;
		console.log(resultsFromSearch);
		if(resultsFromSearch.msg === 'noResults'){
			this.setState({
				error: 'There are no results for that ticker.'
			});
		}else{
			// console.log(resultsFromSearch[0]);
			if(resultsFromSearch[0] !== undefined){
				var totalRevenue, totalExpenses, income;
				console.log("HERE!");
				function getValues(item, index){
					for(let key in resultsFromSearch[index]){
						if(resultsFromSearch[index].tag === 'totalrevenue'){
							totalRevenue = resultsFromSearch[index].value;
						}else if(resultsFromSearch[index].tag === 'netincome'){
							income = resultsFromSearch[index].value;
						}
					}
				}
				resultsFromSearch.forEach(getValues);
				totalExpenses = totalRevenue - income;
				this.setState({
					revenues: totalRevenue,
					expenses: totalExpenses,
					netIncome: income,
					error: ''
				});
				console.log(`totalRevenue = ${totalRevenue}`);
				console.log(`totalExpenses = ${totalExpenses}`);
				console.log(`netIncome = ${income}`);
			}
		}
	}

	render(){
		console.log(this.state.expenses);
		if(this.props.auth.token === undefined){
			this.props.history.push('/login');
		}
		return(
			<div>
				<Row>
					<Col s={6} className='offset-s3'>
						<h5>Add Company</h5>
						<form>
							<Input id='tickerSymbol' label='Stock Ticker Symbol' />
							<Button className='cyan lighten-1' onClick={this.handleSearch}>Search</Button>
						</form>
						<h6 className='errorMessage'>{this.state.error}</h6>
						<form>
							<Row>
								<Input id='companyName' s={12} label='Company Name' validate required />
							</Row>
							<Row>
								<Input id='contactFirstName' s={6} label='Contact First Name' required />
								<Input id='contactLastName' s={6} label='Contact Last Name' required />
							</Row>
							<Row>
								<Input id='contactPhone' s={6} label='Contact Phone Number' required />
								<Input id='contactEmail' s={6} label='Contact Email' type='email' validate required />
							</Row>
							<Row>
								<Input id='revenues' onChange={this.handleRevenuesChange} s={12} label='Revenues' value={accounting.formatMoney(this.state.revenues)} required />
							</Row>
							<Row>
								<Input id='expenses' onChange={this.handleExpensesChange} s={12} label='Expenses' value={accounting.formatMoney(this.state.expenses)} required />
							</Row>
							<Row>
								<Input id='netIncome' s={12} label='Net Income' value={accounting.formatMoney(this.state.netIncome)} required />
							</Row>
							<Row>
								<textarea id='notes' s={12}></textarea>
							</Row>
							<Row>
								<Button className='cyan lighten-1' onClick={this.handleSubmit}>Add Company</Button>
							</Row>
						</form>
					</Col>
				</Row>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		auth: state.auth,
		targetsAdded: state.targetsAdded,
		searchResults: state.searchResults
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		addCompanyAction: AddCompanyAction,
		searchTicker: SearchTicker
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCompany);