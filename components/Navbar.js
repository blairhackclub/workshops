import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import config from '../config';

import {
  Box,
  Flex,
  Stack,
  IconButton,
  Button,
  Link,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import Icon from '@hackclub/icons';

import ColorModeToggle from './ColorModeToggle';

export default function NavbarComponent({ ...rest }) {
  const router = useRouter();

  return (
    <>
      <Flex as="nav"
        align="center" justify="space-between" wrap="wrap"
        w="100%" zIndex={100}
        color="brand.red"
        position="absolute"
        {...rest}
      >
        {['/'].includes(router.pathname) ? <Logo/>
        : <Home/>}

        <Stack
          px={8} spacing={4}
          align="center"
          direction="row"
        >
          <Link href={config.githubRepo} isExternal>
            <IconButton 
              icon={<Icon glyph="github"/>} 
              color={useColorModeValue("white", ['/'].includes(router.pathname) ? "white" : "brand.red")} 
              colorScheme="blackAlpha"
            />
          </Link>
          <ColorModeToggle 
            color={useColorModeValue("white", ['/'].includes(router.pathname) ? "white" : "brand.red")} 
            colorScheme="blackAlpha"
          />
        </Stack>
      </Flex>
    </>
  )
}

function Logo({ ...rest }) {
  return (
    <Box px={8} {...rest}>
      <Link href={config.mainSite}>
        <Image h={16} src="/branding/flag-orpheus-top.svg"/>
      </Link>
    </Box>
  );
}

function Home({ ...rest }) {
  return (
    <Box p={4} {...rest}>
      <NextLink href="/" passHref>
        <Link style={{ textDecoration: "none" }}>
          <Button 
            pl={0} leftIcon={<Icon glyph="view-back"/>} 
            color={useColorModeValue("white", "brand.red")} 
            colorScheme="blackAlpha"
          >
            Back
          </Button>
        </Link>
      </NextLink>
    </Box>
  );
}