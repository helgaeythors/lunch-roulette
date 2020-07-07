import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import { Link } from 'react-router-dom';
import SocketContext from './context/socketContext';
import FrontPage from './components/FrontPage/FrontPage';
import CreateRoom from './components/CreateRoom/CreateRoom';
import JoinRoom from './components/JoinRoom/JoinRoom';
import Room from './components/Room/Room';
import RoomResults from './components/RoomResults/RoomResults';
import NotFound from './components/NotFound/NotFound';
import './App.css';

class App extends React.Component {

    render () {
        const { socket } = this.context;

        return (
        <div className="App">
            <BrowserRouter>
                <div className="App-foodicon-container">
                    <Link to="/">
                        <FastfoodOutlinedIcon color="primary" />
                    </Link>
                </div>
                <Switch>
                    <Route exact path="/" render={ (props) => <FrontPage {...props} socket={socket}/> } />
                    <Route exact path="/create" render={ (props) => <CreateRoom {...props} socket={socket} /> } />
                    <Route exact path="/join" render={ (props) => <JoinRoom {...props} socket={socket} /> } />
                    <Route exact path="/room/:roomId/results" render={ (props) => <RoomResults {...props} socket={socket} /> } />
                    <Route exact path="/room/:roomId" render={ (props) => <Room {...props} socket={socket} /> } />
                    <Route component={ NotFound } />
                </Switch>
            </BrowserRouter>
            
        </div>
        );
    }
};

App.contextType = SocketContext;

export default App;
