import React from 'react';
import Head from 'next/head';

import config from '../../data/config.js';

import {
  Box,
  Container,
  Stack,
  Heading,
  Button,
  Link,
  Tag,
  TagLabel,
  Avatar,
} from '@chakra-ui/react';
import Icon from '@hackclub/icons';

export default function Letterhead(props) {
  const {
    title,
    description,
    date,
    author,
    path,
    hideGithub = false,
    includeMeta = true,
    ...rest
  } = props;
  const githubURL = 
    process.env.NODE_ENV === 'production' ? 
      `${config.githubRepo}/blob/master${path}` 
    : `${config.githubRepo}/blob/dev${path}`;

  return (
    <>
      {includeMeta &&
        <Head>
          <title>{title}{config.titleSuffix}</title>
          <meta property="og:title" content={`${title}${config.titleSuffix}`} key="ogtitle"/>
          <meta name="description" content={description}/>
          <meta property="og:description" content={description} key="ogdesc"/>
        </Head>
      }

      <Container maxW="container.md" align="center" py={8}>
        <Heading as="h1" size="2xl" color="brand.red">{title}</Heading>
        <Heading as="h2" size="md" fontWeight="semibold" mt={2}>{description}</Heading>
        <Stack direction="row" align="center" justify="center" mt={4}>
          {author && 
            <Link href={author.url} style={{ textDecoration: "none" }} isExternal>
              <Tag size="lg" borderRadius="full">
                {author.avatar && <Avatar size="xs"
                  src={author.avatar} name={author.name}
                  ml={-1} mr={2}
                />}
                <TagLabel>{author.name}</TagLabel>
              </Tag>
            </Link>
          }
          {date && <Tag size="lg" borderRadius="full">{date}</Tag>}
        </Stack>
      </Container>

      <Container maxW="container.md" py={4}>
        <Box {...rest}/>
        
        {!hideGithub &&
          <Box py={4}>
            <Link href={githubURL} 
              style={{ textDecoration: "none" }} isExternal
            >
              <Button borderRadius="full" borderColor="brand.red" borderWidth={2} color="brand.red" fontWeight="bold" leftIcon={<Icon glyph="github"/>}>
                Edit on GitHub
              </Button>
            </Link>
          </Box>
        }
      </Container>
    </>
  )
}
