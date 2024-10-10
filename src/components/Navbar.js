import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
    Stack,
    Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";

const links = [
    { name: "Home", path: "/" },
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },

];

const NavLink = ({ name, path }) => (
    <Link
        as={RouterLink}
        to={path}
        px={2}
        py={1}
        rounded={"md"}
        size={'md'}
        _hover={{
            textDecoration: "none",
            color: "#29274a",
            bg: useColorModeValue("gray.200", "gray.700"),
        }}

    >
        {name}
    </Link>
);

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box bg={useColorModeValue("#29274a", "teal.900")} px={4} w={'100%'}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>

                <Heading color="white" size="lg">
                    Quick Ride
                </Heading>


                <IconButton
                    size={"md"}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={"Open Menu"}
                    display={{ md: "none" }}
                    onClick={isOpen ? onClose : onOpen}
                />


                <HStack size={'lg'} spacing={8} alignItems={"center"} display={{ base: "none", md: "flex" }} color={'white'} ml={'auto'}>
                    {links.map((link) => (
                        <NavLink key={link.name} name={link.name} path={link.path} />
                    ))}
                </HStack>


                <Flex alignItems={"center"}>
                    <Button
                        as={RouterLink}
                        to="/profile"
                        leftIcon={<CgProfile />}
                        colorScheme={"teal"}
                        variant={"solid"}
                        size={"md"}
                        ml={4}
                    >
                        Profile
                    </Button>
                </Flex>
            </Flex>


            {isOpen ? (
                <Box pb={4} display={{ md: "none" }}>
                    <Stack as={"nav"} spacing={4}>
                        {links.map((link) => (
                            <NavLink key={link.name} name={link.name} path={link.path} />
                        ))}
                    </Stack>
                </Box>
            ) : null}
        </Box>
    );
};

export default Navbar;
