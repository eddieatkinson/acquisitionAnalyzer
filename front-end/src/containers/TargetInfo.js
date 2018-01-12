import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';
import { Row, Col, Table } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TargetInfo extends Component{
	render(){
		return(
			<div>
				<h1>Target Info</h1>
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
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetInfo);