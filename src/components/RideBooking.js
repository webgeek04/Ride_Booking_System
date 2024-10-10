import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
    GoogleMap,
    LoadScript,
    Autocomplete,
    DirectionsService,
    DirectionsRenderer,
    Marker,
    DistanceMatrixService,
} from "@react-google-maps/api";
import { Box, VStack, HStack, Input, Button, useToast, Text, Select } from '@chakra-ui/react';
import { MdMyLocation } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const defaultCenter = { lat: 40.748817, lng: -73.985428 };

const containerStyle = {
    width: '100%',
    height: '400px',
};

const RIDE_COSTS = {
    standard: 6,
    premium: 10,
    luxury: 15,
};

const RideBooking = () => {

    const [directions, setDirections] = useState(null);
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [pickupCoords, setPickupCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);
    const [travelType, setTravelType] = useState('standard');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [cost, setCost] = useState(0);
    const toast = useToast();
    const navigate = useNavigate();
    const [autocompletePickup, setAutocompletePickup] = useState(null);
    const [autocompleteDestination, setAutocompleteDestination] = useState(null);


    const travelMode = 'DRIVING';

    const directionsCallback = (response) => {
        if (response != null && response.status === 'OK')
            setDirections(response);
    };

    const handleAutocomplete = (place, setCoords, setAddress) => {
        if (place && place.geometry && place.geometry.location) {
            const location = place.geometry.location;
            setCoords({ lat: location.lat(), lng: location.lng() });
            setAddress(place.formatted_address);
        } else {
            console.error('No valid place or geometry data found');
        }
    };

    const getUserLocation = () => {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setPickupCoords({ lat: latitude, lng: longitude });
                    setPickup('Current Location');

                    toast({
                        title: 'Location Found',
                        description: 'Your current location is set as the pickup point.',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                },
                () => {
                    toast({
                        title: 'Location Error',
                        description: 'Unable to retrieve your location.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                })
    };

    const geocodeAddress = async (address, setCoords) => {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json',
                {
                    params: {
                        address,
                        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                    },
                }
            );
            if (response.data.results.length > 0) {
                const location = response.data.results[0].geometry.location;
                setCoords({ lat: location.lat, lng: location.lng });
            }
        }

        catch (error) {
            console.error('Geocoding failed', error);
        };
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setDirections(null);
        if (pickup && !pickupCoords) { geocodeAddress(pickup, setPickupCoords); }
        if (destination && !destinationCoords) { geocodeAddress(destination, setDestinationCoords); }
        if (!pickup || !destination) {
            toast({
                title: "Error",
                description: "Please fill in both pickup and destination locations.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        const newRide = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            pickup,
            destination,
            cost,
        };

        const existingRides = JSON.parse(localStorage.getItem('rideHistory')) || [];

        console.log(existingRides);

        existingRides.push(newRide);

        console.log(existingRides);

        localStorage.setItem('rideHistory', JSON.stringify(existingRides));


    };

    const handleClick = () => {
        toast({
            title: "Ride Available. Make Payment to proceed",
            description: `Your ${travelType} ride from ${pickup} to ${destination} is being processed.`,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        navigate('/payMethod');
    };

    const calculateCost = (distanceInKm, rideType) => {
        const costPerKm = RIDE_COSTS[rideType];
        return (distanceInKm * costPerKm).toFixed(2);
    };



    useEffect(() => {
        getUserLocation();
    }, []);
    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={['places']}>
            <VStack spacing={4} align="stretch" p={6}>
                <HStack>
                    <Box bg={'#e6e6fa'} borderRadius={'xl'} w={'40%'} m={'auto'}>
                        <VStack spacing={4}>
                            <Autocomplete
                                onLoad={(autocomplete) => setAutocompletePickup(autocomplete)}
                                onPlaceChanged={() => {
                                    if (autocompletePickup) {
                                        const place = autocompletePickup.getPlace();
                                        if (place.geometry) {
                                            handleAutocomplete(place, setPickupCoords, setPickup);
                                        } else {
                                            console.error('Selected place has no geometry');
                                        }
                                    }
                                }}
                            >
                                <HStack pt={'2%'}>
                                    <MdMyLocation size={'30px'} />
                                    <Text>Pickup:</Text>
                                    <Input
                                        placeholder="Enter Pickup"
                                        value={pickup}
                                        onChange={(e) => setPickup(e.target.value)}
                                        borderColor={"gray"}
                                    />
                                </HStack>
                            </Autocomplete>

                            <Autocomplete
                                onLoad={(autocomplete) => setAutocompleteDestination(autocomplete)}
                                onPlaceChanged={() => {
                                    if (autocompleteDestination) {
                                        const place = autocompleteDestination.getPlace();
                                        if (place.geometry) {
                                            handleAutocomplete(place, setDestinationCoords, setDestination);
                                        } else {
                                            console.error('Selected place has no geometry');
                                        }
                                    }
                                }}
                            >
                                <HStack pb={'2%'}>
                                    <FaLocationDot size={'20px'} />
                                    <Text>Destination:</Text>
                                    <Input
                                        placeholder="Enter Destination"
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                        borderColor={"gray"}
                                    />
                                </HStack>
                            </Autocomplete>
                        </VStack>
                    </Box>
                    <VStack w={'40%'} bg={'#e6e6fa'} m={'auto'} borderRadius={'lg'} p={'1%'}>
                        <HStack >
                            <Text fontSize={'md'}>Select Ride Type</Text>
                            <Select value={travelType} onChange={(e) => setTravelType(e.target.value)} w={'40%'} borderColor={'gray'} >
                                <option value="standard">Standard</option>
                                <option value="premium">Premium</option>
                                <option value="luxury">Luxury</option>
                            </Select>
                        </HStack>

                        <HStack>
                            <Text fontSize={'md'}>Date</Text>
                            <Input placeholder='Select Date and Time' type='datetime-local' borderColor={'gray'} />
                        </HStack>
                    </VStack>
                </HStack>

                <Button colorScheme="green" size="md" onClick={onSubmit} w={'40%'} m={'auto'}>
                    Get Directions
                </Button>


                <Box h="400px" w="100%">
                    <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={13} >
                        {pickupCoords && <Marker position={pickupCoords} label="Pickup" />}
                        {destinationCoords && <Marker position={destinationCoords} label="Destination" />}
                        {directions && <DirectionsRenderer directions={directions} />}

                        {pickupCoords && destinationCoords && (
                            <>
                                <DirectionsService
                                    options={{
                                        origin: pickupCoords,
                                        destination: destinationCoords,
                                        travelMode,
                                    }}
                                    callback={directionsCallback}
                                />

                                <DistanceMatrixService
                                    options={{
                                        origins: [pickupCoords],
                                        destinations: [destinationCoords],
                                        travelMode,
                                    }}
                                    callback={(response) => {
                                        if (response.rows[0].elements[0].status === 'OK') {
                                            setDistance(response.rows[0].elements[0].distance.text);
                                            setDuration(response.rows[0].elements[0].duration.text);
                                            const distanceInKm = response.rows[0].elements[0].distance.value / 1000;
                                            setCost(calculateCost(distanceInKm, travelType));
                                        }
                                    }}
                                />
                            </>
                        )}
                    </GoogleMap>
                </Box>

                {distance && duration && (

                    <Box bg={'#e6e6fa'} borderRadius={'lg'}>
                        <VStack m={'auto'} mt={'5px'}>
                            <Box bg={'white'} p={'10px'} borderRadius={'lg'}>
                                <Text fontSize="lg" color={'#29274a'} as={'b'}>
                                    Distance: {distance}
                                </Text>
                            </Box>
                            <Box bg={'white'} p={'10px'} borderRadius={'lg'}>
                                <Text fontSize="lg" color={'#29274a'} as={'b'}>
                                    Duration: {duration}
                                </Text>
                            </Box>
                            <Box bg={'white'} p={'10px'} borderRadius={'lg'}>
                                <Text fontSize="lg" color={'#29274a'} as={'b'}>
                                    Estimated Fare: {cost} rupees
                                </Text>
                            </Box>
                            <Button bg={'green'} m={'auto'} color={'white'} w={'30%'} mt={'5px'} mb={'5px'}
                                _hover={{ bg: 'white', color: 'green' }}
                                onClick={handleClick}>Book Ride</Button>
                        </VStack>
                    </Box>

                )}
            </VStack>
        </LoadScript>
    );
};


export default RideBooking;