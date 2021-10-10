import React from 'react';
import config from '../config';

import {
  Container,
  Text,
  Link,
} from '@chakra-ui/react';


export default function FooterComponent() {
  return (
    <Container as="footer" 
      maxW="container.md" py={12}
      align="center"
    >
      <Text fontSize="lg" color="brand.muted">
        This directory is maintained by <Link href={config.mainSite} color="brand.red">Blair Hack Club</Link>,
        a student-led creative coding club at Montgomery Blair HS. 
        Code and content on <Link href={config.githubRepo} color="brand.red">GitHub</Link>.
      </Text>
    </Container>
  )
}