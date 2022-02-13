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

import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

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
    <AnimateSharedLayout>
      <Stack spacing={6}>
        <Grid gap={6} templateColumns='repeat(auto-fill, minmax(240px, 1fr))'>
          {products.map((product) => (
            <Stack
              spacing={3}
              borderRadius='md'
              padding={4}
              backgroundColor='gray.200'
              key={product.id}
            >
              <Image
                cursor='pointer'
                objectFit='cover'
                borderTopRadius='md'
                src={product.image}
                alt={product.title}
              />
              <Box></Box>
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
        <AnimatePresence>
          {Boolean(cart.length) && (
            <Flex
              as={motion.div}
              initial={{scale: 0}}
              animate={{scale: 1}}
              exit={{scale: 0}}
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
                href={`https://wa.me/+5493586018552?text=${encodeURIComponent(
                  text
                )}`}
                width='fit-content'
                size='lg'
                leftIcon={<Image src="https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff

                " />}
              >
                Checkout ({cart.length}) Products
              </Button>
            </Flex>
          )}
        </AnimatePresence>
      </Stack>
    </AnimateSharedLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    revalidate: 10,
    props: {
      products
    }
  };
};

export default IndexRoute;
