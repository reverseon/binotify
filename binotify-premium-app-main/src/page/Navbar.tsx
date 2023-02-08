import { Stack, Button, Center, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as sessionLogout } from "../store/reducers/sessionReducer";

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let arrayMenuPenyanyi = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Add Song",
            path: "/addsong"
        }
    ]
    let arrayMenuAdmin = [
        {
            name: "Home",
            path: "/"
        },
    ]
    const name_user = useSelector((state: any) => state.session.user.name_user)
    let [status, setStatus] = useState("Logged in as " + name_user)
    let isAdmin = useSelector((state: any) => state.session.user.isadmin)
    let arrayMenu = isAdmin ? arrayMenuAdmin : arrayMenuPenyanyi
    const logoutHandler = () => {
        setStatus("Logging you out...")
        setTimeout(() => {
            dispatch(sessionLogout())
        }, 1000)
    }
    return ( 
        <VStack mt={8} p={0}>
            <Stack direction={['column', 'row']} spacing={4}  p={4} maxW='min-content'>
                {arrayMenu.map((item, index) => {
                    return (
                        <Button key={index} colorScheme='blue' w={{
                            base: '80vw',
                            md: '100px'
                        }} size='md'
                        onClick={() => {
                            navigate(item.path)
                        }}
                        >{item.name}</Button>
                    )
                })}
                <Button colorScheme='red' w={{
                    base: '80vw',
                    md: '100px'
                }} size='md'
                onClick={logoutHandler}
                >Logout</Button>
        
            </Stack>
            <Text fontSize={{ base: '16px', md: '20px', lg: '20px' }}>{status}</Text>
        </VStack>

    );
}
 
export default Navbar;
