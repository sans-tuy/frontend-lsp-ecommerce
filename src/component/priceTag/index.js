import { HStack, Text, useColorModeValue as mode } from '@chakra-ui/react';
import * as React from 'react';

export function formatPrice(value, opts) {
  const { locale = 'de-DE', currency = 'USD' } = opts;
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
}

export const PriceTag = props => {
  const { price, currency, salePrice, rootProps, priceProps, salePriceProps } =
    props;
  return (
    <HStack spacing="1" {...rootProps}>
      <Price isOnSale={!!salePrice} textProps={priceProps}>
        {formatPrice(price, { currency })}
      </Price>
      {salePrice && (
        <SalePrice {...salePriceProps}>
          {formatPrice(salePrice, { currency })}
        </SalePrice>
      )}
    </HStack>
  );
};

const Price = props => {
  const { isOnSale, children, textProps } = props;
  const defaultColor = mode('blue.700', 'blue.400');
  const onSaleColor = mode('blue.400', 'blue.700');
  const color = isOnSale ? onSaleColor : defaultColor;
  return (
    <Text
      as="span"
      fontWeight="medium"
      color={color}
      textDecoration={isOnSale ? 'line-through' : 'none'}
      {...textProps}
    >
      {children}
    </Text>
  );
};

const SalePrice = props => (
  <Text
    as="span"
    fontWeight="semibold"
    color={mode('blue.800', 'blue.200')}
    {...props}
  />
);
