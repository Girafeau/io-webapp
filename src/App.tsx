import React from 'react';
import './App.css';
import NavBar from "./components/NavBar";
import {ThemeProvider} from "styled-components";
import {theme} from "./theme/theme";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import GameView from "./pages/GameView";

function App() {
    const themeObject = theme();
    return (
        <ThemeProvider theme={themeObject}>
            <Router>
                <div className="App">
                    <NavBar/>
                    <Route path={'/signup'} component={SignUp}/>
                    <Route path={'/game'} component={GameView}/>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
