import { Flex, Heading, Link, Text } from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"

const NotFound = () => {
  return (
    <Flex
      flexDirection="column"
      gap={4}
      alignItems="center"
      justifyContent="center"
      width="full"
    >
      <Flex flexDirection="column" alignItems="center">
        <Heading fontSize="6rem" fontWeight="bold">
          404
        </Heading>
        <Text color="gray.500">PAGE NOT FOUND</Text>
        <Text fontSize=".875rem" color="gray.500">Please check the url in the address bar and try again.</Text>
      </Flex>

      <Link
        as={ReactRouterLink}
        to="/login"
        padding="5px 20px"
        rounded="lg"
        color="white"
        fontSize="1.25rem"
        bg="brand.500"
      >
        Go to Home
      </Link>
    </Flex>
  )
}

export default NotFound
