import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <p>Page not found</p>
            <p>Go to the <Link to="/">front page</Link> to join a room</p>
        </>
    );
};

export default NotFound;
