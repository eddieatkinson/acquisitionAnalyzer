import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import LoginAction from '../actions/LoginAction';

class Login extends Component{
	constructor(){
		super();
	}

	handleSubmit(event){
	}

	componentWillReceiveProps(newProps){
	}

	render(){
		return(
			<div>
				<h5>Login</h5>
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
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);