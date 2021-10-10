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
  Input,
  Select,
  Image,
  Tag,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';

const tabs = {
  club: "Club Meetings",
  workshops: "Workshops",
  //challenges: "Challenges"
}

export default function Home({ workshops }) {
  const router = useRouter();
  const [current, setCurrent] = React.useState("club");

  React.useEffect(() => {
    checkQuery();
  }, [router]);

  function checkQuery() {
    if (router.query?.t) {
      if (!tabs[router.query.t]) { // if is not a valid tab
        return router.push(`/`, undefined, { shallow: true });
      }
      setCurrent(router.query.t);
    }
  }

  function onTabClick(newTab) {
    setCurrent(newTab);
    router.push(`/?t=${newTab}`, undefined, { shallow: true });
  }

  return (
    <>
      <Head>
        <title>{config.title}</title>
        <meta property="og:title" content={config.title} key="ogtitle"/>
        <meta name="description" content="Our collection of self-guided and extended workshops."/>
        <meta property="og:description" content="Our collection of self-guided and extended workshops." key="ogdesc"/>
      </Head>

      <Box pt={20} pb={8} bg={useColorModeValue("brand.red", "rgba(236,55,80,0.85)")} color="white">
        <Container maxW="container.xl" px={6}>
          <Stack direction={{ base: "column", sm: "row" }} spacing={{ base: 6, sm: 10 }}>
            <Box flex={1}>
              <Heading as="h1" size="2xl">
                Workshops
              </Heading>
              <Text mt={2} fontSize="lg">
                Our collection of self-guided and extended workshops.
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
              <Image src="/logos/blairhackclub.png" boxSize="64px" borderRadius="lg" mr={4} display={{ base: "block", sm: "none", md: "block" }}/>
              <Box flex={1}>
                <Heading size="sm">JOIN US NEXT WEEK!</Heading>
                <Heading size="md" fontWeight="normal" mt={1}>
                  Mondays at lunch
                </Heading>
                <Text>
                  11:20AM @ Room 314
                </Text>
              </Box>
            </Flex>
          </Stack>
        </Container>
      </Box>

      <Container maxW="container.xl" pt={4}>
        <Flex direction={{ base: "column", md: "row" }}>
          {useBreakpointValue({ 
            base: <TabsSelect flex={1} current={current} setCurrent={setCurrent} onTabClick={onTabClick}/>, 
            md: <Tabs py={4} flex={1} current={current} setCurrent={setCurrent} onTabClick={onTabClick}/> 
          })}

          {current === 'club' ?
            <Club pl={{ base: 0, md: 12 }} pt={{ base: 8, md: 4 }} flex={3}/>
            : current === 'challenges' ? 
            <Box pl={{ base: 0, md: 12 }} pt={{ base: 8, md: 4 }} flex={3} /*children={"Challenges are coming soon!"}*//>
            : 
            <Workshops pl={{ base: 0, md: 12 }} pt={{ base: 8, md: 4 }} flex={3} workshops={workshops}/>
          }
        </Flex>
      </Container>
    </>
  );
}

function Tabs({ current, setCurrent, onTabClick, ...rest }) { // For desktop
  return (
    <Stack {...rest}>
      {Object.entries(tabs).map(([slug, title]) =>
        <Box key={slug}>
          {slug === current ?
            <Box color="brand.red"
              borderColor="brand.red" borderWidth={2}
              _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
              borderRadius="xl" overflow="hidden"
            >
              <Box py={2} px={3}>
                <Heading as="h3" size="sm">
                  {title}
                </Heading>
              </Box>
            </Box>
          :
            <Box
              borderColor="brand.muted" borderWidth={2}
              _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
              borderRadius="xl" overflow="hidden"
            >
              <Link style={{ textDecoration: "none" }} onClick={e => onTabClick(slug)}>
                <Box py={2} px={3}>
                  <Heading as="h3" size="sm">
                    {title}
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

function TabsSelect({ current, setCurrent, onTabClick, ...rest }) { // For mobile
  return (
    <Select 
      value={current} onChange={e => onTabClick(e.target.value)}
      color="brand.red" fontWeight="bold"
      borderWidth={2} borderRadius="xl"
      overflow="hidden"
      {...rest}
    >
      {Object.entries(tabs).map(([slug, title]) =>
        <option value={slug} key={slug}>{title}</option>
      )}
    </Select>
  );
}

function Workshops({ workshops, ...rest }) {
  return (
    <Stack spacing={10} {...rest}>
      {Object.keys(workshops).map(c => {
        if (workshops[c].slugs.length > 0)
        return <Box key={c}>
          <Heading size="sm" color="brand.muted">
            {workshops[c].title.toUpperCase()}
            &nbsp;<Text as="span" fontWeight="normal" fontSize="sm">
              - {workshops[c].description}
            </Text>
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8} pt={3}>
            {workshops[c].slugs.map(w =>
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
        </Box>
      })}
    </Stack>
  );
}

const clubMeetings = require("../workshops/club.json");
function Club({ ...rest }) {
  return (
    <Box {...rest}>
      <Heading size="sm" color="brand.muted">
        LATEST MEETINGS
      </Heading>
      <Stack spacing={8} pt={3}>
        {Object.entries(clubMeetings).map(([date, m]) =>
          <Box bg={useColorModeValue("gray.50", "gray.700")}
            borderRadius="xl" overflow="hidden"
            borderWidth={useColorModeValue(1, 0)} borderColor="gray.200"
            key={date}
          >
            <Box pt={4} pb={3} px={3}>
              <Heading as="h3" size="md">
                {m.title}
              </Heading>
              <Text color="brand.muted" fontSize="md" mt={1} lineHeight={1.4}>
                {m.description}
              </Text>

              <HStack mt={2} spacing={3} align="center">
                <Text color="brand.muted" fontWeight="bold">
                  {date}
                </Text>
                {m.slug && <Text>
                  <Link href={`/${m.slug}`} color="brand.red" fontWeight="bold" isExternal>Workshop</Link>
                </Text>}
                {m.slides && <Text>
                  <Link href={m.slides} color="brand.red" fontWeight="bold" isExternal>Slides</Link>
                </Text>}
              </HStack>
            </Box>
          </Box>
        )}
      </Stack>
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