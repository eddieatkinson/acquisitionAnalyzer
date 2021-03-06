import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Input, Button, NavBar, NavItem } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginAction from '../actions/LoginAction';

class Login extends Component{
	constructor(){
		super();
	}

	render(){
		var navLinks;
		console.log(this.props.auth);
		if(this.props.auth.company === undefined){
			navLinks = '';
		}else{
			navLinks = <ul>
							<li><Link to='/'>Targets</Link></li>
							<li><Link to='/profile'>Profile</Link></li>
							<li className='logout'><a href='/'>Logout</a></li>
						</ul>
		}
		return(
			<div>
				<nav className='cyan darken-2'>
					<div className='nav-wrapper container'>
						<Link to='/' className='brand-logo right'>Acquisition Analyzer</Link>
						{navLinks}
					</div>
				</nav>
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