import React from 'react';
import './App.css';
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Battle from "./pages/Battle";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Rooms from "./pages/Rooms";
import Ranking from "./pages/Ranking";
import Profile from "./pages/Profile";

function App() {
    const themeObject = theme();
    return (
        <Provider store={store}>
            <ThemeProvider theme={themeObject}>
                <Router>
                    <div className="App">
                        <Route exact={true} path={'/'} component={Home}/>
                        <Route path={'/login'} component={Login}/>
                        <Route path={'/signup'} component={SignUp}/>
                        <Route path={'/shop'} component={Shop}/>
                        <Route path={'/rooms'} component={Rooms}/>
                        <Route path={'/ranking'} component={Ranking}/>
                        <Route path={'/profile'} component={Profile}/>
                        <Route path={'/battle/:id'} component={Battle}/>
                    </div>
                </Router>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
