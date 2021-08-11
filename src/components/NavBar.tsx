import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import {Triangle, TriangleRight} from "./Dot";
import useTheme from "../hooks/useTheme";

const Container = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 5em;
`

const Item = styled(Link)`
 display: flex;
    justify-content: center;
    align-items: center;
    height: 4em;
    width: 10em;
    border-radius: 15px;
    color: black;
    text-decoration: none;
`

const Signup = styled(Item)`
 text-decoration: underline;
`

const List = styled.div`
  display: flex;
  align-items: center;
`

const Login = styled(Item)`
  background-color: ${({ theme }) => theme.black};
  color: white;
`

const Logo = styled(Item)`
  font-size: 1.2em;
  text-decoration: none;
`


const NavBar = () => {
    const theme = useTheme();
    return (<Container>
        <List>
            <Logo to="/">/spaceship/<Triangle/>battle</Logo>
        </List>
        <List>
            <Item to="/signup"><TriangleRight color={theme.primary}/>Cosmetics</Item>
            <Item to="/signup"><TriangleRight color={theme.purple}/>Create a room</Item>
            <Signup to="/signup">Sign up</Signup>
            <Login to="/login">Log in</Login>
        </List>
    </Container>);

}

export default NavBar;