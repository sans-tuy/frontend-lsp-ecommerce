import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { Link as ReactRouter } from 'react-router-dom';
import * as React from 'react';
import { CartOrderSummary } from '../../component/cardOrderSummary';
import { CartItem } from '../../component/cardItem';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const Cart = () => {
  const [subTotal, setSubTotal] = React.useState(0);
  const [cartData, setCartData] = React.useState({});
  const token = useSelector(state => state.global.tokenApi);
  React.useEffect(() => {
    axios
      .get('http://localhost:5000/cart', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(e =>
        setCartData(
          e.data.items.find(val => val.userId === '63579db4492e7cd54b25804b')
        )
      )
      .catch(err => console.log(err));
  }, []);

  return (
    <Box
      maxW={{ base: '3xl', lg: '7xl' }}
      mx="auto"
      px={{ base: '4', md: '8', lg: '12' }}
      py={{ base: '6', md: '8', lg: '12' }}
      bgColor={'white'}
    >
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        align={{ lg: 'flex-start' }}
        spacing={{ base: '8', md: '16' }}
      >
        <Stack spacing={{ base: '8', md: '10' }} flex="2">
          <Heading textAlign={'left'} fontSize="2xl" fontWeight="extrabold">
            Shopping Cart (3 items)
          </Heading>

          <Stack spacing="6">
            {cartData.items.map((item, index) => (
              <CartItem
                key={index}
                index={index}
                setSubTotal={setSubTotal}
                {...item}
              />
            ))}
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary subTotal={subTotal} />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link
              as={ReactRouter}
              to={'/product'}
              color={mode('blue.500', 'blue.200')}
            >
              Continue shopping
            </Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
};
