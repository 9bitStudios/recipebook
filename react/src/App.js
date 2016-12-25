import {react} from 'react';
import config from 'Config';
import MainMenu from 'components/menus/MainMenu';
import UserMenu from 'components/menus/UserMenu';
global.Config = config;

export default class App extends React.Component {
    render() {
        return(
            <div>
                <UserMenu />
                <MainMenu />
                {this.props.children}
            </div>
        );
    }
}