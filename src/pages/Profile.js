import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Stack, CardFooter, Avatar, Heading, HStack, Text, Card, CardBody, Divider } from "@chakra-ui/react";
import DrawerComp from '../components/Drawer'

const Profile = () => {

    const { user } = useContext(AuthContext);

    return (
        <Box>

            <Card w={'100%'} justifyContent={'center'} alignItems={'center'} m={'auto'} bg={'#e6e6fa'} h={'100vh'} >
                <HStack>
                    <DrawerComp position="absolute"
                        top="0"
                        left="0"
                        m={4} />
                    <CardBody>
                        <Avatar
                            size="xl"
                            name={user?.username}
                            src={user?.avatarUrl || 'https://bit.ly/broken-link'}
                        />

                        <Stack mt='6' spacing='3'>
                            <Heading size='lg'>Welcome</Heading>
                            <Divider />
                            <Text color='#29274a' fontSize='2xl'>Your Name</Text>
                            <Text color='#29274a' fontSize='2xl'>Your Email</Text>
                            <Text color='#29274a' fontSize='2xl'>Your Contact Number</Text>
                            <Text color='#29274a' fontSize='2xl'>Your Address</Text>
                        </Stack>
                    </CardBody>
                </HStack>
                <CardFooter>

                </CardFooter>

            </Card>


        </Box>
    );
};

export default Profile;