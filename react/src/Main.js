import {react} from 'react';
import { Router, Route, hashHistory, useRouterHistory, IndexRoute, Link } from 'react-router';
import { createHashHistory } from 'history';
import Authentication from 'utilities/Authentication';
import App from './App';
import UserMenu from 'components/menus/UserMenu';
import Notification from 'components/notifications/Notification';
import HomePage from 'components/pages/HomePage';
import AboutPage from 'components/pages/AboutPage';
import SignUpPage from 'components/pages/SignUpPage';
import LoginPage from 'components/pages/LoginPage';
import RecipeListPage from 'components/pages/RecipeListPage';
import RecipeAddPage from 'components/pages/RecipeAddPage';
import RecipeViewPage from 'components/pages/RecipeViewPage';
import RecipeEditPage from 'components/pages/RecipeEditPage';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(<UserMenu />, document.getElementById('userInfo'));

ReactDOM.render(<Notification />, document.getElementById('message'));

ReactDOM.render(
    <Router history={appHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/recipes" component={RecipeListPage} onEnter={Authentication.authenticateRoute} />
            <Route path="/new" component={RecipeAddPage} onEnter={Authentication.authenticateRoute} />
            <Route path="/recipe/:id" component={RecipeViewPage} onEnter={Authentication.authenticateRoute} />
            <Route path="/edit/:id" component={RecipeEditPage} onEnter={Authentication.authenticateRoute} />
        </Route>
    </Router>, 
document.getElementById('content'));