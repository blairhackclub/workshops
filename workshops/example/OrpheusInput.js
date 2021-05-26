import React from 'react';

import {
  Input,
  Image,
} from '@chakra-ui/react';

export default function OrpheusInput() {
  const [content, setContent] = React.useState();
  return (
    <>
      <Input value={content} onChange={e => setContent(e.target.value)} placeholder="Type the word 'orpheus'"/>
      {content === 'orpheus' && <Image src="https://workshops.hackclub.com/content/workshops/orpheus/img/code_dinosaur.png"/>}
    </>
  )
}
