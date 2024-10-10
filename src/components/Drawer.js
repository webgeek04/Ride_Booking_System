import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useDisclosure, Drawer, Button, useToast, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const DrawerComp = () => {

    const { handleLogout } = useContext(AuthContext);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const navigate = useNavigate();
    const toast = useToast();

    const handleRideBooking = () => {
        navigate('/ride-booking');
    };
    const handleRideHistory = () => {
        navigate('/ride-history');
    };
    const handleHome = () => {
        navigate('/');
    };
    const handleFeedback = () => {
        navigate('/feedback');
    };
    const handleLogOUT = () => {
        navigate('/');
        toast({
            title: 'Logged Out',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        handleLogout();
    };
    return (
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={onOpen} ml={'0px'}
                m={4} pos={"absolute"} left={'0'} top={'0'}>
                Menu
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}

            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader bg={'#e6e6fa'} mb={'10px'}>Manage your account</DrawerHeader>

                    <DrawerBody>
                        <Button size={'lg'} bg={'blue.100'} m={'5px'} w={'80%'} onClick={handleRideBooking}>Book a Ride</Button>
                        <Button size={'lg'} bg={'blue.100'} m={'5px'} w={'80%'} onClick={handleRideHistory}>Your Rides</Button>
                        <Button size={'lg'} bg={'blue.100'} m={'5px'} w={'80%'} onClick={handleFeedback}>Give Feedback</Button>
                        <Button size={'lg'} bg={'blue.100'} m={'5px'} w={'80%'} onClick={handleHome}>Home</Button>
                        <Button size={'lg'} bg={'blue.100'} m={'5px'} w={'80%'} onClick={handleLogOUT}>Logout</Button>
                    </DrawerBody>

                </DrawerContent>
            </Drawer>
        </>
    )
}

export default DrawerComp;