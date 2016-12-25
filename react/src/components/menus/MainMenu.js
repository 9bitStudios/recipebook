import {react} from 'react';
import {Link} from 'react-router';

export default class MainMenu extends React.Component {

    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </div>
        );
    }
}