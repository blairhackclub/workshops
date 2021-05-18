import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import config from '../data/config';

import { getWorkshopList } from "../lib/workshops";

import {
  Box,
  Container,
  Flex,
  Stack,
  SimpleGrid,
  Heading,
  Text,
  Link,
  Button,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Home({ workshops }) {
  const [current, setCurrent] = React.useState("starthere");

  return (
    <>
      <Head>
        <title>{config.title}</title>
        <meta property="og:title" content={config.title} key="ogtitle"/>
        <meta name="description" content="Our collection of exclusive community-contributed coding tutorials + ideas."/>
        <meta property="og:description" content="Our collection of exclusive community-contributed coding tutorials + ideas." key="ogdesc"/>
      </Head>

      <Container maxW="container.lg" px={8} py={12} align="center">
        <Heading as="h1" size="2xl" color="brand.red">
          Blair Hack Club Workshops
        </Heading>
        <Heading as="h2" size="md" mt={4} fontWeight="normal">
          Learn to code with our own collection of community-contributed coding tutorials + ideas.
        </Heading>
        <Stack direction="row" justify="center" spacing={4} mt={6} color="brand.red">
          <Link href="https://workshops.hackclub.com/preface" style={{ textDecoration: "none" }} isExternal>
            <Button 
              borderRadius="full" borderColor="brand.red" borderWidth={2}
              bg="none" _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
              fontWeight="bold"
            >
              Preface
            </Button>
          </Link>
          <Link href="https://hackclub.com/philosophy/" style={{ textDecoration: "none" }} isExternal>
            <Button
              borderRadius="full" borderColor="brand.red" borderWidth={2}
              bg="none" _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
              fontWeight="bold"
            >
              Our Philosophy
            </Button>
          </Link>
        </Stack>
      </Container>

      <Container maxW="container.xl">
        <Flex direction={{ base: "column", md: "row" }}>
          <Categories py={4} flex={1} workshops={workshops} current={current} setCurrent={setCurrent}/>
          <Details pl={{ base: 0, md: 12 }} pt={{ base: 4, md: 0 }} flex={3} workshops={workshops} current={current}/>
        </Flex>
      </Container>
    </>
  );
}

function Categories({ workshops, current, setCurrent, ...rest }) {
  return (
    <Stack {...rest}>
      {Object.entries(workshops).sort((a,b) => (a[1].info.order > b[1].info.order || !a[1].info.order) ? 1 : -1)
      .map(([c, props]) =>
        <Box key={c}>
          {c === current ?
            <Box color="brand.red"
              borderColor="brand.red" borderWidth={2}
              _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
              borderRadius="xl" overflow="hidden"
            >
              <Box py={2} px={3}>
                <Heading as="h3" size="sm">
                  {props.info.name}
                </Heading>
              </Box>
            </Box>
          :
            <Box
              borderColor="brand.muted" borderWidth={2}
              _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
              borderRadius="xl" overflow="hidden"
              key={c}
            >
              <Link style={{ textDecoration: "none" }} onClick={e => setCurrent(c)}>
                <Box py={2} px={3}>
                  <Heading as="h3" size="sm">
                    {props.info.name}
                  </Heading>
                </Box>
              </Link>
            </Box>
          }
        </Box>
      )}
      
    </Stack>
  );
}

function Details({ workshops, current, ...rest }) {
  return (
    <Box {...rest}>
      <Box mt={4}>
        <Heading as="h2" size="lg">{workshops[current].info.name}</Heading>
        <Text fontSize="lg" color="brand.muted">
          {workshops[current].info.description}
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} py={4}>
        {workshops[current].data.sort((a,b) => (a.order > b.order || !a.order) ? 1 : -1)
        .map(w =>
          <Box bg={useColorModeValue("white", "gray.700")}
            borderRadius="xl" overflow="hidden"
            boxShadow="xl"
            key={`${current}/${w.slug}`}
          >
            <Box py={4} px={3}>
              <Heading as="h3" size="md">
                <NextLink href={`/${current}/${w.slug}`} passHref>
                  <Link>
                    {w.title}
                  </Link>
                </NextLink>
              </Heading>
              <Text color="brand.muted" fontSize="md" mt={1} lineHeight={1.4} minH="2.8em" noOfLines={2}>
                {w.description}
              </Text>
            </Box>
            {w.thumbnail &&
              <Image 
                w="100%" h="128px" 
                src={w.thumbnail} alt="test"
                objectFit="cover"
              />
            }
          </Box>
        )}
      </SimpleGrid>
      {workshops[current].data.length === 0 &&
        <Text>
          No workshops yet!
        </Text>
      }
    </Box>
  );
}

export async function getStaticProps() {
  const workshops = await getWorkshopList();
  return {
    props: {
      workshops
    }
  };
}