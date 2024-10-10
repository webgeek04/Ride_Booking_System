import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Heading,
    Text,
    VStack,
    HStack,
    Icon,
    Divider,
    Flex,
    useColorModeValue,
    Spinner,
    Button
} from '@chakra-ui/react';
import { FaCar, FaCalendarAlt, FaUser } from 'react-icons/fa';

const RideHistory = () => {
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);
    const cardShadow = useColorModeValue('lg', 'dark-lg');

    const navigate = useNavigate();

    const handleFeedback = () => {
        navigate('/feedback');
    };

    const handleHome = () => {
        navigate('/ride-booking');
    };

    useEffect(() => {
        const storedRides = JSON.parse(localStorage.getItem('rideHistory')) || [];
        setRides(storedRides);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Spinner size="xl" color="teal.500" />
            </Flex>
        );
    }

    return (
        <Box py={8} px={4} maxW="5xl" mx="auto">
            <Heading mb={6} textAlign="center" color="#29274a">
                Ride History
            </Heading>

            {rides.length === 0 ? (
                <Text fontSize="xl" color="#29274a" textAlign="center">
                    No ride history available.
                </Text>
            ) : (
                <VStack spacing={6} align="stretch">
                    {rides.map((ride) => (
                        <Box
                            key={ride.id}
                            shadow={cardShadow}
                            borderRadius="md"
                            p={6}
                            w="100%"
                            bg={'#e6e6fa'}
                        >
                            <VStack align="stretch" spacing={4} >
                                <HStack justify="space-between" >
                                    <Flex align="center">
                                        <Icon as={FaCalendarAlt} w={5} h={5} color="#29274a" mr={2} />
                                        <Text fontSize="lg" fontWeight="bold">
                                            {ride.date}
                                        </Text>
                                    </Flex>
                                </HStack>

                                <Divider />

                                <Flex align="center" >
                                    <Icon as={FaUser} w={5} h={5} color="#29274a" mr={2} />
                                    <Text fontSize="lg" color="gray.600">
                                        PickUp: {ride.pickup}
                                    </Text>
                                </Flex>

                                <Flex align="center">
                                    <Icon as={FaCar} w={5} h={5} color="#29274a" mr={2} />
                                    <Text fontSize="lg" color="gray.600">
                                        Destination: {ride.destination}
                                    </Text>
                                </Flex>
                                <Button onClick={handleFeedback}
                                    bg={'white'} color={'green'} size={'md'} w={'30%'}
                                    _hover={{ bg: 'green', color: 'white' }}
                                >Give Feedback</Button>
                            </VStack>
                        </Box>
                    ))}
                    <Button onClick={handleHome}
                        bg={'green'} color={'white'} size={'md'} w={'30%'} m={'auto'}
                        _hover={{ bg: 'white', color: 'green' }}
                    >Go to Home</Button>
                </VStack>
            )}
        </Box>
    );
};

export default RideHistory;
