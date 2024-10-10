import { useContext, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, Text, InputGroup, InputRightElement, VStack, Heading, HStack, useToast } from "@chakra-ui/react";

const Login = () => {
    const { handleLogin } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const handleRegister = () => {
        navigate('/register')
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(username, password);
        if (username && password) {
            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 1000,
                isClosable: true,
            });
            navigate('/ride-booking');
        }
        else {
            toast({
                title: 'Enter Credentials',
                status: 'error',
                duration: 1000,
                isClosable: true,
            });
        }

    };

    return (
        <Box
            bg={'#e6e6fa'} w={{ base: '90%', md: '400px' }}
            p={8}
            mx="auto"
            mt={12}
            boxShadow="lg"
            rounded="md"
        >
            <VStack>
                <Heading size={'md'}>Login</Heading>
                <Text size={'md'} mr={'auto'}>Name</Text>
                <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    size="md"
                    m={'5px'}
                    mt={'0px'}
                    variant="filled"
                    borderColor={'#29274a'}
                    focusBorderColor="#29274a"
                    borderRadius="md"
                    bg="white"
                    _hover={{ bg: "gray.200" }}
                    color="gray.700"
                    p={4}
                />
                <Text size={'md'} mr={'auto'}>Password</Text>
                <InputGroup size='md'>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        onChange={(e) => setPassword(e.target.value)}
                        size="md"
                        m={'5px'}
                        mt={'0px'}
                        variant="filled"
                        borderColor={'#29274a'}
                        focusBorderColor="#29274a"
                        borderRadius="md"
                        bg="white"
                        _hover={{ bg: "gray.200" }}
                        color="gray.700"
                        p={4}

                    />
                    <InputRightElement width='4.5rem' h={'2rem'} justifyContent="center" alignItems="center">
                        <Button h='80%' size='sm' mt={'2px'} onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button onClick={onSubmit}
                    bg={'green'} color={'white'} size={'md'} fontSize={'lg'} m={'5px'}
                    _hover={{ bg: 'white', color: 'green' }}
                >Login</Button>
                <HStack mt={'1px'}>
                    <Text>Not Registered? </Text>
                    <Button onClick={handleRegister} size={'sm'} bg={'white'} color={'green'} fontSize={'md'}>Create an Account</Button>
                </HStack>
            </VStack>
        </Box>
    );
}

export default Login;