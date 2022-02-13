import React from 'react';
import { Box, ChakraProvider, Container, Divider, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { AppProps } from 'next/dist/shared/lib/router/router';
import theme from '../theme';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container
          borderRadius="md"
          backgroundColor="white"
          boxShadow="md"
          maxWidth="container.xl"
          padding={4}
        >
          <VStack>
            <Image borderRadius={9999} src="//placehold.it/128x128"></Image>
            <Heading>Ecommerce Costo Cero</Heading>
            <Text>Compra super fácil</Text>
          </VStack>
          <Divider marginY="6"></Divider>
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App