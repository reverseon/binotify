import { Text, Container, VStack, Heading, Stack, Center, Button, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EndPointREST } from "../config/env";
import useFetch from "../hooks/useFetch";

const SongList = () => {
    const accessToken = useSelector((state: any) => state.session.user.accessToken)
    const navigate = useNavigate()
    let [refCtrl, setRefCtrl] = useState <boolean>(false)
    let { response, error, loading } = useFetch(
      EndPointREST + "/getSongs",
      "GET",
      {
        "Authorization": accessToken
      },
      undefined,
      refCtrl
    );
    setInterval(() => {
      setRefCtrl(!refCtrl)
    }, 5000)
    let [errorMsg, setErrorMsg] = useState <string | undefined>(undefined)
    let [successMsg, setSuccessMsg] = useState <string | undefined>(undefined)
    const handleDelete = (song_id: number) => {
        const fetchAsync = async () => {
            let response = await fetch(EndPointREST + "/removeSong", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": accessToken
                },
                body: JSON.stringify({
                    id_song: song_id
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
            Song List
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
                          <Text fontSize={{ base: '16px', md: '20px', lg: '20px' }}>{item.judul}</Text>
                          <Text fontSize={{ base: '16px', md: '20px', lg: '20px' }}>{item.name_user}</Text>
                        </VStack>
                        <Center>
                        <Button colorScheme='blue' w="full" size='sm'
                          onClick={() => {
                            const dest = "/song/" + item.id_song
                            navigate(dest) 
                        }}
                        >Edit</Button>
                        </Center>
                        <Center>
                        <Button colorScheme='red' w="full" size='sm'
                          onClick={() => handleDelete(item.id_song)}
                        >Delete</Button>
                        </Center>
                      </Stack>
                      </>
                    )
                  } else {
                    return null
                  }
                })}
          </Container>
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
 
export default SongList;