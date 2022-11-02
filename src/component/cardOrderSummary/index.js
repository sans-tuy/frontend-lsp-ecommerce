import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { formatPrice } from '../priceTag';

const OrderSummaryItem = props => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CartOrderSummary = () => {
  return (
    <Stack
      spacing="8"
      borderWidth="1px"
      rounded="lg"
      padding="8"
      width="full"
      bgColor={'white'}
      boxShadow={'xl'}
    >
      <Heading size="md" textAlign={'left'}>
        Order Summary
      </Heading>

      <Stack spacing="6">
        <OrderSummaryItem
          label="Subtotal"
          value={'Rp ' + formatPrice(597, { locale: 'de-DE', currency: 'IDR' })}
        />
        <OrderSummaryItem label="Shipping + Tax">
          <Text>
            Rp {formatPrice(9000, { locale: 'de-DE', currency: 'IDR' })}
          </Text>
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold" color={'blue.400'}>
            Rp {formatPrice(597, { locale: 'de-DE', currency: 'IDR' })}
          </Text>
        </Flex>
      </Stack>
      <Button
        colorScheme="blue"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
      >
        Checkout
      </Button>
    </Stack>
  );
};
