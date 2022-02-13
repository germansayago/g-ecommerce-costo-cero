import { extendTheme, theme } from '@chakra-ui/react';

export default extendTheme({
  colors: {
    primary: theme.colors['purple']
  },
  styles: {
    global: {
      body: {
        backgroundColor: 'primary.100',
        color: 'gray.600',
      },
      a: {
        color: 'primary.500',
      },
    },
  },
})