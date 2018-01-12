import React, { Component } from 'react';
import { BrowserRouter  as Router, Route} from 'react-router-dom';
import Login from './containers/Login';
import Register from './containers/Register';
import HomePage from './containers/HomePage';

class App extends Component {
	render() {
		return (
			<Router>
				<div className='container'>
					<Route exact path='/' component={Login} />
					<Route path='/register' component={Register} />
					<Route path='/homePage' component={HomePage} />
				</div>
			</Router>
		);
	}
}

export default App;
