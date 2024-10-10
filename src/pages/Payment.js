import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Button, Input, Box, Text, HStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Pay = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                email: email,
            },
        });

        if (error) {
            console.error(error);
        } else {
            console.log('Payment Method Created:', paymentMethod);
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
        <Box w={'50vw'} h={'50vh'} bg={'#e6e6fa'} ml={'25vw'} mt={'10vh'}>
            <form onSubmit={handleSubmit}>
                <HStack m={'10px'}>
                    <Text>Email:</Text>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size="md"
                        w={'20em'}
                        mt={'10px'}
                        mb={'20px'}
                        variant="filled"
                        borderColor={'#29274a'}
                        focusBorderColor="#29274a"
                        borderRadius="md"
                        bg="white"
                        _hover={{ bg: "gray.200" }}
                        color="gray.700"
                        p={4}
                    />
                </HStack>
                <Text mb={'20px'}>Enter Card Details</Text>
                <CardElement />
                <Button type="submit" colorScheme="teal" disabled={!stripe} >
                    Pay Now
                </Button>

            </form>
        </Box>

    );
};

export default Pay;
