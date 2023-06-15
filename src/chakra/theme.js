import { extendTheme } from "@chakra-ui/react"
import { Button } from "./button"

export const theme = extendTheme({
  colors: {
    brand: {
      50: '#feeeee',
      100: '#fcbdbd',
      200: '#fba5a5',
      300: '#fa8c8c',
      400: '#f97474',
      500: '#F74343',
      600: '#f51212',
      700: '#e40a0a',
      800: '#cb0909',
      900: '#9a0707',
    },
    branddark: {
      50: '#7d8389',
      100: '#656a6f',
      200: '#595d61',
      300: '#4c5054',
      400: '#404347',
      500: '#282A2C',
      600: '#101011',
      700: '#040404',
      800: '#000000',
      900: '#000000',
    },
  },
  fonts: {
    heading: `'Golos Text', sans-serif`,
    body: `'Plus Jakarta Sans', sans-serif`
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.50"
      }
    })
  },
  components: {
    Button,
  }
})
