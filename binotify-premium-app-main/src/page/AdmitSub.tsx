import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Container, Flex, Heading, HStack, Square, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { EndPointREST } from "../config/env";
import useFetch from "../hooks/useFetch";


const AdmitSub = () => {
  const accessToken = useSelector((state: any) => state.session.user.accessToken)
  let [refCtrl, setRefCtrl] = useState <boolean>(false)
  let { response, error, loading } = useFetch(
    EndPointREST + "/getSubRequests" + "?status=PENDING",
    "GET",
    {
      "Authorization": useSelector((state: any) => state.session.user.accessToken)
    },
    undefined,
    refCtrl
  );
  setInterval(() => {
    setRefCtrl(!refCtrl)
  }, 5000)
  let [errorMsg, setErrorMsg] = useState <string | undefined>(undefined)
  let [successMsg, setSuccessMsg] = useState <string | undefined>(undefined)
  type stat_enum = "ACCEPTED" | "REJECTED" | "PENDING"
  const updateHandler = (c_id: number, s_id: number, status: stat_enum) => {
    const fetchAsync = async () => {
      let response = await fetch(EndPointREST + "/updateSub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": accessToken
        },
        body: JSON.stringify({
          creator_id: c_id,
          subscriber_id: s_id,
          status: status
        }),
      });
      let data = {
        status: response.status,
        ...(await response.json()),
      };
      if (Math.floor(data.status / 100) === 2) {
        setSuccessMsg(data.message)
        setErrorMsg(undefined)
        setRefCtrl(!refCtrl)
      } else {
        setErrorMsg(data.message)
        setSuccessMsg(undefined)
      }
    };
    fetchAsync();
  }
  const perPage = 2
  let [page, setPage] = useState(1)
  const maxPage = response ? Math.ceil(response?.length / perPage) : 0
  return (
    <Container minW='max-content' border='2px' borderRadius={8} mt='8' p='4'>
      <VStack spacing={3}>
        <Heading as='h1' mb={2} size='lg' fontWeight='300' letterSpacing='-0.5px' alignSelf='flex-start'>
          Accept Subscription
        </Heading>
        <Container className="admit-sub" minW='max-content' mt='8' p={0}>
              {/* Error */}
              {error && <Text>{error}</Text>}
              {/* Loading */}
              {loading && <Text>Loading...</Text>}
              {/* Success */}
              {response && response.map((item: any, idx) => {
                if (idx >= (page - 1) * perPage && idx < page * perPage) {
                  return (
                    <>
                    <Stack key={idx} direction={['column', 'row']} spacing={4} border='2px' borderRadius={8} p={4} mb={4}>
                      <VStack flex={1} spacing={1} alignItems='flex-start'>
                        <Text fontSize={{ base: '16px', md: '20px', lg: '20px' }}>Creator: {item.creator_info.name_user} ({item.creator_info.username})</Text>
                        <Text fontSize={{ base: '16px', md: '20px', lg: '20px' }}>Subscriber ID: {item.subscriber_info.id_user}</Text>
                      </VStack>
                      <Center>
                      <Button colorScheme='blue' w="full" size='sm'
                        onClick={() => updateHandler(item.creator_info.id_user, item.subscriber_info.id_user, "ACCEPTED")}
                      >Accept</Button>
                      </Center>
                      <Center>
                      <Button colorScheme='red' w="full" size='sm'
                        onClick={() => updateHandler(item.creator_info.id_user, item.subscriber_info.id_user, "REJECTED")}
                      >Reject</Button>
                      </Center>
                    </Stack>
                    </>
                  )
                } else {
                  return null
                }
              })}
        </Container>
        {/* error */}
        {errorMsg && <Text color='red.500'>{errorMsg}</Text>}
        {/* success */}
        {successMsg && <Text color='green.500'>{successMsg}</Text>}
        {/* page control */}
        {
          response && response.length > 0 && (
            <HStack spacing={4} alignSelf='end' m={0}>
              <Button colorScheme='blue' size='sm'
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1)
                  }
                }}
              >
                Previous</Button>
              <Text>{page} / {maxPage}</Text>
              <Button colorScheme='blue' size='sm'
                onClick={() => {
                  if (page < maxPage) {
                    setPage(page + 1)
                  }
                }}
              >Next</Button>
            </HStack>
          )
        }
      </VStack>
    </Container>
  );
}
 
export default AdmitSub;