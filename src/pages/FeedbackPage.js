
import React, { useState, useEffect } from 'react';
import { Box, Text, Heading, VStack } from '@chakra-ui/react';

const FeedbackPage = () => {
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        const storedFeedback = JSON.parse(localStorage.getItem('feedback')) || [];
        setFeedbackList(storedFeedback);
    }, []);

    return (
        <Box p={5} bg={'#e6e6fa'} borderRadius={'lg'} mt={'10px'}>
            <Heading size="lg" mb={6}>Your Feedback</Heading>
            <VStack spacing={4}>
                {feedbackList.length === 0 ? (
                    <Text>No feedback available.</Text>
                ) : (
                    feedbackList.map((feedback, index) => (
                        <Box
                            key={index}
                            borderWidth="1px"
                            borderRadius="lg"
                            p={4}
                            boxShadow="md"
                            width="100%"
                        >
                            <Text><strong>Ride ID:</strong> {feedback.rideId}</Text>
                            <Text><strong>Rating:</strong> {feedback.rating}</Text>
                            <Text><strong>Comments:</strong> {feedback.comments}</Text>
                        </Box>
                    ))
                )}
            </VStack>
        </Box>
    );
};

export default FeedbackPage;
