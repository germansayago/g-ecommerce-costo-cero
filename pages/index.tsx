import * as React from 'react';
import { GetStaticProps } from 'next';
import { Product } from '../product/types';
import api from '../product/api';
import {
  Box,
  Button,
  Grid,
  Link,
  Stack,
  Text,
  Image,
  Flex
} from '@chakra-ui/react';

interface Props {
  products: Product[];
}

function parseCurrency(value: number): string {
  return value.toLocaleString('es-Ar', {
    style: 'currency',
    currency: 'ARS'
  });
}

const IndexRoute: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = React.useState<Product[]>([]);
  const text = React.useMemo(
    () =>
      cart
        .reduce(
          (message, product) =>
            message.concat(
              `* ${product.title} - ${parseCurrency(product.price)}\n`
            ),
          ``
        )
        .concat(
          `\nTotal: ${parseCurrency(
            cart.reduce((total, product) => total + product.price, 0)
          )}`
        ),
    [cart]
  );

  return (
    <Stack spacing={6}>
      <Grid gap={6} templateColumns='repeat(auto-fill, minmax(240px, 1fr))'>
        {products.map((product) => (
          <Stack
            spacing={3}
            borderRadius='md'
            padding={4}
            backgroundColor='gray.100'
            key={product.id}
          >
            <Box>
              <Image
                objectFit='cover'
                src={product.image}
                alt={product.title}
              />
            </Box>
            <Stack spacing={1} padding={2}>
              <Text>{product.title}</Text>
              <Text color='primary.500' fontSize='sm' fontWeight='500'>
                {parseCurrency(product.price)}
              </Text>
              s
            </Stack>
            <Button
              onClick={() => setCart((cart) => cart.concat(product))}
              colorScheme={`primary`}
              size='sm'
            >
              Agregar
            </Button>
          </Stack>
        ))}
      </Grid>
      {Boolean(cart.length) && (
        <Flex
          alignItems='center'
          justifyContent='center'
          padding={4}
          position='sticky'
          bottom={0}
        >
          <Button
            isExterna
            as={Link}
            colorScheme={'whatsapp'}
            href={`https://wa.me/3586018552?text=${encodeURIComponent(text)}`}
            width='fit-content'
          >
            Checkout ({cart.length}) Products
          </Button>
        </Flex>
      )}
    </Stack>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    props: {
      products
    }
  };
};

export default IndexRoute;
