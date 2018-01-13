import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginAction from '../actions/LoginAction';

class AddCompany extends Component{
	constructor(){
		super();
		this.state = {
			error: ' '
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(newProps){
	}

	handleSubmit(event){
		event.preventDefault();
	}

	handleRevenuesChange(event){
		var revenues = event.target.value;
		console.log(revenues);
	}

	handleExpensesChange(event){
		var expenses = event.target.value;
		console.log(expenses);
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
						<Input id='netIncome' s={6} label='Net Income' required />
					</Row>
					<Row>
						<Button onClick={this.handleSubmit}>Add Company</Button>
					</Row>
				</form>
					<p>Not registered? Click <Link to='/register'>here</Link> to register!</p>
			</div>
		)
	}
}


function mapStateToProps(state){
	return{
		auth: state.auth
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		loginAction: LoginAction
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCompany);