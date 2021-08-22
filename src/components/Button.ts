import styled from "styled-components";

export const Button = styled.button`
 -webkit-appearance: none;
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
    outline: 5px solid rgb(255,0,219, 0.3);
  }
  font-family: inherit;
`
