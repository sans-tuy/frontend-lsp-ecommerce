import { Button, Flex, Grid, Link } from '@chakra-ui/react';
import { Text, Image, Box, Stack, Heading } from '@chakra-ui/react';
import Card from '../../component/card/index.js';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { Link as ReactRouter } from 'react-router-dom';
import { formatPrice } from '../../component/priceTag/index.js';
import axios from 'axios';
import { useState } from 'react';

const Product = ({ name, image, category, price, _id }) => {
  return (
    <Stack width={'100%'}>
      <Image
        objectFit="cover"
        style={{
          aspectRatio: '16/9',
        }}
        src={`http://localhost:5000/store/products/imgpath/${image}`}
        maxHeight={'200px'}
        minWidth={'100%'}
        borderTopRadius={'md'}
      />
      <Box p={{ base: '0 2rem' }}>
        <Heading
          noOfLines={2}
          color="black.300"
          size="sm"
          textTransform="capitalize"
        >
          {name}
        </Heading>
        <Text fontSize={'xs'} color="gray.400">
          {category}
        </Text>

        <Flex justifyContent={'space-between'} alignItems={'center'} mt={2}>
          <Box color="blue.300">
            Rp {formatPrice(price, { locale: 'de-DE', currency: 'IDR' })}
            <Box as="span" color="blue.300" fontSize="sm">
              / unit
            </Box>
          </Box>
          <Link as={ReactRouter} to={`/product/${_id}`}>
            <Button color={'white'} bgColor={'blue.400'}>
              More
            </Button>
          </Link>
        </Flex>
      </Box>
    </Stack>
  );
};

export default function ProductList() {
  const [products, setProducts] = useState([]);
  axios
    .get('http://localhost:5000/store/products')
    .then(e => setProducts(e.data))
    .catch(err => console.log(err));
  return (
    <Flex
      direction="column"
      justifyContent="center"
      maxW={{ xl: '1200px' }}
      m="0 auto"
      minH="100vh"
    >
      <Grid
        w="full"
        gridGap="5"
        gridTemplateColumns="repeat( auto-fit, minmax(300px, 1fr) )"
      >
        {products.map(p => (
          <Card
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
          >
            <Product key={p.id} {...p} />
          </Card>
        ))}
      </Grid>
      <Flex justifyContent={'space-around'} mt={4}>
        <Button leftIcon={<FaArrowCircleLeft />} colorScheme="blue" size="md">
          Back
        </Button>
        <Button rightIcon={<FaArrowCircleRight />} colorScheme="blue" size="md">
          Next
        </Button>
      </Flex>
    </Flex>
  );
}
