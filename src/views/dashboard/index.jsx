import { Flex, Heading } from "@chakra-ui/react"
import ComposePost from "./components/ComposePost"

const Dashboard = () => {
  return (
    <Flex flexDirection="column" gap={4}>
      <Flex>
        <Heading fontSize="2xl">Home</Heading>
      </Flex>

      <ComposePost />
    </Flex>
  )
}

export default Dashboard
