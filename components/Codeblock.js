import React from 'react';

import {
  Code,
  useColorModeValue
} from '@chakra-ui/react';

export default function Codeblock(props) {
  return (
    <>
      <Code 
        variant="block" whiteSpace="pre-wrap"
        w="100%" p={2}
        borderRadius="md"
        bg={useColorModeValue("gray.100", "gray.700")}
        {...props}
      />
    </>
  );
}
