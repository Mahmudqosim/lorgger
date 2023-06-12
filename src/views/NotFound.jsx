import { Flex, Heading, Link, Text } from "@chakra-ui/react"
import React from "react"
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
        Go to dashboard
      </Link>
    </Flex>
    /* <div className="w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 mt-12">
        <h1 className="text-9xl font-black text-sky-600 border-b border-gray-200 pb-6">
          404
        </h1>

        <div className="space-y-8 text-center">
          <div>
            <h2 className="h2 font-black text-black">Page not found</h2>
            <small className="text-gray-600">
              Please check the url in the address bar and try again.
            </small>
          </div>

          <div className="space-x-2">
            <Link
              to="/"
              className="bg-sky-600 text-white font-semibold text-base py-3 px-4 rounded-lg"
            >
              Go back home
            </Link>
            <Link
              to="/"
              className="bg-sky-100 text-sky-700 border border-sky-200 font-semibold text-base py-3 px-4 rounded-lg"
            >
              Contact support
            </Link>
          </div>
        </div>
      </div>
    </div> */
  )
}

export default NotFound
