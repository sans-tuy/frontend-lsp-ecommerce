import {
  CloseButton,
  Flex,
  Link,
  Select,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { CartProductMeta } from '../cardProductMeta';
import { formatPrice } from '../priceTag';

const QuantitySelect = props => {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      {...props}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  );
};

export const CartItem = props => {
  const {
    isGiftWrapping,
    name,
    description,
    quantity,
    image,
    price,
    onClickDelete,
    index,
    setSubTotal,
  } = props;
  console.log(index);

  const [qty, setQty] = React.useState(quantity);

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={name}
        description={description}
        image={`http://localhost:5000/${image}`}
        isGiftWrapping={isGiftWrapping}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{ base: 'none', md: 'flex' }}
      >
        <QuantitySelect
          value={qty}
          onChange={e => {
            setQty?.(+e.currentTarget.value);
          }}
        />
        <Text>Rp {formatPrice(price * qty, { locale: 'de-De' })}</Text>
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={onClickDelete}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: 'flex', md: 'none' }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={quantity}
          onChange={e => {
            setQty?.(+e.currentTarget.value);
          }}
        />
        <Text>Rp {formatPrice(price * qty, { locale: 'de-De' })}</Text>
      </Flex>
    </Flex>
  );
};
