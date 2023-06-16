import { extendTheme } from "@chakra-ui/react"
import { Button } from "./button"

export const theme = extendTheme({
  colors: {
    brand: {
      50: "#c9e2fb",
      100: "#99c8f8",
      200: "#82bbf6",
      300: "#6aaef5",
      400: "#52a1f3",
      500: "#2287f0",
      600: "#0e6ed1",
      700: "#0d61b9",
      800: "#0b55a1",
      900: "#083b71",
    },
    branddark: {
      50: "#7d8389",
      100: "#656a6f",
      200: "#595d61",
      300: "#4c5054",
      400: "#404347",
      500: "#282A2C",
      600: "#101011",
      700: "#040404",
      800: "#000000",
      900: "#000000",
    },
  },
  fonts: {
    heading: `'Golos Text', sans-serif`,
    body: `'Plus Jakarta Sans', sans-serif`,
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.50",
      },
    }),
  },
  components: {
    Button,
  },
})
