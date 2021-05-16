import React from 'react';
import Head from 'next/head';
import config from '../data/config';

import {
  Box,
  Container,
  Flex,
  Stack,
  Heading,
  Text,
  Link,
  Button,
} from '@chakra-ui/react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Workshops{config.titleSuffix}</title>
        <meta property="og:title" content={`Workshops${config.titleSuffix}`} key="ogtitle"/>
        <meta name="description" content=""/>
        <meta property="og:description" content="" key="ogdesc"/>
      </Head>

      <Box>
        <Container maxW="container.lg" px={8} py={12} align="center">
          <Heading as="h1" size="2xl" color="brand.red">
            Blair Hack Club Workshops
          </Heading>
          <Heading as="h2" size="md" mt={4} fontWeight="normal">
            Learn to code with our own collection of community-contributed coding tutorials + ideas.
          </Heading>
          <Stack direction="row" justify="center" spacing={4} mt={4} color="brand.red">
            <Link href="https://workshops.hackclub.com/preface" style={{ textDecoration: "none" }} isExternal>
              <Button borderRadius="3xl" borderColor="brand.red" borderWidth={2} fontWeight="bold">
                Preface
              </Button>
            </Link>
            <Link href="https://hackclub.com/philosophy/" style={{ textDecoration: "none" }} isExternal>
              <Button borderRadius="3xl" borderColor="brand.red" borderWidth={2} fontWeight="bold">
                Our Philosophy
              </Button>
            </Link>
          </Stack>
        </Container>
      </Box>
    </>
  );
}