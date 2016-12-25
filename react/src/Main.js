import {react} from 'react';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';
import Authentication from 'utilities/Authentication';
import App from './App';
import UserMenu from 'components/menus/UserMenu';
import Home from 'components/pages/Home';
import About from 'components/pages/About';
import Login from 'components/pages/Login';
import Recipes from 'components/pages/Recipes';

ReactDOM.render(<UserMenu />, document.getElementById('userInfo'));

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="about" component={About} />
            <Route path="login" component={Login} />
            <Route path="recipes" component={Recipes} onEnter={Authentication.authenticateRoute} />
        </Route>
    </Router>, 
document.getElementById('content'));