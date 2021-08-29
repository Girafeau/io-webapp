import {Link, useHistory} from "react-router-dom";
import React, {useState} from "react";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {SubmitHandler, useForm} from "react-hook-form";
import {login} from "../actions/auth";
import {Info, Label, Message, Subtitle, Title} from "../components/Text";
import NavBar from "../components/NavBar";
import {Box, Flex} from "reflexbox";
import {Input} from "../components/Input";
import {Button} from "../components/Button";

type Inputs = {
    email: string,
    password: string
};

const Login = () => {
    const history = useHistory();
    const [message, setMessage] = useState<string []>([]);
    const dispatch = useAppDispatch();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async data => {
        const { email, password } = data;
        dispatch(await login(email, password, (err, message) => {
            setMessage(message);
            if(!err) {
                history.push('/');
            }
        }));
    };
    const messages = message?.map((s, i) => <Message key={i}>{s}</Message>)
    return (
        <React.Fragment>
            <NavBar/>
            <Flex m={4}>
                <Box width={1/2}>
                    <Title>Log into your account</Title>
                    <Box as={'form'} onSubmit={handleSubmit(onSubmit)} py={3}>
                        <Flex mx={-2} mb={3}>
                            <Box width={1} px={2}>
                                <Label>Email</Label>
                                <Input { ...register('email', { required: true }) }/>
                                {
                                    errors.email && <Message>Not a valid email address.</Message>
                                }
                            </Box>
                        </Flex>
                        <Flex mx={-2} mb={3}>
                            <Box width={1} px={2}>
                                <Label>Password</Label>
                                <Input type={'password'} { ...register('password', { required: true }) }/>
                                {
                                    errors.password && <Message>Password must be at least 8 and at most 55 characters long.</Message>
                                }
                            </Box>
                        </Flex>
                        <Flex mx={-2} mb={3}>
                            <Box width={1} px={2}>
                                <Info>Don't have an account ?&nbsp;<Link to={"/signup"}>Create one here.</Link></Info>
                            </Box>
                        </Flex>

                        <Flex mx={-2} mb={3}>
                            <Box width={1} px={2}>
                                <Button type={'submit'}>Login</Button>
                            </Box>
                        </Flex>
                        {messages}
                    </Box>
                </Box>
                <Box>
                    IMAGE
                </Box>
            </Flex>
        </React.Fragment>);

}

export default Login;
