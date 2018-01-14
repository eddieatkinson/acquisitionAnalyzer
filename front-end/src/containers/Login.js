import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginAction from '../actions/LoginAction';

class Login extends Component{
	constructor(){
		super();
		this.state = {
			error: ' '
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(newProps){
		if(newProps.auth.msg === 'noEmailExists'){
			this.setState({
				error: 'No account for that email exists.'
			});
		}else if(newProps.auth.msg === 'badPass'){
			this.setState({
				error: 'Incorrect password.'
			});
		}else{
			console.log("componentWillReceiveProps");
			newProps.history.push('/');	
		}
	}

	handleSubmit(event){
		event.preventDefault();
		console.log("user tried to login");
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		const formData = {
			email,
			password
		}
		if(email === '' || password === ''){
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
		}else{
			console.log('We are going to do this!');
			this.props.loginAction(formData);
		}
	}

	render(){
		return(
			<div>
				<h5>Login</h5>
				<h6>{this.state.error}</h6>
				<form>
					<Row>
						<Input id='email' s={6} label='Email' type='email' validate required />
					</Row>
					<Row>
						<Input id='password' s={6} label='Password' type='password' required />
					</Row>
					<Row>
						<Button onClick={this.handleSubmit}>Login</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);