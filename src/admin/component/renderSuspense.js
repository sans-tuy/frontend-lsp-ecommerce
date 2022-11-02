import { Center, CircularProgress } from '@chakra-ui/react';
import { Suspense } from 'react';

export const renderSuspense = el => {
  const fallback = (
    <Center py={[4, 20]}>
      <CircularProgress isIndeterminate color="primary.500" />
    </Center>
  );

  return <Suspense fallback={fallback}>{el}</Suspense>;
};
