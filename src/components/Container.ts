import styled from "styled-components";
import {Flex} from "reflexbox";

export const Container = styled(Flex)`
  background-color: ${({theme}) => theme.grey};
  margin-bottom: 2em;
  width: 20em;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  border-radius: 15px;
  border-bottom: rgba(99,99,99,0.3) solid 5px;
`
