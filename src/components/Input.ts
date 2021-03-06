import styled from "styled-components";

export const Input = styled.input`
 -webkit-appearance: none;
  height: 4em;
  border-radius: 15px;
  border: none;
  background-color: rgb(33, 36, 41);
  font-size: 1em;
  width: 100%;
  padding-left: 1em;
  padding-right: 1em;
  color: white;
  ::placeholder {
    opacity: 1;
  }
  :focus {
    outline: 5px solid rgb(255,0,219, 0.3);
  }
 `
