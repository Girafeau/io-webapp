import React from 'react';
import './App.css';
import NavBar from "./components/NavBar";
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

function App() {
    const themeObject = theme();
    return (
        <Provider store={store}>
            <ThemeProvider theme={themeObject}>
                <Router>
                    <div className="App">
                        <Route path={'/signup'} component={SignUp}/>
                        <Route path={'/battle/:id'} component={Battle}/>
                    </div>
                </Router>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
