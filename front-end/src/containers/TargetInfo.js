import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';
import { Row, Col, Table, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import accounting from 'accounting';
import GetTargetInfo from '../actions/GetTargetInfo';
import UpdateTargetAction from '../actions/UpdateTargetAction';

class TargetInfo extends Component{
	constructor(){
		super();
		this.state = {
			error: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
		const companyInterested = this.props.auth.company;
		var newName = document.getElementById('changeCompanyName').value;
		var newContactFirstName = document.getElementById('changeContactFirstName').value;
		var newContactLastName = document.getElementById('changeContactLastName').value;
		var newContactEmail = document.getElementById('changeContactEmail').value;
		var newContactPhone = document.getElementById('changeContactPhone').value;
		var newRevenues = document.getElementById('changeRevenues').value;
		var newExpenses = document.getElementById('changeExpenses').value;
		var statusChoice = document.getElementById('status');
		console.log(statusChoice);
		var status = statusChoice.options[statusChoice.selectedIndex].value;
		var targetId = this.props.targetInfo.targetId;
		if(newName === ''){
			newName = this.props.targetInfo.name;
		}
		if(newContactFirstName === ''){
			newContactFirstName = this.props.targetInfo.contactFirstName;
		}
		if(newContactLastName === ''){
			newContactLastName = this.props.targetInfo.contactLastName;
		}
		if(newContactEmail === ''){
			newContactEmail = this.props.targetInfo.contactEmail;
		}
		if(newContactPhone === ''){
			newContactPhone = this.props.targetInfo.contactPhone;
		}
		if(newRevenues === ''){
			newRevenues = this.props.targetInfo.revenues;
		}
		if(newExpenses === ''){
			newExpenses = this.props.targetInfo.expenses;
		}
		if(newNetIncome === ''){
			newNetIncome = this.props.targetInfo.netIncome;
		}
		var newNetIncome = newRevenues - newExpenses;
		const formData = {
			companyInterested,
			targetId,
			newName,
			newContactFirstName,
			newContactLastName,
			newContactEmail,
			newContactPhone,
			newRevenues,
			newExpenses,
			newNetIncome,
			status
		}
		console.log(formData);

		const updateTargetPromise = new Promise((resolve, reject)=>{
			this.props.updateTargetAction(formData);
			resolve("Resolved!");
		});
		updateTargetPromise.then((value)=>{
			console.log(value);
			this.props.history.push('/');
		});
	}

	componentWillReceiveProps(newProps){
		const same = (newProps.match.params.targetId === this.props.match.params.targetId);
		if(!same){
			var targetId = newProps.match.params.targetId;
			console.log(targetId);
			this.props.getTargetInfo(targetId);
		}else{
			console.log('SAME!');
		}
	}

	componentDidMount(){
		var targetId = this.props.match.params.targetId;
		console.log(targetId);
		this.props.getTargetInfo(targetId);
	}

	render(){
		var targetInfo = this.props.targetInfo;
		var targetNameInput, contactFirstNameInput, contactLastNameInput, contactEmailInput, contactPhoneInput, revenuesInput, expensesInput, netIncomeInput, submitButton;
		targetNameInput = contactFirstNameInput = contactLastNameInput = contactEmailInput = contactPhoneInput = revenuesInput = expensesInput = netIncomeInput = submitButton = '';
		if(this.props.match.params.action === 'edit'){
			console.log(targetInfo);
			return(
				<div>
					<h6 className='errorMessage'>{this.state.error}</h6>
					<form>
						<Table>
							<tr>
								<th>Name:</th>
								<td><Input id='changeCompanyName' label={targetInfo.name} /></td>
							</tr>
							<tr>
								<th>Contact Name:</th>
								<td><Input id='changeContactFirstName' label={targetInfo.contactFirstName} /><Input id='changeContactLastName' defaultValue={targetInfo.contactLastName} /></td>
							</tr>
							<tr>
								<th>Contact Email:</th>
								<td><Input id='changeContactEmail' type='email' label={targetInfo.contactEmail} /></td>
							</tr>
							<tr>
								<th>Contact Phone:</th>
								<td><Input id='changeContactPhone' label={targetInfo.contactPhone} /></td>
							</tr>
							<tr>
								<th>Revenues:</th>
								<td><Input id='changeRevenues' label={accounting.formatMoney(targetInfo.revenues)} /></td>
							</tr>
							<tr>
								<th>Expenses:</th>
								<td><Input id='changeExpenses' label={accounting.formatMoney(targetInfo.expenses)} /></td>
							</tr>
						</Table>
						<Row>
							<Input id='status' type='select' label='Choose status'>
								<option value='researching'>Researching</option>
								<option value='pending'>Pending Approval</option>
								<option value='approved'>Approved</option>
							</Input>
						</Row>
						<Button onClick={this.handleSubmit}>Submit Changes</Button>
					</form>
				</div>
			);
		}else{
			return(
				<div>
					<form>
						<Table>
							<tr>
								<th>Name:</th>
								<td>{targetInfo.name}</td>
							</tr>
							<tr>
								<th>Contact Name:</th>
								<td>{`${targetInfo.contactFirstName} ${targetInfo.contactLastName}`}</td>
							</tr>
							<tr>
								<th>Contact Email:</th>
								<td>{targetInfo.contactEmail}</td>
							</tr>
							<tr>
								<th>Contact Phone:</th>
								<td>{targetInfo.contactPhone}</td>
							</tr>
							<tr>
								<th>Revenues:</th>
								<td>{accounting.formatMoney(targetInfo.revenues)}</td>
							</tr>
							<tr>
								<th>Expenses:</th>
								<td>{accounting.formatMoney(targetInfo.expenses)}</td>
							</tr>
							<tr>
								<th>Net Income:</th>
								<td>{accounting.formatMoney(targetInfo.netIncome)}</td>
							</tr>
						</Table>
					</form>
				</div>
			);
		}
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
		getTargetInfo: GetTargetInfo,
		updateTargetAction: UpdateTargetAction
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetInfo);