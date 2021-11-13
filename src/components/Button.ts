import styled from "styled-components";
import {Link} from "react-router-dom";

export const Button = styled.button`
 -webkit-appearance: none;
  font-weight: 700;
  height: 4em;
  width: 100%;
  border-radius: 15px;
  color: white;
  background: linear-gradient(90deg, rgb(255,0,219) 0%, rgba(209,0,255,1) 100%);
  border: none;
  font-size: 1em;
  :hover {
    cursor: pointer;
  }
  :active {
    box-shadow: 5px 5px 0px 0px rgb(255,0,219, 0.3);
    outline: none;
  }
  font-family: inherit;
`

export const ButtonLink = styled(Link)`
 -webkit-appearance: none;
  height: 3em;
  min-width: 6em;
  border-radius: 15px;
  color: white;
  background: linear-gradient(90deg, rgb(255,0,219) 0%, rgba(209,0,255,1) 100%);
  border: none;
  font-size: 1em;
  :hover {
    cursor: pointer;
  }
  :active {
    outline: 5px solid rgb(255,0,219, 0.3);
  }
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`
