import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';
import { Row, Col, Table, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetTargetInfo from '../actions/GetTargetInfo';

class TargetInfo extends Component{

	handleSubmit(event){
		event.preventDefault();
		const newName = document.getElementById('changeCompanyName').value;
		const newContactFirstName = document.getElementById('changeContactFirstName').value;
		const newContactLastName = document.getElementById('changeContactLastName').value;
		const newContactEmail = document.getElementById('changeContactEmail').value;
		const newContactPhone = document.getElementById('changeContactPhone').value;
		const newRevenues = document.getElementById('changeRevenues').value;
		const newExpenses = document.getElementById('changeExpenses').value;
		const newNetIncome = document.getElementById('changeNetIncome').value;
		const formData = {
			newName,
			newContactFirstName,
			newContactLastName,
			newContactEmail,
			newContactPhone,
			newRevenues,
			newExpenses,
			newNetIncome
		}
		console.log(formData);
	}

	componentWillReceiveProps(newProps){
		const same = (newProps.match.params.targetId === this.props.match.params.targetId);
		if(!same){
			var targetId = newProps.match.params.targetId;
			this.props.getTargetInfo(targetId);
		};
	}

	componentDidMount(){
		var targetId = this.props.match.params.targetId;
		this.props.getTargetInfo(targetId);
	}

	render(){
		var targetInfo = this.props.targetInfo;
		var targetNameInput, contactFirstNameInput, contactLastNameInput, contactEmailInput, contactPhoneInput, revenuesInput, expensesInput, netIncomeInput, submitButton;
		targetNameInput = contactFirstNameInput = contactLastNameInput = contactEmailInput = contactPhoneInput = revenuesInput = expensesInput = netIncomeInput = submitButton = '';
		if(this.props.match.params.action === 'edit'){
			targetNameInput = (
				<td><Input id='changeCompanyName' label='Change Company Name' /></td>
			);
			contactFirstNameInput = (
				<td><Input id='changeContactFirstName' label='Change Contact First Name' /></td>
			);
			contactLastNameInput = (
				<td><Input id='changeContactLastName' label='Change Contact Last Name' /></td>
			);
			contactEmailInput = (
				<td><Input id='changeContactEmail' label='Change Contact Email' /></td>
			);
			contactPhoneInput = (
				<td><Input id='changeContactPhone' label='Change Contact Phone' /></td>
			);
			revenuesInput = (
				<td><Input id='changeRevenues' label='Change Revenues' /></td>
			);
			expensesInput = (
				<td><Input id='changeExpenses' label='Change Expenses' /></td>
			);
			netIncomeInput = (
				<td><Input id='changeNetIncome' label='Change Net Income' /></td>
			);
			submitButton = (
				<Button onClick={this.handleSubmit}>Submit Changes</Button>
			);
		}
		return(
			<form>
				<Table>
					<tr>
						<th>Name:</th>
						<td>{targetInfo.name}</td>
						{targetNameInput}
					</tr>
					<tr>
						<th>Contact Name:</th>
						<td>{`${targetInfo.contactFirstName} ${targetInfo.contactLastName}`}</td>
						{contactFirstNameInput}{contactLastNameInput}
					</tr>
					<tr>
						<th>Contact Email:</th>
						<td>{targetInfo.contactEmail}</td>
						{contactEmailInput}
					</tr>
					<tr>
						<th>Contact Phone:</th>
						<td>{targetInfo.contactPhone}</td>
						{contactPhoneInput}
					</tr>
					<tr>
						<th>Revenues:</th>
						<td>{targetInfo.revenues}</td>
						{revenuesInput}
					</tr>
					<tr>
						<th>Expenses:</th>
						<td>{targetInfo.expenses}</td>
						{expensesInput}
					</tr>
					<tr>
						<th>Net Income:</th>
						<td>{targetInfo.netIncome}</td>
						{netIncomeInput}
					</tr>
				</Table>
				{submitButton}
			</form>
		)
	}
}

function mapStateToProps(state){
	return{
		auth: state.auth,
		targets: state.targets,
		targetInfo: state.targetInfo
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getTargetInfo: GetTargetInfo
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetInfo);