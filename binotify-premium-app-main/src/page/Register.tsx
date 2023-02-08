import { Button, Card, CardBody, Center, FormControl, FormLabel, Heading, HStack, Input, Link, Stack, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { login as sessionLogin } from "../store/reducers/sessionReducer";
import { UserType } from "../config/type";
import { EndPointREST } from "../config/env";
import { useState } from "react";
import { useDispatch } from "react-redux";
const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let [formInfo, setFormInfo] = useState({
    username: "" as string,
    email: "" as string,
    name_user: "" as string,
    password: "" as string,
    password2: "" as string,
  });
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
  );
  let [error, setError] = useState <string | undefined>(undefined)
  let [message, setMessage] = useState <string | undefined>(undefined)
  let [loading, setLoading] = useState(false)
  const handleRegister = (username: string, name_user: string, email: string, password: string, password2: string) => {
    const fetchAsync = async () => {
      setLoading(true)
      setMessage(undefined)
      setError(undefined)
      if (password !== password2) {
        setError("Password not match")
        setMessage(undefined)
        setLoading(false)
        return
      } else if (password.length < 8) {
        setError("Password must be at least 8 characters")
        setMessage(undefined)
        setLoading(false)
        return
      } else if (username.length < 8) {
        setError("Username must be at least 8 characters")
        setMessage(undefined)
        setLoading(false)
        return
      } else if (name_user.length < 8) {
        setError("Name must be at least 8 characters")
        setMessage(undefined)
        setLoading(false)
        return
      } else if (email.length <= 0 && emailRegex.test(email)) {
        setError("Email is not valid")
        setMessage(undefined)
        setLoading(false)
        return
      }
      let response = await fetch(EndPointREST + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          name_user: name_user,
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
            Register
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
                    _placeholder={{ color: "#000000" }}
                    onChange={(e) => {
                      setFormInfo({
                        ...formInfo,
                        username: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel size='sm'>Name</FormLabel>
                  <Input
                    type='text'
                    bg='white'
                    borderColor='#d8dee4'
                    size='sm'
                    borderRadius='6px'
                    textColor='black'
                    placeholder='Your Name Here'
                    _placeholder={{ color: "#000000" }}
                    onChange={(e) => {
                      setFormInfo({
                        ...formInfo,
                        name_user: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel size='sm'>Email</FormLabel>
                  <Input
                    type='text'
                    bg='white'
                    borderColor='#d8dee4'
                    size='sm'
                    borderRadius='6px'
                    textColor='black'
                    placeholder='Email'
                    _placeholder={{ color: "#000000" }}
                    onChange={(e) => {
                      setFormInfo({
                        ...formInfo,
                        email: e.target.value,
                      });
                    }}
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
                    _placeholder={{ color: "#000000" }}
                    onChange={(e) => {
                      setFormInfo({
                        ...formInfo,
                        password: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                <FormControl>
                  <HStack justify='space-between'>
                    <FormLabel size='sm'>Retype Password</FormLabel>
                  </HStack>
                  <Input
                    type='password'
                    bg='white'
                    borderColor='#d8dee4'
                    size='sm'
                    borderRadius='6px'
                    textColor='black'
                    placeholder='Retype Password'
                    _placeholder={{ color: "#000000" }}
                    onChange={(e) => {
                      setFormInfo({
                        ...formInfo,
                        password2: e.target.value,
                      });
                    }}
                  />
                </FormControl>

                <Button
                  bg='brand_blue.default'
                  color='black'
                  size='sm'
                  _hover={{ bg: 'brand_blue.darker' }}
                  _active={{ bg: 'brand_blue.darker' }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleRegister(
                      formInfo.username,
                      formInfo.name_user,
                      formInfo.email,
                      formInfo.password,
                      formInfo.password2
                    );
                  }}
                >
                  Register
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
                <Text>Have an account?</Text>
                <Link color='brand_blue.default' onClick={
                  () => navigate('/login')
                }>
                  Login.
                </Link>
              </HStack>
            </Center>
          </CardBody>
        </Card>
      </Stack>
    </Center>
  )
}
 
export default Register;