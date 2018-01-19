import React, { Component } from 'react';
import { BrowserRouter  as Router, Route} from 'react-router-dom';
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
						<Route path='/profile' component={Profile} />
						<div style={{marginLeft: '400px'}}>
							<Route path='/register' component={Register} />
							<Route path='/login' component={Login} />
						</div>
						<Route path='/addCompany' component={AddCompany} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
