import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';
import { Row, Col, Table, Button, Input } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import accounting from 'accounting';
import GetTargetsAction from '../actions/GetTargetsAction';
import UpdateProfileAction from '../actions/UpdateProfileAction';
import TargetInfo from './TargetInfo';

class HomePage extends Component{
	constructor(){
		super();
		this.state = {
			error: ' '
		};
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	componentDidMount(){
		if(this.props.auth.token === undefined){
			this.props.history.push('/');
		}else{
			this.props.getTargets(this.props.auth.company);
		}
	}

	componentWillReceiveProps(newProps){
		const same = (newProps.targetsAdded === this.props.targetsAdded);
		if(!same){
			this.props.getTargets(newProps.auth.company);
		}
	}

	handleUpdate(event){
		event.preventDefault();
		const oldCompanyName = this.props.auth.company;
		const token = this.props.auth.token;
		const oldEmail = this.props.auth.email;
		const companyName = document.getElementById('profileCompanyName').value;
		const firstName = document.getElementById('profileFirstName').value;
		const lastName = document.getElementById('profileLastName').value;
		const email = document.getElementById('profileEmail').value;
		const formData = {
			oldCompanyName,
			token,
			oldEmail,
			companyName,
			firstName,
			lastName,
			email
		}
		if(companyName === '' || firstName === '' || lastName === '' || email === ''){
			this.setState({
				error: 'All fields must be completed.'
			});
		}else if(email.search('@') === -1){
			this.setState({
				error: 'Please enter a valid email address.'
			});
		}else{
			this.props.updateProfileAction(formData);
			this.props.history.push('/');
		}
	}

	render(){
		if(this.props.auth.token === undefined){
			this.props.history.push('/login');
		}
		var info = this.props.auth;
		return(
			<div>
				<Row>
					<Col s={6} className='offset-s3'>
						<h6 className='errorMessage'>{this.state.error}</h6>
						<form>
							<Table>
								<tr>
									<th>Company:</th>
									<td><Input id='profileCompanyName' defaultValue={info.company} required /></td>
								</tr>
								<tr>
									<th>Name:</th>
									<td s={2}><Input id='profileFirstName' defaultValue={info.firstName} required /></td>
									<td><Input id='profileLastName' defaultValue={info.lastName} required /></td>
								</tr>
								<tr>
									<th>Email:</th>
									<td><Input id='profileEmail' defaultValue={info.email} type='email' validate required /></td>
								</tr>
							</Table>
							<Button onClick={this.handleUpdate}>Update</Button>
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
		targets: state.targets,
		targetsAdded: state.targetsAdded
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getTargets: GetTargetsAction,
		updateProfileAction: UpdateProfileAction
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);