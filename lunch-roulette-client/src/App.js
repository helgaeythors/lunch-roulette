import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import SocketContext from './context/socketContext';
import FrontPage from './components/FrontPage/FrontPage';
import CreateRoom from './components/CreateRoom/CreateRoom';
import './App.css';

class App extends React.Component {

    render () {
        const { socket } = this.context;

        return (
        <div className="App">
            <div className="App-foodicon-container">
                <FastfoodOutlinedIcon color="primary" />
            </div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={ (props) => <FrontPage {...props} socket={socket}/> } />
                    <Route exact path="/create" render={ (props) => <CreateRoom {...props} socket={socket} /> } />
                </Switch>
            </BrowserRouter>
            
        </div>
        );
    }
};

App.contextType = SocketContext;

export default App;
