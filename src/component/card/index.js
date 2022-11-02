import React from 'react';
import { Box, Stack } from '@chakra-ui/react';

function Card({ children }) {
  return (
    <Box
      display={{ md: 'flex' }}
      width="20rem"
      height={'20rem'}
      _hover={{
        transform: 'translateY(2px)',
        boxShadow: 'lg',
      }}
      borderWidth={1}
      margin={2}
      backgroundColor={'white'}
      boxShadow="base"
      borderRadius={'md'}
    >
      <Stack
        align={{ base: 'center', md: 'stretch' }}
        textAlign={{ base: 'center', md: 'left' }}
      >
        {children}
      </Stack>
    </Box>
  );
}

export default Card;
