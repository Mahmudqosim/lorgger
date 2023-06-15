import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Flex } from "@chakra-ui/react"

const DashboardLayout = () => {
  return (
    <Flex flexDirection="column">
      <Navbar />
      <Outlet />
    </Flex>
  )
}

export default DashboardLayout
