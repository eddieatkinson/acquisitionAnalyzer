import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddCompanyAction from '../actions/AddCompanyAction';

class AddCompany extends Component{
	constructor(){
		super();
		this.state = {
			error: ' ',
			revenues: 0,
			expenses: 0,
			netIncome: 0
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRevenuesChange = this.handleRevenuesChange.bind(this);
		this.handleExpensesChange = this.handleExpensesChange.bind(this);
	}

	componentWillReceiveProps(newProps){
	}

	handleSubmit(event){
		console.log(this.props.auth);
		event.preventDefault();
		var companyInterested = this.props.auth.company;
		var targetCompanyName = document.getElementById('companyName').value;
		var contactFirstName = document.getElementById('contactFirstName').value;
		var contactLastName = document.getElementById('contactLastName').value;
		var contactPhone = document.getElementById('contactPhone').value;
		var contactEmail = document.getElementById('contactEmail').value;
		var revenues = document.getElementById('revenues').value;
		var expenses = document.getElementById('expenses').value;
		var netIncome = document.getElementById('netIncome').value;
		var formData = {
			companyInterested,
			targetCompanyName,
			contactFirstName,
			contactLastName,
			contactPhone,
			contactEmail,
			revenues,
			expenses,
			netIncome
		}
		console.log(formData);
		const addCompanyPromise = new Promise((resolve, reject)=>{
			this.props.addCompanyAction(formData);
			resolve("Resolved!");
		});
		addCompanyPromise.then((value)=>{
			console.log(value);
			this.props.history.push('/');
		});
	}

	handleRevenuesChange(event){
		var revenues = event.target.value;
		// console.log(revenues);
		this.setState({
			revenues: revenues,
			netIncome: revenues - this.state.expenses
		});
	}

	handleExpensesChange(event){
		var expenses = event.target.value;
		// console.log(expenses);
		this.setState({
			expenses: expenses,
			netIncome: this.state.revenues - expenses
		});
	}

	render(){
		return(
			<div>
				<h5>Add Company</h5>
				<h6>{this.state.error}</h6>
				<form>
					<Row>
						<Input id='companyName' s={6} label='Company Name' validate required />
					</Row>
					<Row>
						<Input id='contactFirstName' s={3} label='Contact First Name' required />
						<Input id='contactLastName' s={3} label='Contact Last Name' required />
					</Row>
					<Row>
						<Input id='contactPhone' s={3} label='Contact Phone Number' required />
						<Input id='contactEmail' s={3} label='Contact Email' type='email' validate required />
					</Row>
					<Row>
						<Input id='revenues' onChange={this.handleRevenuesChange} s={6} label='Revenues' required />
					</Row>
					<Row>
						<Input id='expenses' onChange={this.handleExpensesChange} s={6} label='Expenses' required />
					</Row>
					<Row>
						<Input id='netIncome' s={6} label='Net Income' value={this.state.netIncome} required />
					</Row>
					<Row>
						<Button onClick={this.handleSubmit}>Add Company</Button>
					</Row>
				</form>
			</div>
		)
	}
}


function mapStateToProps(state){
	return{
		auth: state.auth,
		targetsAdded: state.targetsAdded
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		addCompanyAction: AddCompanyAction
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCompany);