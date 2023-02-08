import { Text, Container, VStack, Heading, FormControl, FormLabel, Input, Center, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Four04  from "./404";
import { EndPointREST } from "../config/env";
import useFetch from "../hooks/useFetch";

const SongDetails = () => {
  const { song_id } = useParams()
  const navigate = useNavigate()
  const name_user = useSelector((state: any) => state.session.user.name_user)
  const accessToken = useSelector((state: any) => state.session.user.accessToken)
  const { error, loading, response } = useFetch(EndPointREST + "/getSongs?id_song=" + song_id,
    "GET",
    {
      "Authorization": accessToken
    }
  )
  const [songInfo, setSongInfo] = useState({
    title: "" as string,
    file: undefined as File | null | undefined,
  });
  useEffect(() => {
    if (response !== undefined && response !== null && response[0].judul) {
      setSongInfo({
        title: response[0].judul,
        file: undefined,
      })
    }
  }, [response])
  let [updateState, setUpdateState] = useState({
    loading: false,
    error: undefined as string | undefined,
    message: undefined as string | undefined,
  })
  const handleUpdate = (title: string, file: File | null | undefined) => {
    setUpdateState({
      loading: true,
      error: undefined,
      message: undefined,
    })
    if (file !== null && file !== undefined && file.size > 10000000) {
      setUpdateState({
        loading: false,
        error: "File size is too large",
        message: undefined,
      })
      return
    }
    const formData = new FormData();
    if (song_id !== undefined) {
      formData.append("id_song", song_id);
    }
    if (title.length > 0) {
      formData.append("judul", title);
    }
    if (file !== null && file !== undefined) {
      formData.append("audio_file", file);
    }
    const fetchAsync = async () => {
      let response = await fetch(EndPointREST + "/updateSong", {
        method: "POST",
        headers: {
          "Authorization": accessToken
        },
        body: formData,
      });
      let data = {
        status: response.status,
        ...(await response.json()),
      };
      if (Math.floor(data.status / 100) === 2) {
        setUpdateState({
          loading: false,
          error: undefined,
          message: data.message + ", Redirecting...",
        })
        setTimeout(() => {
          navigate(0)
        }, 2000)
      } else {
        setUpdateState({
          loading: false,
          error: data.message,
          message: undefined,
        })
      }
    };
    fetchAsync();
  }
  if (error) {
    return (
      <Four04 />
    )
  }
  return ( 
    <Container minW='max-content' border='2px' borderRadius={8} mt='8' p='4'>
      <VStack spacing={3}>
        <Heading as='h1' mb={2} size='lg' fontWeight='300' letterSpacing='-0.5px' alignSelf='flex-start'>
          Edit Song
        </Heading>
        <Text alignSelf={'end'}>Edited as {name_user}</Text>
        {error && <Text color='red.500'>{error}</Text>}
        {loading && <Text>Loading...</Text>}
        {response && (<>
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input type="text" id="title" placeholder="Song Title" _placeholder={{color:'#FFFFFF'}}
              value={songInfo.title}
              onChange={
                (e) => setSongInfo({...songInfo, title: e.target.value})
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="song">Song File (max 10MB)</FormLabel>
            <Input type="file" id="song" placeholder="Song File" accept=".mp3,audio/*" 
            onChange={(e) => setSongInfo({...songInfo, file: e.target.files?.item(0)})}
            />
          </FormControl>
          </>
        )}
        {/* Error Message */}
        {updateState.error && <Text color='red.500'>{updateState.error}</Text>}
        {/* Success Message */}
        {updateState.message && <Text color='green.500'>{updateState.message}</Text>}
        {/* Loading */}
        {updateState.loading && <Text color='blue.500'>Loading...</Text>}
        {/* Submit Button */}
        <Center>
          <Button colorScheme='blue' w="full" size='sm'
            onClick={() => handleUpdate(songInfo.title, songInfo.file)}
          >Edit Song</Button>
        </Center>
      </VStack>
    </Container>
  );
}
 
export default SongDetails;