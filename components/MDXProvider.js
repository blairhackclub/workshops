import { MDXProvider } from "@mdx-js/react";
import {
  Box,
  Code,
  Divider,
  Heading,
  Image,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

import Blockquote from './Blockquote';
import Codeblock from './Codeblock';

export default function MDXCompProvider(props) {
  const state = {
    p: (props) => <Text as="p" my={4} fontSize="lg" lineHeight={1.8} {...props} />,
    h1: (props) => <Heading as="h1" size="xl" mt={6} mb={4} {...props} />,
    h2: (props) => <Heading as="h2" size="lg" mt={6} mb={4} {...props} />,
    h3: (props) => <Heading as="h3" size="md" mt={6} mb={4} {...props} />,
    h4: (props) => <Heading as="h4" size="sm" mt={6} mb={4} {...props} />,
    h5: (props) => <Heading as="h5" size="xs" mt={6} mb={4} {...props} />,
    h6: (props) => <Heading as="h6" size="xs" mt={6} mb={4} {...props} />,
    blockquote: (props) => <Blockquote my={4} {...props}/>,
    ul: (props) => <UnorderedList pl={4} my={4} fontSize="lg" {...props}/>,
    ol: (props) => <OrderedList pl={4} my={4} fontSize="lg" {...props}/>,
    li: (props) => <ListItem {...props}/>,
    table: (props) => <Table my={4} {...props}/>,
    thead: (props) => <Thead {...props}/>,
    tbody: (props) => <Tbody {...props}/>,
    tr: (props) => <Tr {...props}/>,
    td: (props) => <Td {...props}/>,
    th: (props) => <Th {...props}/>,
    code: (props) => <Codeblock my={4} {...props}/>,
    pre: (props) => <Codeblock my={4} {...props}/>,
    inlineCode: (props) => <Code {...props}/>,
    em: (props) => <Text as="span" fontStyle="italic" {...props}/>,
    strong: (props) => <Text as="span" fontWeight="bold" {...props}/>,
    del: (props) => <Text as="span" textDecoration="line-through" {...props}/>,
    hr: (props) => <Divider my={4} {...props}/>,
    a: (props) => <Link color="brand.red" href={props.url} title={props.title} {...props}/>,
    img: (props) => <Image my={4} boxShadow="xs" borderRadius="md" {...props}/>,
  };

  return (
    <MDXProvider components={state}>
      <Box {...props} />
    </MDXProvider>
  );
}