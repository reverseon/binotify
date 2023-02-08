import { Button, Card, CardBody, Center, FormControl, FormLabel, Heading, HStack, Input, Link, Stack, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { EndPointREST } from "../config/env";
import { useDispatch } from "react-redux";
import { UserType } from "../config/type";
import { login as sessionLogin } from "../store/reducers/sessionReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let [userInfo, setUserInfo] = useState({
    username: "" as string,
    password: "" as string,
  });
  let [error, setError] = useState <string | undefined>(undefined)
  let [message, setMessage] = useState <string | undefined>(undefined)
  let [loading, setLoading] = useState(false)
  const handleLogin = (username: string, password: string) => {
    const fetchAsync = async () => {
      setLoading(true)
      setMessage(undefined)
      setError(undefined)
      let response = await fetch(EndPointREST + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      let data = {
        status: response.status,
        ...(await response.json()),
      };
      if (Math.floor(data.status / 100) === 2) {
        setLoading(false)
        setMessage(data.message + ", Redirecting...")
        setError(undefined)
        const payload : UserType = {
            id_user: data.id_user,
            name_user: data.name_user,
            username: data.username,
            email: data.email,
            accessToken: data.accessToken,
            isadmin: data.isadmin
        };
        setTimeout(() => {
          // react-router-dom redirect
          dispatch(sessionLogin(payload))
        }, 1000)
      } else {
        setLoading(false)
        setError(data.message)
        setMessage(undefined)
      }
    };
    fetchAsync();
  }
  return ( 
    <Center>
      <Stack spacing='4'>
        <VStack as='header' spacing='6' mt='8' width='400px'>
          <Heading
            as='h1'
            fontWeight='300'
            fontSize='24px'
            letterSpacing='-0.5px'
          >
            Login
          </Heading>
        </VStack>
        <Card variant='outline' borderColor='#d8dee4'>
          <CardBody>
            <form>
              <Stack spacing='4'>
                <FormControl>
                  <FormLabel size='sm'>Username</FormLabel>
                  <Input
                    type='text'
                    bg='white'
                    borderColor='#d8dee4'
                    size='sm'
                    borderRadius='6px'
                    textColor='black'
                    placeholder='Username'
                    _placeholder={{ color: '#000000' }}
                    onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        username: e.target.value
                      })}}
                  />
                </FormControl>
                <FormControl>
                  <HStack justify='space-between'>
                    <FormLabel size='sm'>Password</FormLabel>
                  </HStack>
                  <Input
                    type='password'
                    bg='white'
                    borderColor='#d8dee4'
                    size='sm'
                    borderRadius='6px'
                    textColor='black'
                    placeholder='Password'
                    _placeholder={{ color: '#000000' }}
                    onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        password: e.target.value
                      })}}
                  />
                </FormControl>

                <Button
                  bg='brand_blue.default'
                  color='black'
                  size='sm'
                  _hover={{ bg: 'brand_blue.darker' }}
                  _active={{ bg: 'brand_blue.darker' }}
                  onClick={() => handleLogin(userInfo.username, userInfo.password)}
                >
                  Sign in
                </Button>
                {/* Error Message */}
                {error && <Text color='red.500'>{error}</Text>}
                {/* Success Message */}
                {message && <Text color='green.500'>{message}</Text>}
                {/* Loading */}
                {loading && <Text color='blue.500'>Loading...</Text>}
              </Stack>
            </form>
          </CardBody>
        </Card>

        <Card variant='outline' borderColor='#d0d7de'>
          <CardBody>
            <Center>
              <HStack fontSize='sm' spacing='1'>
                <Text>Don't have an account?</Text>
                <Link color='brand_blue.default' onClick={
                  () => navigate('/register')
                }>
                  Create an account.
                </Link>
              </HStack>
            </Center>
          </CardBody>
        </Card>
      </Stack>
    </Center>
  )
}
 
export default Login;