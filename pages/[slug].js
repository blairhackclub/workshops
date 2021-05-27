import React from 'react';
import Head from 'next/head';
import config from '../config';

import matter from "gray-matter";
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize'
import { getWorkshopSlugs, getWorkshopData } from "../lib/workshops";

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Link,
  Tag,
  TagLabel,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import Icon from '@hackclub/icons';

export default function WorkshopPage({ params, source, frontMatter }) {
  const githubURL = 
    process.env.NODE_ENV === 'production' ? 
      `${config.githubRepo}/blob/master/workshops/${params.slug}/README.md` 
    : `${config.githubRepo}/blob/dev/workshops/${params.slug}/README.md`;
  const author = {
    name: frontMatter.author,
    avatar: `https://github.com/${frontMatter.author}.png`,
    url: `https://github.com/${frontMatter.author}`
  };
  var components;
  try {
    components = require(`../workshops/${params.slug}/components`).default;
  } catch (err) {}

  return (
    <>
      <Head>
        <title>{frontMatter.title}{config.titleSuffix}</title>
        <meta property="og:title" content={`${frontMatter.title}${config.titleSuffix}`} key="ogtitle"/>
        <meta name="description" content={frontMatter.description}/>
        <meta property="og:description" content={frontMatter.description} key="ogdesc"/>
      </Head>

      <Box bg={`linear-gradient(rgba(0,0,0,${useColorModeValue(0.125, 0.5)}), rgba(0,0,0,${useColorModeValue(0.25, 0.75)})), url(https://workshops.hackclub.com/api/patterns/${params.slug})`} color="white">
        <Container maxW="container.md" align="center" py={16}>
          <Heading as="h1" size="2xl">{frontMatter.title}</Heading>
          <Heading as="h2" size="md" fontWeight="semibold" mt={2}>{frontMatter.description}</Heading>
          
          <Box mt={4}>
            <Link href={author.url} style={{ textDecoration: "none" }} title={`View @${author.name} on GitHub`} isExternal>
              <Tag size="lg" borderRadius="full" bg="none">
                {author.avatar && <Avatar size="sm"
                  src={author.avatar} name={author.name}
                  ml={-1} mr={2}
                />}
                <TagLabel color="white" fontSize="lg" fontWeight="semibold">
                  @{author.name}
                </TagLabel>
              </Tag>
            </Link>
          </Box>
        </Container>
      </Box>

      <Container maxW="container.md" pt={8} pb={4}>
        <Text fontStyle="italic">
          Last updated: {frontMatter.date}
        </Text>

        <MDXRemote {...source} components={components}/>
        
        <Box py={4}>
          <Link href={githubURL} 
            style={{ textDecoration: "none" }} isExternal
          >
            <Button borderRadius="full" borderColor="brand.red" borderWidth={2} color="brand.red" fontWeight="bold" leftIcon={<Icon glyph="github"/>}>
              Edit on GitHub
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getWorkshopSlugs();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const workshopContent = await getWorkshopData(params.slug);
  const { data, content } = matter(workshopContent);
  const mdxSource = await serialize(content, { scope: data });
  return {
    props: {
      params,
      source: mdxSource,
      frontMatter: data
    }
  };
}