import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';
import { Row, Col, Table } from 'react-materialize';
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
		return(
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
					<td>{targetInfo.revenues}</td>
				</tr>
				<tr>
					<th>Expenses:</th>
					<td>{targetInfo.expenses}</td>
				</tr>
				<tr>
					<th>Net Income:</th>
					<td>{targetInfo.netIncome}</td>
				</tr>
			</Table>
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