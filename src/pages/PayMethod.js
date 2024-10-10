import { useState } from "react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Button, VStack, Heading, useToast, Select } from '@chakra-ui/react';

const PayMethod = () => {

    const [method, setMethod] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleClick = () => {
        if (method === 'card')
            navigate('/payment');
        if (method === 'cash') {
            toast({
                title: "Booking Confirmed",
                description: `Your ride is Confirmed.`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate('/ride-history');
        }
    };

    return (
        <Box bg={'#e6e6fa'} w={'100vw'} h={'100vh'} p={'5vh'} >
            <Box bg={'white'} w={'40vw'} h={'40vh'} m={'auto'} borderRadius={'xl'} >
                <VStack>
                    <Heading>Select Payment Method</Heading>
                    <Select value={method} onChange={(e) => setMethod(e.target.value)} placeholder='Select option'>
                        <option value='cash'>Cash</option>
                        <option value='card'>Debit Card/ Credit Card</option>
                    </Select>
                    <Button bg={'green.300'} onClick={handleClick}>Proceed</Button>
                </VStack>
            </Box>
        </Box>
    )
};

export default PayMethod;