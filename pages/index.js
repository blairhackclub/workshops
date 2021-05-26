import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
  Select,
  Image,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function Home({ workshops }) {
  const router = useRouter();
  const [current, setCurrent] = React.useState("starthere");

  React.useEffect(() => {
    checkQuery();
  }, [router]);

  function checkQuery() {
    if (router.query?.category) {
      if (!workshops[router.query.category]) { // if is not a valid category
        return router.push(`/`, undefined, { shallow: true });
      }
      setCurrent(router.query.category);
    }
  }

  function onCategoryClick(newCategory) {
    setCurrent(newCategory);
    router.push(`/?category=${newCategory}`, undefined, { shallow: true });
  }

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

        <Stack direction="row" justify="center" spacing={{ base: 2, md: 4 }} mt={6} color="brand.red">
          <Link href="https://workshops.hackclub.com/preface" style={{ textDecoration: "none" }} isExternal>
            <Button size={useBreakpointValue({ base: "sm", md: "md" })}
              borderRadius="full" borderColor="brand.red" borderWidth={2}
              bg="none" _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
              fontWeight="bold"
            >
              Preface
            </Button>
          </Link>
          <Link href="https://hackclub.com/philosophy/" style={{ textDecoration: "none" }} isExternal>
            <Button size={useBreakpointValue({ base: "sm", md: "md" })}
              borderRadius="full" borderColor="brand.red" borderWidth={2}
              bg="none" _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
              fontWeight="bold"
            >
              Our Philosophy
            </Button>
          </Link>
          {/* 
          <NextLink href="/challenges" passHref>
            <Link style={{ textDecoration: "none" }}>
              <Button w="100%" size={useBreakpointValue({ base: "sm", md: "md" })}
                borderRadius="full" borderColor="brand.red" borderWidth={2}
                bg="none" _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                fontWeight="bold"
              >
                Challenges
              </Button>
            </Link>
          </NextLink> 
          */}
        </Stack>
      </Container>

      <Container maxW="container.xl">
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
      {Object.entries(workshops)
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
              <Link style={{ textDecoration: "none" }} onClick={e => onCategoryClick(c)}>
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

function CategoriesSelect({ workshops, current, setCurrent, onCategoryClick, ...rest }) { // For mobile
  return (
    <Select 
      value={current} onChange={e => onCategoryClick(e.target.value)}
      color="brand.red" fontWeight="bold"
      borderWidth={2} borderRadius="xl"
      overflow="hidden"
      {...rest}
    >
      {Object.entries(workshops)
      .map(([c, props]) =>
        <option value={c} key={c}>{props.info.name}</option>
      )}
    </Select>
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

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8} py={4}>
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
                src={w.thumbnail} alt={w.title}
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