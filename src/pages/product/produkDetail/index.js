import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { formatPrice } from '../../../component/priceTag';

export default function Simple() {
  const params = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/store/products/${params.id}`)
      .then(e => setData(e.data))
      .catch(err => console.log(err));
  }, [params.id]);

  return (
    <Container maxW={'7xl'} bgColor={'white'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={'md'}
            boxShadow={'xxl'}
            alt={'product image'}
            src={`http://localhost:5000/store/products/imgpath/${data.image}`}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              textAlign={'left'}
              fontSize={{ base: 'l', sm: 'xl', lg: '2xl' }}
            >
              {data.name}
            </Heading>
            <Text
              color={useColorModeValue('blue.500', 'blue.400')}
              mt={2}
              mb={-5}
              fontWeight={600}
              fontSize={'4xl'}
              textAlign={'left'}
            >
              {'Rp ' + formatPrice(data.price, { locale: 'de-DE' })}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('black.500', 'black.400')}
                fontSize={'xl'}
                fontWeight={'300'}
                textAlign={'left'}
              >
                {data.description}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('black.500', 'black.300')}
                fontWeight={'700'}
                textTransform={'uppercase'}
                textAlign={'left'}
                mb={'4'}
              >
                Book Details
              </Text>

              <List spacing={2} color={'gray.500'}>
                <ListItem>
                  <Flex>
                    <Text
                      mr={2}
                      textAlign={'left'}
                      as={'span'}
                      fontWeight={'bold'}
                    >
                      Total Pages:
                    </Text>
                    <Text>{data.page}</Text>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex>
                    <Text
                      mr={2}
                      textAlign={'left'}
                      as={'span'}
                      fontWeight={'bold'}
                    >
                      Author:
                    </Text>
                    <Text>{data.author}</Text>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex>
                    <Text
                      mr={2}
                      textAlign={'left'}
                      as={'span'}
                      fontWeight={'bold'}
                    >
                      Publisher:
                    </Text>
                    <Text>{data.publisher}</Text>
                  </Flex>
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            rounded={'md'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('blue.500', 'blue.400')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
          >
            Add to cart
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
