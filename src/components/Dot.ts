import styled from "styled-components";

const Dot = styled.span`
  height: 7px;
  width: 7px;
  border-radius: 50px;
  background-color: ${({theme}) => theme.secondary};
  margin: 5px;
  display: inline-block;
`

const Triangle = styled.span`
width: 0;
height: 0;
border-left: 5px solid transparent;
border-right: 5px solid transparent;
border-bottom: 10px solid ${({theme}) => theme.secondary};
display: inline-block;
margin: 5px;
`

const TriangleRight = styled.span`
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-left: 10px solid ${(props: Color) => props.color};
  border-bottom: 5px solid transparent;
  display: inline-block;
  margin-right: 8px;
`

type Color = {
    color: string
}


export {
    Dot,
    Triangle,
    TriangleRight
};