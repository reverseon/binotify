import { Center, Stack, VStack, Heading } from "@chakra-ui/react";

const Four04 = () => {
    return ( 
        // 404 chakra page
        <Center>
            <Stack spacing='4'>
                <VStack as='header' spacing='6' mt='8' width='400px'>
                    <Heading
                        as='h1'
                        fontWeight='300'
                        fontSize='24px'
                        letterSpacing='-0.5px'
                    >
                        Page Not Found
                    </Heading>
                </VStack>
            </Stack>
        </Center>
                            
    );
}
 
export default Four04;