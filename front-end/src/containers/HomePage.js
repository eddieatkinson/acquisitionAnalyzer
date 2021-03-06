import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';
import { Row, Col, Table, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import accounting from 'accounting';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css'
import GetTargetsAction from '../actions/GetTargetsAction';
import DeleteTargetAction from '../actions/DeleteTargetAction';
import ReactivateTargetAction from '../actions/ReactivateTargetAction';
import DisplayDeletedAction from '../actions/DisplayDeletedAction';
import AddOffsetAction from '../actions/AddOffsetAction';
import RemoveOffsetAction from '../actions/RemoveOffsetAction';
import TargetInfo from './TargetInfo';

class HomePage extends Component{
	constructor(){
		super();
		this.state = {
			deletedList: false,
			targetAdded: false,
			targetUpdated: false
		}
		this.handleDelete = this.handleDelete.bind(this);
		this.handleReactivate = this.handleReactivate.bind(this);
		this.showDeleted = this.showDeleted.bind(this);
		this.showActive = this.showActive.bind(this);
	}

	componentDidMount(){
		if(this.props.auth.token === undefined){
			this.props.history.push('/');
		}else{
			this.props.getTargets(this.props.auth.company);
		}
	}

	componentWillReceiveProps(newProps){
		console.log(this.props.match.params);
		if(this.props.match.params.msg === 'companyAdded'){
			console.log('companyAdded')
			this.setState({
				targetAdded: true
			});
		}else if(this.props.match.params.msg === 'companyUpdated'){
			this.setState({
				targetUpdated: true
			});
		}
		if(this.props.match.path === '/info'){
			this.props.removeOffset();
		}else{
			this.props.addOffset();
		}
		const same = (newProps.targetsAdded === this.props.targetsAdded);
		if(!same){
			this.props.getTargets(newProps.auth.company);
		}
	}

	handleDelete(event){
		var targetId = event.target.id;
		var companyName = this.props.auth.company;
		this.props.deleteTarget(targetId, companyName);
	}

	handleReactivate(event){
		var targetId = event.target.id;
		var companyName = this.props.auth.company;
		this.props.reactivateTarget(targetId, companyName);
	}

	showDeleted(){
		var userCompany = this.props.auth.company;
		this.props.displayDeleted(userCompany);
		this.setState({
			deletedList: true
		});
		this.props.history.push('/');
	}

	showActive(){
		this.props.getTargets(this.props.auth.company);
		this.setState({
			deletedList: false
		});
	}

	// handleClassChange(){
	// 	console.log('Class should be changed');
	// 	this.setState({
	// 		classNameOffset: 'none'
	// 	});
	// 	console.log(this.state.classNameOffset);
	// }

	render(){
		var classNameOffset;
		if(this.props.colOffset){
			classNameOffset = 'offset-s3';
		}else{
			classNameOffset = '';
		}
		if(this.props.auth.token === undefined){
			this.props.history.push('/login');
		}
		var buttons, editButton, deleteButton;
		if(this.state.deletedList){
			buttons = 
			<Col s={6} className={classNameOffset}>
			<div>
				<Button className='top-buttons cyan lighten-1' onClick={this.showActive}>Active Targets</Button>
				<h5>Companies Deleted</h5>
			</div>
			</Col>
		}else{
			buttons = 
			<Col s={6} className={classNameOffset}>
			<div>
				<Link to='/addCompany'><Button className='top-buttons cyan lighten-1'>Add Company</Button></Link>
				<Button className='top-buttons red lighten-3' onClick={this.showDeleted}>Deleted Targets</Button>
				<h5>Companies of Interest</h5>
			</div>
			</Col>
		}
		var targetData = this.props.targets.map((target, index)=>{
			if(this.state.deletedList){
				return (<tr key={index}>
					<Link to={`/info/${target.targetsId}/view`}><td>{target.name}</td></Link>
					<td>{accounting.formatMoney(target.netIncome)}</td>
					<td className={target.status}>{target.status}</td>
					<td><Button className='cyan lighten-1' onClick={this.handleReactivate} id={target.targetsId}>Reactivate</Button></td>
				</tr>)
			}else{
				return (<tr key={index}>
					<Link to={`/info/${target.targetsId}/view`}><td>{target.name}</td></Link>
					<td>{accounting.formatMoney(target.netIncome)}</td>
					<td className={target.status}>{target.status}</td>
					<td><Link to={`/info/${target.targetsId}/edit`}><Button className='cyan lighten-1' onClick={this.props.removeOffset}>Edit</Button></Link></td>
					<td><Button className='red lighten-3' onClick={this.handleDelete} id={target.targetsId}>Delete</Button></td>
				</tr>)
			}
		});
		return(
			<div>
				<SweetAlert
				        show={this.state.targetAdded}
				        title="Status"
				        text="Target Added"
				        onConfirm={() => this.setState({ targetAdded: false })}
				      />
				<SweetAlert
				        show={this.state.targetUpdated}
				        title="Status"
				        text="Target Updated"
				        onConfirm={() => this.setState({ targetUpdated: false })}
				      />
				<Row>
					{buttons}
				</Row>
				<Row>
					<Col s={6} className={classNameOffset}>
						<Table>
							<thead>
								<tr>
									<th>Company Name</th>
									<th>Net Income</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{targetData}
							</tbody>
						</Table>
					</Col>
					<Col s={6}>
						<Route path='/info/:targetId/:action' component={TargetInfo} />
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
		targetsAdded: state.targetsAdded,
		colOffset: state.colOffset
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getTargets: GetTargetsAction,
		deleteTarget: DeleteTargetAction,
		reactivateTarget: ReactivateTargetAction,
		displayDeleted: DisplayDeletedAction,
		addOffset: AddOffsetAction,
		removeOffset: RemoveOffsetAction
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);