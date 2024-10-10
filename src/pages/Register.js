import { useContext, useState } from "react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { Box, Input, Button, VStack, InputGroup, InputRightElement, Heading, Text, HStack, useToast } from '@chakra-ui/react';

const Register = () => {
    const { handleRegister } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [show, setShow] = React.useState(false)

    const navigate = useNavigate();
    const toast = useToast();

    const handleClick = () => setShow(!show)

    const handleLogin = () => {
        navigate('/login')
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await handleRegister({ username, password });
        if (username && password && contact && email) {
            toast({
                title: 'Account Created',
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
            mt={6}
            boxShadow="lg"
            rounded="md"

        >
            <VStack>
                <Heading size={'md'}>Register</Heading>
                <Text size={'md'} mr={'auto'}>Name</Text>
                <Input
                    placeholder="Enter Username"
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
                <Text size={'md'} mr={'auto'}>Email</Text>
                <Input
                    placeholder="Enter Email"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    size="md"
                    m={'5px'}
                    mt={'0px'}
                    variant="filled"
                    focusBorderColor="#29274a"
                    borderColor={'#29274a'}
                    borderRadius="md"
                    bg="white"
                    _hover={{ bg: "gray.200" }}
                    color="gray.700"
                    p={4}
                />
                <Text size={'md'} mr={'auto'}>Contact Number</Text>
                <Input
                    placeholder="Enter Contact Number"
                    value={contact}
                    type="number"
                    onChange={(e) => setContact(e.target.value)}
                    size="md"
                    m={'5px'}
                    mt={'0px'}
                    variant="filled"
                    focusBorderColor="#29274a"
                    borderColor={'#29274a'}
                    borderRadius="md"
                    bg="white"
                    _hover={{ bg: "gray.200" }}
                    color="gray.700"
                    p={4}
                />
                <Button onClick={onSubmit}
                    bg={'green'} color={'white'} size={'md'}
                    _hover={{ bg: 'white', color: 'green' }}
                >Register</Button>
                <HStack mt={'1px'}>
                    <Text>Already Registered? </Text>
                    <Button onClick={handleLogin} size={'sm'} bg={'white'} color={'green'} fontSize={'md'}>Login</Button>
                </HStack>
            </VStack>
        </Box>

    );

};

export default Register;