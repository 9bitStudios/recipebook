import {react} from 'react';
import config from 'Config';
global.Config = config;

export default class App extends React.Component {
    render() {
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}