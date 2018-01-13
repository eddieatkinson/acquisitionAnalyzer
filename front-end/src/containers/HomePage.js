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

	render(){
		var targetData = this.props.targets.map((target, index)=>{
			return (<tr key={index}>
				<Link to={`/homePage/${target.id}`}><td>{target.name}</td></Link>
				<td>{target.status}</td>
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
								</tr>
							</thead>
							<tbody>
								{targetData}
							</tbody>
						</Table>
					</Col>
					<Col s={4}>
						<Route path='/homePage/:targetId' component={TargetInfo} />
					</Col>
				</Row>
			</div>
		)
	}
}


function mapStateToProps(state){
	return{
		auth: state.auth,
		targets: state.targets
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getTargets: GetTargetsAction
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);