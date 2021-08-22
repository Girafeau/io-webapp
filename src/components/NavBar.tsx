import React, {useState} from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Triangle } from "./Shape";
import useTheme from "../hooks/useTheme";
import { Flex } from "reflexbox";
import {useAppSelector} from "../hooks/useAppSelector";

const Item = styled(Link)`
 display: flex;
 justify-content: center;
 align-items: center;
 height: 4em;
 padding-left: 2em;
 padding-right: 2em;
 margin-left: 1em;
 margin-right: 1em;
 border-radius: 15px;
 color: white;
 text-decoration: none;
 :hover {
  text-decoration: underline;
 }
`

const Signup = styled(Item)`
 text-decoration: underline;
`

const MainItem = styled(Item)`
  background-color: white;
  color: ${({ theme }) => theme.black};
`

const Logo = styled(Item)`
  text-align: left;
  text-decoration: none;
`

const NavBar = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const [room, setRoom] = useState('' + int(999, 9999));
    return (<Flex justifyContent={'space-between'} alignItems={'center'} p={4}>
        <Flex>
            <Logo to={'/'}>spaceship<Triangle/>battle</Logo>
        </Flex>
        <Flex>
            <Item to={'/rooms'}>Rooms</Item>
            <Item to={`/battle/${room}`}>Create a room</Item>
            <Item to={'/shop'}>Shop</Item>
            <Item to={'/ranking'}>Ranking</Item>
            {
                isLoggedIn ? <MainItem to={'/profile'}>Profile</MainItem> : <React.Fragment><Signup to={'/signup'}>Sign up</Signup> <MainItem to={'/login'}>Log in</MainItem></React.Fragment>

            }
        </Flex>
    </Flex>);

}

export default NavBar;

const int = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
