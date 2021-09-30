import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import config from '../config';

import { getWorkshopList } from "../lib/workshops";

import {
  Box,
  Container,
  Flex,
  Stack,
  HStack,
  SimpleGrid,
  Heading,
  Text,
  Link,
  Button,
  Select,
  Image,
  Tag,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function Home({ workshops }) {
  const router = useRouter();
  const [current, setCurrent] = React.useState("club");

  React.useEffect(() => {
    checkQuery();
  }, [router]);

  function checkQuery() {
    if (router.query?.c) {
      if (!workshops[router.query.c]) { // if is not a valid category
        return router.push(`/`, undefined, { shallow: true });
      }
      setCurrent(router.query.c);
    }
  }

  function onCategoryClick(newCategory) {
    setCurrent(newCategory);
    router.push(`/?c=${newCategory}`, undefined, { shallow: true });
  }

  return (
    <>
      <Head>
        <title>{config.title}</title>
        <meta property="og:title" content={config.title} key="ogtitle"/>
        <meta name="description" content="Our collection of exclusive community-contributed coding tutorials + ideas."/>
        <meta property="og:description" content="Our collection of exclusive community-contributed coding tutorials + ideas." key="ogdesc"/>
      </Head>

      <Box pt={20} pb={8} bg="brand.red" color="white">
        <Container maxW="container.xl" px={6}>
          <Stack direction={{ base: "column", sm: "row" }} spacing={{ base: 6, sm: 10 }}>
            <Box flex={1}>
              <Heading as="h1" size="2xl">
                Workshops
              </Heading>
              <Text mt={2} fontSize="lg">
                Our collection of self-guided and extended workshops!
              </Text>

              <Stack direction="row" spacing={{ base: 4, sm: 2 }} justify={{ base: "center", sm: "flex-start" }} mt={3} color="white">
                <Link href="https://workshops.hackclub.com/preface" style={{ textDecoration: "none" }} isExternal>
                  <Button size={useBreakpointValue({ base: "md", sm: "sm" })}
                    borderRadius="full" borderColor="white" borderWidth={2}
                    bg="none" _hover={{ bg: "primary.400" }}
                    fontWeight="bold"
                  >
                    Preface
                  </Button>
                </Link>
                <Link href="https://hackclub.com/philosophy/" style={{ textDecoration: "none" }} isExternal>
                  <Button size={useBreakpointValue({ base: "md", sm: "sm" })}
                    borderRadius="full" borderColor="white" borderWidth={2}
                    bg="none" _hover={{ bg: "primary.400" }}
                    fontWeight="bold"
                  >
                    Philosophy
                  </Button>
                </Link>
              </Stack>
            </Box>

            <Flex p={4} borderRadius="xl" bg="rgba(255,255,255,0.2)" align="center">
              <Image src="/images/logos/blairhackclub.png" boxSize="64px" borderRadius="lg" mr={4} display={{ base: "block", sm: "none", md: "block" }}/>
              <Box flex={1}>
                <Heading size="sm">JOIN US NEXT WEEK!</Heading>
                <Heading size="md" fontWeight="normal" mt={1}>
                  Mondays at lunch
                </Heading>
                <Text>
                  11:20AM @ Room 314
                </Text>
                <Text fontStyle="italic" fontSize="sm">
                  *subject to change
                </Text>
              </Box>
            </Flex>
          </Stack>
        </Container>
      </Box>

      <Container maxW="container.xl" pt={4}>
        <Flex direction={{ base: "column", md: "row" }}>
          {useBreakpointValue({ 
            base: <CategoriesSelect flex={1} workshops={workshops} current={current} setCurrent={setCurrent} onCategoryClick={onCategoryClick}/>, 
            md: <Categories py={4} flex={1} workshops={workshops} current={current} setCurrent={setCurrent} onCategoryClick={onCategoryClick}/> 
          })}
          <Details pl={{ base: 0, md: 12 }} pt={{ base: 4, md: 0 }} flex={3} workshops={workshops} current={current}/>
        </Flex>
      </Container>
    </>
  );
}

function Categories({ workshops, current, setCurrent, onCategoryClick, ...rest }) { // For desktop
  return (
    <Stack {...rest}>
      {Object.entries(workshops).map(([c, props]) =>
        <Box key={c}>
          {c === current ?
            <Box color="brand.red"
              borderColor="brand.red" borderWidth={2}
              _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
              borderRadius="xl" overflow="hidden"
            >
              <Box py={2} px={3}>
                <Heading as="h3" size="sm">
                  {props.title}
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
              <Link style={{ textDecoration: "none" }} onClick={e => onCategoryClick(c)}>
                <Box py={2} px={3}>
                  <Heading as="h3" size="sm">
                    {props.title}
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

function CategoriesSelect({ workshops, current, setCurrent, onCategoryClick, ...rest }) { // For mobile
  return (
    <Select 
      value={current} onChange={e => onCategoryClick(e.target.value)}
      color="brand.red" fontWeight="bold"
      borderWidth={2} borderRadius="xl"
      overflow="hidden"
      {...rest}
    >
      {Object.entries(workshops).map(([c, props]) =>
        <option value={c} key={c}>{props.title}</option>
      )}
    </Select>
  );
}

function Details({ workshops, current, ...rest }) {
  return (
    <Box {...rest}>
      <Box mt={4}>
        <Heading as="h2" size="lg">{workshops[current].title}</Heading>
        <Text fontSize="lg" color="brand.muted">
          {workshops[current].description}
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8} py={4}>
        {workshops[current].slugs.map(w =>
          <Box bg={useColorModeValue("gray.50", "gray.700")}
            borderRadius="xl" overflow="hidden"
            borderWidth={useColorModeValue(1, 0)} borderColor="gray.200"
            key={w.slug}
          >
            <Box py={4} px={3}>
              <Heading as="h3" size="md">
                <NextLink href={`/${w.slug}`} passHref>
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
                src={w.thumbnail} alt={w.title}
                objectFit="cover"
                onError={e => e.target.style.display = 'none'} ignoreFallback
              />
            }
          </Box>
        )}
      </SimpleGrid>
      {workshops[current].slugs.length === 0 &&
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