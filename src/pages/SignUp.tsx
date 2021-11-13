import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { login, signup } from "../actions/auth";
import { useAppSelector } from "../hooks/useAppSelector";
import { Title, Message, Info, Label, Bold } from "../components/Text";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Flex, Box } from 'reflexbox';
import NavBar from "../components/NavBar";

type Inputs = {
    email: string,
    username: string,
    password: string
};

const regex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i

const SignUp = () => {
    const history = useHistory();
    const [message, setMessage] = useState<string []>([]);
    const dispatch = useAppDispatch();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async data => {
        const {email, username, password} = data;
        dispatch(await signup(email, username, password, async (err, message) => {
            console.log(err)
            setMessage(message);
            if(!err) {
                dispatch(await login(email, password, (err, message) => {
                    console.log(err)
                    history.push('/');
                }));
            }
        }))
    };
    const results = useAppSelector((state) => state);
    const messages = message.map((s, i) => <Message key={i}>{s}</Message>)
    console.log(results)
    return (
        <React.Fragment>
            <NavBar/>
            <Flex m={5}>
                <Box width={1/3}>
                    <Title>Create an account<Bold color={'#ee00ff'}>.</Bold></Title>
                    <Box as={'form'} onSubmit={handleSubmit(onSubmit)} py={3}>
                        <Flex mx={-2} mb={3}>
                            <Box width={1/2} px={2}>
                                <Label>Email address</Label>
                                <Input { ...register('email', { required: true, pattern: regex }) }/>
                                {
                                    errors.email && <Message>Not a valid email address.</Message>
                                }
                            </Box>
                            <Box width={1/2} px={2}>
                                <Label>Username</Label>
                                <Input { ...register('username', { required: true, minLength: 3, maxLength: 55 }) }/>
                                {
                                    errors.username && <Message>Not a valid username.</Message>
                                }
                            </Box>
                        </Flex>
                        <Flex mx={-2} mb={3}>
                            <Box width={1} px={2}>
                                <Label>Password</Label>
                                <Input type={'password'} { ...register('password', { required: true, minLength: 8, maxLength: 55 }) }/>
                                {
                                    errors.password && <Message>Password must be at least 8 and at most 55 characters long.</Message>
                                }
                            </Box>
                        </Flex>
                        <Flex mx={-2} mb={3}>
                            <Box width={1} px={2}>
                                <Info>Do you already have an account ?&nbsp;<Link to={"/login"}> Log in here.</Link></Info>
                            </Box>
                        </Flex>

                        <Flex mx={-2} mb={3}>
                            <Box width={1} px={2}>
                                <Button type={'submit'}>Create an account</Button>
                            </Box>
                        </Flex>
                        {messages}
                    </Box>
                </Box>
                <Box>

                </Box>
            </Flex>
        </React.Fragment>);

}

export default SignUp;
