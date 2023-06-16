import { Flex, Heading } from "@chakra-ui/react"
import ComposePost from "./components/ComposePost"
import { useRecoilValue } from "recoil"
import { userState } from "../../atoms/user"
import Posts from "../../components/Posts"

const Dashboard = () => {
  const user = useRecoilValue(userState)
  
  return (
    <Flex flexDirection="column" gap={4}>
      <Flex>
        <Heading fontSize="2xl">Home</Heading>
      </Flex>

      <ComposePost />

      {user && user.user && <Posts userId={user.user.$id} />}
    </Flex>
  )
}

export default Dashboard
