import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"

import { theme } from "./chakra/theme"

import "./styles/globals.css"

import "@fontsource/urbanist/300.css"
import "@fontsource/urbanist/500.css"
import "@fontsource/urbanist/600.css"
import "@fontsource/urbanist/700.css"
import "@fontsource/plus-jakarta-sans/400.css"
import "@fontsource/plus-jakarta-sans/500.css"
import "@fontsource/plus-jakarta-sans/700.css"


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
