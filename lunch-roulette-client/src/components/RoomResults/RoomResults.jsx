import React from 'react';
import './RoomResults.css';

class RoomResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: this.props.location.state ? this.props.location.state.results : undefined,
        };
    }

    render () {
        const { results } = this.state;
        return (
            <div className="RoomResults-container">
                <p>The results are:</p>
                <h1>{results}</h1>
            </div>
        );
    }
}

export default RoomResults;