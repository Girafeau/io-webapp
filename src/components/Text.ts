import styled from "styled-components";

export const Label = styled.label`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 0.8em;
`

export const Title = styled.h1`
  font-size: 1.8em;
  margin-top: 2em;
  margin-bottom: 0.8em;
  text-shadow: 0 0 0 rgb(255 0 0), 0 0 0 rgb(0 255 0), 0 0 0 rgb(0 0 255);
  animation: glitch 10s infinite cubic-bezier(0.5,-2000,0.5,2000);
  :before {
    content: '';
  }
  @keyframes glitch {
    2.5%,100% {
      text-shadow: 0.03px -0.01px 0.01px rgb(255 0 0), 0.02px 0.02px 0 rgb(0 255 0), -0.02px 0.02px 0 rgb(0 0 255);
    }
  }

`

export const Subtitle = styled.h3`
  margin-bottom: 2em;
`

export const Info = styled.div`
  margin-bottom: 0.8em;
  min-width: 0;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
`

export const Message = styled.span`
margin-bottom: 0.8em;
margin-top: 0.8em;
  text-align: left;
  color: #ff214b;
  box-sizing: border-box;
min-width: 0;
width: 100%;
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
`

export const Bold = styled.span`
  font-weight: 700;
`
