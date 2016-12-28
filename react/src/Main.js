import {react} from 'react';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';
import Authentication from 'utilities/Authentication';
import App from './App';
import UserMenu from 'components/menus/UserMenu';
import HomePage from 'components/pages/HomePage';
import AboutPage from 'components/pages/AboutPage';
import LoginPage from 'components/pages/LoginPage';
import RecipeListPage from 'components/pages/RecipeListPage';
import RecipeViewPage from 'components/pages/RecipeViewPage';
import RecipeEditPage from 'components/pages/RecipeEditPage';

ReactDOM.render(<UserMenu />, document.getElementById('userInfo'));

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage} />
            <Route path="about" component={AboutPage} />
            <Route path="login" component={LoginPage} />
            <Route path="recipes" component={RecipeListPage} onEnter={Authentication.authenticateRoute} />
            <Route path="recipe/:id" component={RecipeViewPage} onEnter={Authentication.authenticateRoute} />
            <Route path="edit/:id" component={RecipeEditPage} onEnter={Authentication.authenticateRoute} />
        </Route>
    </Router>, 
document.getElementById('content'));