import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';
import { Row, Col, Table, Input } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetTargetInfo from '../actions/GetTargetInfo';

class TargetInfo extends Component{

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
		var targetNameInput, contactNameInput, contactEmailInput, contactPhoneInput, revenuesInput, expensesInput, netIncomeInput, submitButton;
		targetNameInput = contactNameInput = contactEmailInput = contactPhoneInput = revenuesInput = expensesInput = netIncomeInput = submitButton = '';
		if(this.props.match.params.action === 'edit'){
			targetNameInput = (
				<td><Input id='changeCompanyName' label='Change Company Name' /></td>
				);
			contactNameInput = (
				<td><Input id='changeContactName' label='Change Contact Name' /></td>
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
						{contactNameInput}
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