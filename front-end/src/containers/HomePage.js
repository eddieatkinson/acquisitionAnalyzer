import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';
import { Row, Col, Table, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetTargetsAction from '../actions/GetTargetsAction';
import TargetInfo from './TargetInfo';

class HomePage extends Component{

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

	render(){
		if(this.props.auth.token === undefined){
			this.props.history.push('/login');
		}
		var targetData = this.props.targets.map((target, index)=>{
			return (<tr key={index}>
				<Link to={`/info/${target.targetsId}/view`}><td>{target.name}</td></Link>
				<td>{target.status}</td>
				<td><Link to={`/info/${target.targetsId}/edit`}><Button>Edit</Button></Link></td>
				<td><Link to={`/info/${target.targetsId}/delete`}><Button>Delete</Button></Link></td>
			</tr>)
		});
		return(
			<div>
				<Row>
					<h5>Companies of Interest<Link to='/addCompany'><Button>Add Company</Button></Link></h5>
					<Col s={8}>
						<Table>
							<thead>
								<tr>
									<th>Company Name</th>
									<th>Status</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{targetData}
							</tbody>
						</Table>
					</Col>
					<Col s={4}>
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
		targetsAdded: state.targetsAdded
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getTargets: GetTargetsAction
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);