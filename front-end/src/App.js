import React, { Component } from 'react';
import { BrowserRouter  as Router, Route} from 'react-router-dom';
import Login from './containers/Login';
import Register from './containers/Register';
import HomePage from './containers/HomePage';
import AddCompany from './containers/AddCompany';

class App extends Component {
	render() {
		return (
			<Router>
				<div className='container'>
					<Route exact path='/' component={HomePage} />
					<Route path='/register' component={Register} />
					<Route path='/login' component={Login} />
					<Route path='/addCompany' component={AddCompany} />
				</div>
			</Router>
		);
	}
}

export default App;
