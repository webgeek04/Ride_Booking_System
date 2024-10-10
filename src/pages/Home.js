import { useNavigate } from 'react-router-dom';
import React from 'react';
import taxi from '../components/taxi.jpg'
import {
    Box,
    VStack,
    HStack,
    Button,
    Heading,
    Text,
    Image,
} from "@chakra-ui/react";
import { FaTaxi } from "react-icons/fa";

const Home = () => {

    const navigate = useNavigate();
    const handleBooking = () => {
        navigate('/ride-booking');
    };

    return (
        <Box
            w="100%"
            pt="0%"

        >
            <VStack>

                <Box bg="#e6e6fa" mt={'20px'} py={8} w={'100%'} h={'auto'}>
                    <HStack>
                        <Box m={'10px'} w={'auto'} h={'100%'} >
                            <VStack w={'85%'}>
                                <HStack>
                                    <Heading as="h1" size="3xl" color="#29274a" textAlign="center" m={'auto'} mb={'10px'}>
                                        Ride Booking System
                                    </Heading>
                                    <FaTaxi size={'80px'} />
                                </HStack>
                                <Text fontSize="xl" color="#29274a" mb={'10px'}>
                                    Book a ride with just a few clicks!
                                </Text >
                                <Text fontSize="lg" color="#29274a" mb={'10px'}>
                                    Welcome to QuickRide, your reliable and convenient ride-booking solution. Whether you're commuting to work, heading to the airport, or exploring the city, QuickRide makes it easy to book safe and affordable rides in just a few clicks. With real-time tracking, multiple payment options, and flexible ride-sharing, we ensure a seamless travel experience tailored to your needs. Hop in, and let us drive you to your destination with comfort and ease!

                                </Text>

                                <Button
                                    colorScheme="green"
                                    size="lg"
                                    w="30%"
                                    onClick={handleBooking}
                                    leftIcon={<FaTaxi />}
                                >
                                    Book Your Ride
                                </Button>
                            </VStack>
                        </Box>

                        <Image
                            borderRadius='20px'
                            boxSize='300px'
                            src={taxi}
                            alt='Image Loading'
                            mr={'30px'}

                        />

                    </HStack>
                </Box>
            </VStack>
        </Box>

    );
};

export default Home;
