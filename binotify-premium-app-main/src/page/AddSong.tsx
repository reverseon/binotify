import { Text, Container, VStack, Heading, FormControl, FormLabel, Input, Center, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EndPointREST } from "../config/env";

const AddSong = () => {
  const accessToken = useSelector((state: any) => state.session.user.accessToken)
  let [songInfo, setSongInfo] = useState({
    title: "" as string,
    file: undefined as File | null | undefined,
  });
  const navigate = useNavigate()
  let [error, setError] = useState <string | undefined>(undefined)
  let [message, setMessage] = useState <string | undefined>(undefined)
  let [loading, setLoading] = useState(false)
  const handleUpload = (title: string, file: File | null | undefined) => {
    setLoading(true)
    setMessage(undefined)
    setError(undefined)
    if (file === null || file === undefined) {
      setError("File is required")
      setMessage(undefined)
      setLoading(false)
      return
    } else if (title === "") {
      setError("Title is required")
      setMessage(undefined)
      setLoading(false)
      return
    } else if (file.size > 10000000) {
      setError("File size is too large")
      setMessage(undefined)
      setLoading(false)
      return
    }
    const formData = new FormData();
    formData.append("judul", title);
    formData.append("audio_file", file);
    const fetchAsync = async () => {
      let response = await fetch(EndPointREST + "/addSong", {
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
        setLoading(false)
        setMessage(data.message + ", Redirecting...")
        setError(undefined)
        setTimeout(() => {
          navigate("/")
        }, 2000)
      } else {
        setLoading(false)
        setError(data.message)
        setMessage(undefined)
      }
    };
    fetchAsync();
  }
  return ( 
    <Container minW='max-content' border='2px' borderRadius={8} mt='8' p='4'>
      <VStack spacing={3}>
          <Heading as='h1' mb={2} size='lg' fontWeight='300' letterSpacing='-0.5px' alignSelf='flex-start'>
            Add Song
          </Heading>
          <Text alignSelf={'end'}>Uploaded as {useSelector((state: any) => state.session.user.name_user)}</Text>
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input type="text" id="title" placeholder="Song Title" _placeholder={{color:'#FFFFFF'}}
              onChange={(e) => setSongInfo({...songInfo, title: e.target.value})}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="song">Song File (max 10MB)</FormLabel>
            <Input type="file" id="song" placeholder="Song File" accept=".mp3,audio/*" 
            onChange={(e) => setSongInfo({...songInfo, file: e.target.files?.item(0)})}
            />
          </FormControl>
          {/* Error Message */}
          {error && <Text color='red.500'>{error}</Text>}
          {/* Success Message */}
          {message && <Text color='green.500'>{message}</Text>}
          {/* Loading */}
          {loading && <Text color='blue.500'>Loading...</Text>}
          {/* Submit Button */}
          <Center>
            <Button colorScheme='blue' w="full" size='sm'
              onClick={() => handleUpload(songInfo.title, songInfo.file)}
            >Add Song</Button>
          </Center>
      </VStack>
    </Container>
  );
}
 
export default AddSong;