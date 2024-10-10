// src/components/FeedbackForm.js
import React, { useState } from 'react';
import { Box, Button, Input, Textarea, Heading, useToast } from '@chakra-ui/react';
import FeedbackPage from '../pages/FeedbackPage';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
    const [rideId, setRideId] = useState('');
    const [rating, setRating] = useState('');
    const [comments, setComments] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/ride-booking');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!rating || !comments || !rideId) {
            toast({
                title: 'Error',
                description: 'Please provide a ride ID, rating, and comments.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const feedback = { rideId, rating, comments };

        const existingFeedback = JSON.parse(localStorage.getItem('feedback')) || [];

        existingFeedback.push(feedback);

        localStorage.setItem('feedback', JSON.stringify(existingFeedback));

        toast({
            title: 'Feedback Submitted',
            description: 'Thank you for your feedback!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });


        setRideId('');
        setRating('');
        setComments('');
    };

    return (
        <Box
            w={'50%'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}
            m={'auto'}
            mt={'5px'}
            boxShadow="lg"
        >
            <Heading size="md" mb={4}>Give Feedback</Heading>
            <form onSubmit={handleSubmit}>
                <Input
                    placeholder="Ride ID"
                    value={rideId}
                    onChange={(e) => setRideId(e.target.value)}
                    mb={3}
                />
                <Input
                    placeholder="Rating (1-5)"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    type="number"
                    min="1"
                    max="5"
                    mb={3}
                />
                <Textarea
                    placeholder="Comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    mb={3}
                />
                <Button colorScheme="green" type="submit"
                    _hover={{ bg: 'gray.500', color: 'white' }}
                >Submit Feedback</Button>
            </form>
            <FeedbackPage />
            <Button onClick={handleHome}
                bg={'green'} color={'white'} size={'md'} w={'30%'} m={'auto'} mt={'10px'}
                _hover={{ bg: 'white', color: 'green' }}
            >Go to Home</Button>
        </Box>
    );
};

export default FeedbackForm;
