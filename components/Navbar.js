import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import config from '../data/config';

import {
  Box,
  Flex,
  Stack,
  IconButton,
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
        {...rest}
      >
        {['/', '/404'].includes(router.pathname) ? <Logo/>
        : <Home/>}

        <Stack
          px={8} spacing={4}
          align="center"
          direction="row"
        >
          <Link href={config.githubRepo} isExternal><IconButton icon={<Icon glyph="github"/>}/></Link>
          <ColorModeToggle color={useColorModeValue("brand.red", "white")}/>
        </Stack>
      </Flex>
    </>
  )
}

function Logo({ ...rest }) {
  return (
    <Box px={8} {...rest}>
      <Link href={config.mainSite} isExternal>
        <Image h={16} src="/branding/flag-orpheus-top.svg"/>
      </Link>
    </Box>
  );
}

function Home({ ...rest }) {
  return (
    <Box px={8} py={4} {...rest}>
      <NextLink href="/" passHref>
        <Link>
          <Flex align="center">
            <Icon glyph="view-back"/> All Workshops
          </Flex>
        </Link>
      </NextLink>
    </Box>
  );
}