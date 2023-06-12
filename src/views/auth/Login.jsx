import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
  Spinner
} from "@chakra-ui/react"
import { useState } from "react"
import { Link as ReactRouterLink } from "react-router-dom"
import lorggerLogo from "../../assets/svgs/Logo.svg"
const initialState = {
  email: "",
  password: "",
}

export default function Login() {
  const [show, setShow] = useState(false)
  const [form, setForm] = useState(initialState)
  const [loading, setLoading] = useState(false)

  const toast = useToast()

  // const navigate = useNavigate()

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (form.email && form.password) {
      setLoading(true)

      setTimeout(() => {
        setLoading(false)
      }, 2000)

    } else {
      toast({
        title: "Authentication error",
        description: "Fill in all fields",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      })
    }
  }

  const handleClick = () => setShow(!show)

  return (
    <Flex minH={"100vh"} bg={"gray.50"}>
      <Stack spacing={8} mx={"auto"} width="lg" py={12} px={6}>
        <Stack align={"center"}>
          <Image src={lorggerLogo} alt="fomai" />
          {/* <Heading fontSize={"2xl"}>Sign in to your account</Heading> */}
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                onChange={handleChange}
                size="lg"
                type="email"
                placeholder="Email address"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="lg">
                <Input
                  pr="4.5rem"
                  name="password"
                  onChange={handleChange}
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    variant="accent"
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick}
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={5}>
              <Link
                as={ReactRouterLink}
                to="/forgot-password"
                alignSelf="flex-end"
                color={"blue.400"}
              >
                Forgot password?
              </Link>
              <Button size="lg" type="submit" onClick={handleLogin}>
              {loading ? <Spinner size="sm" /> : "Sign In"}
              </Button>
              <Text alignSelf="center" fontSize="md" fontWeight="medium">
                New here?{" "}
                <Link
                  as={ReactRouterLink}
                  to="/register"
                  alignSelf="flex-end"
                  color={"blue.400"}
                >
                  Register
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
