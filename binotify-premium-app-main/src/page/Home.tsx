import {
    Box,
    Text,
    Link,
    VStack,
    Grid,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { logout as sessionLogout } from '../store/reducers/sessionReducer'
import { Logo } from "../Logo"
const Main = () => {
    const uinfo = useSelector((state: any) => state.session.user)
    const dispatch = useDispatch()
    const doLogout = () => {
        dispatch(sessionLogout())
    }
    return (
        <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
            <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
                Logged in as {uinfo.name_user} <Link onClick={doLogout} color="teal.500">Logout</Link>
            </Text>
            <Link
                color="teal.500"
                href="https://chakra-ui.com"
                fontSize="2xl"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn Chakra
            </Link>
            </VStack>
        </Grid>
        </Box>
    )
}

export {
    Main
}