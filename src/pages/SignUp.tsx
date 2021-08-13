import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { signup } from "../actions/auth";
import {useAppSelector} from "../hooks/useAppSelector";

type Inputs = {
    email: string,
    username: string,
    password: string
};


const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`
type SideProps = {
    width: number
}
const Side = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: ${(props: SideProps) => props.width}%;
  padding-left: 6em;
`

const Form = styled.form`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 40em;
`

const Control = styled.div`
  display: flex;
  flex-direction: column;
`

const ControlGroup = styled.div`
   display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
flex-wrap: wrap;
flex: 1 1 auto;
`

const Input = styled.input`
-webkit-appearance: none;
  height: 4em;
  padding-right: 1em;
  padding-left: 1em;
  border-radius: 15px;
  border: 1px solid #e8e8e8;
  background-color: #f3f3f4;
  margin-bottom: 1.2em;
  font-size: 1em;
  outline: none;
//box-shadow: 0px 10px 15px 0px rgba(226,226,226,0.5);
  ::placeholder {
    color: ${({theme}) => theme.grey};
    opacity: 1;
  }
  
  :focus {
    border: 1px solid ${({theme}) => theme.primary};
    outline: 2px blue;
  
  }
`

const Label = styled.label`
  margin-bottom: 0.8em;
  text-align: left;
  
`

const Title = styled.h1`
  margin-bottom: 0.5em;
  margin-top: 2em;
  font-size: 1.8em;
  
`

const Subtitle = styled.h3`
margin-bottom: 2em;
color: ${({ theme }) => theme.grey};
font-weight: normal;
`

const Button = styled.button`
  height: 4em;
  margin-top: 2em;
  border-radius: 15px;
  color: white;
  background-color: ${({ theme }) => theme.primary};
   border: 2px solid ${({ theme }) => theme.primary};
  -webkit-appearance: none;
   font-size: 1em;

box-shadow: 0px 19px 20px 0px rgba(55,97,220,0.15);
`

const Info = styled.div`
  font-size: 0.8em;
`

const Message = styled.span`

`

const regex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i

const SignUp = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
            const { email, username, password } = data;
            dispatch(signup(email, username, password));
    };
    const results = useAppSelector((state) => state.auth.isLoggedIn);
    console.log(results)
    return (<Container>
        <Side width={50}>
            <Title>Create an account</Title>
            <Subtitle>Let's begin the adventure</Subtitle>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ControlGroup>
                    <Control>
                        <Label>Email</Label>
                        <Input { ...register('email', { required: true, pattern: regex }) }/>
                        {
                            errors.email && <Message>Password is required</Message>
                        }
                    </Control>
                    <Control>
                        <Label>Username</Label>
                        <Input { ...register('username', { required: true, minLength: 3, maxLength: 55 }) }/>
                        {
                            errors.username && <Message>Password is required</Message>
                        }
                    </Control>
                </ControlGroup>
                <ControlGroup>
                    <Control>
                        <Label>Password</Label>
                        <Input type={'password'} { ...register('password', { required: true, minLength: 8, maxLength: 55 }) }/>
                        {
                            errors.password && <Message>Password is required</Message>
                        }
                    </Control>
                </ControlGroup>
                <Info>Already have an account ? <Link to={"/login"}>Log in here.</Link></Info>
                <Info>By creating an account, you agree to the <Link to={"/login"}>Terms of Service.</Link></Info>
                <Control>
                    <Button type={'submit'}>Sign up</Button>
                </Control>

            </Form>
        </Side>
        <Side width={50}></Side>
    </Container>);

}

export default SignUp;
