import React, { Component } from 'react';
import { BrowserRouter  as Router, Route} from 'react-router-dom';
import { Footer, Col, Row, Input, Button, NavBar, NavItem } from 'react-materialize';
import Navbar from './containers/Navbar';
import Login from './containers/Login';
import Register from './containers/Register';
import HomePage from './containers/HomePage';
import Profile from './containers/Profile';
import AddCompany from './containers/AddCompany';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Navbar />
					<div className='container-fluid'>
						<Route exact path='/' component={HomePage} />
						<Route path='/info' component={HomePage} />
						<Route path='/message/:msg' component={HomePage} />
						<Route path='/profile' component={Profile} />
						<Row>
							<Col s={6} className ='offset-s3'>
								<Row>
									<Col s={12}>
										<Route path='/register' component={Register} />
										<Route path='/login' component={Login} />
									</Col>
								</Row>
							</Col>
						</Row>
						<Route path='/addCompany' component={AddCompany} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
