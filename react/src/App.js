import {react} from 'react';
import config from 'Config';
global.Config = config;

export class App extends React.Component {
    render() {
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}