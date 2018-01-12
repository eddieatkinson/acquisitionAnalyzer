import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import LoginAction from '../actions/LoginAction';

class Register extends Component{
	constructor(){
		super();
		this.state = {
			error: ' '
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
		const company = document.getElementById('companyName').value;
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		const passwordConfirm = document.getElementById('passwordConfirm').value;
		if(company === '' || email === '' || password === '' || passwordConfirm === '' ){
			this.setState({
				error: 'All fields must be completed.'
			});
		}else if(email.search('@') === -1){
			this.setState({
				error: 'Please enter a valid email address.'
			});
		}else if(password.length < 8){
			this.setState({
				error: 'Your password must have at least 8 characters.'
			});
		}else if(password !== passwordConfirm){
			this.setState({
				error: 'Passwords do not match.'
			});
		}
		console.log("user tried to register");
	}

	componentWillReceiveProps(newProps){
	}

	render(){
		return(
			<div id="container">
				<h5>Register</h5>
				<h6>{this.state.error}</h6>
				<form>
					<Row>
						<Input id='companyName' s={6} label='Company Name' required />
					</Row>
					<Row>
						<Input id='email' s={6} label='Email' type='email' validate required />
					</Row>
					<Row>
						<Input id='password' s={6} label='Password' type='password' required />
					</Row>
					<Row>
						<Input id='passwordConfirm' s={6} label='Confirm Password' type='password' required />
					</Row>
					<Row>
						<Button onClick={this.handleSubmit}>Register</Button>
					</Row>
				</form>
			</div>
		)
	}
}


function mapStateToProps(state){
	return{
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);