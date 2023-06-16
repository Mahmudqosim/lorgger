import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import { FiChevronDown, FiSearch, FiUser } from "react-icons/fi"
import {
  HiBell,
  HiChat,
  HiHome,
  HiLogout,
  HiMenuAlt2,
  HiOutlineCog,
  HiUsers,
  HiX,
} from "react-icons/hi"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useRecoilValue, useResetRecoilState } from "recoil"
import lorggerLogo from "../../assets/svgs/Logo.svg"
import { userState } from "../../atoms/user"
import { logout } from "../../utils/auth"
import SearchDrawer from "../SearchDrawer"

const menuItems = [
  { name: "Home", Icon: HiHome, active: "" },
  { name: "Chats", Icon: HiChat, active: "chats" },
  { name: "Buddies", Icon: HiUsers, active: "buddies" },
  { name: "Notifications", Icon: HiBell, active: "notifications" },
]

export default function Navbar() {
  const [opened, setOpened] = useState(false)
  const { pathname } = useLocation()

  const user = useRecoilValue(userState)
  const resetUserStore = useResetRecoilState(userState)

  const navigate = useNavigate()

  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleLogout = () => {
    logout()
      .then(() => {
        resetUserStore()

        navigate("/login")
      })
      .catch((error) => {
        console.log(error)
        if (!error.message) {
          toast({
            title: "Logout failed",
            description: "Something went wrong",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "bottom-left",
          })
        } else {
          toast({
            title: "Logout failed",
            description: error.message,
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "bottom-left",
          })
        }
      })
  }

  return (
    <>
      <SearchDrawer isOpen={isOpen} onClose={onClose} />
      <Flex
        width="full"
        px="6"
        py="2"
        bg="white"
        alignItems="center"
        justifyContent="space-between"
        zIndex="overlay"
        position="sticky"
        top="0"
        shadow="sm"
      >
        <HStack spacing="4">
          <Link to="/">
            <Image h="8" src={lorggerLogo} alt="lorgger" />
          </Link>

          {user.profile && (
            <Menu
              onOpen={() => setOpened(true)}
              onClose={() => setOpened(false)}
            >
              <MenuButton
                display={{ base: "flex", md: "none" }}
                position="fixed"
                top="16"
                left="0"
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack
                  bg="branddark.300"
                  borderRadius="0px 5px 5px 0px"
                  color="gray.100"
                  p="2"
                >
                  {opened ? (
                    <HiX fontSize="1.5rem" />
                  ) : (
                    <HiMenuAlt2 fontSize="1.5rem" />
                  )}
                  {/* <Box>Menu</Box> */}
                </HStack>
              </MenuButton>
              <MenuList bg={"white"} borderColor={"gray.200"}>
                {menuItems.map((menu, index) => {
                  const isMenuActive = menu.active === pathname.split("/")[1]

                  return (
                    <MenuItem
                      key={index}
                      as={Link}
                      to={`/${menu.active}`}
                      color={isMenuActive ? "white" : "gray.500"}
                      bg={isMenuActive ? "red.500" : "none"}
                      _hover={{
                        bg: `${isMenuActive ? "red.400" : "gray.100"}`,
                      }}
                      icon={<menu.Icon fontSize="1.25rem" />}
                    >
                      {menu.name}
                    </MenuItem>
                  )
                })}
              </MenuList>
            </Menu>
          )}
        </HStack>

        <HStack display={{ base: "none", md: "flex" }}>
          {menuItems.map((menu, index) => {
            const isMenuActive = menu.active === pathname.split("/")[1]

            return (
              <Button
                as={Link}
                to={`/${menu.active}`}
                key={index}
                bg={isMenuActive ? "gray.100" : "none"}
                color={isMenuActive ? "gray.500" : "gray.400"}
                borderRadius="full"
                _hover={{
                  bg: isMenuActive ? "gray.200" : "none",
                  color: "gray.500",
                }}
                leftIcon={<menu.Icon fontSize="1.25rem" />}
                iconSpacing={0}
              >
                {isMenuActive ? menu.name : ""}
              </Button>
            )
          })}
        </HStack>

        <HStack>
          <IconButton
            size="lg"
            variant="ghost"
            borderRadius="full"
            fontSize="1.15rem"
            aria-label="open menu"
            icon={<FiSearch />}
            onClick={onOpen}
          />
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                {user.profile && (
                  <HStack>
                    <Avatar
                      size={"sm"}
                      name={user.profile.username}
                      src={
                        user.profile.profilePicture
                          ? user.profile.profilePicture
                          : ""
                      }
                    />
                    <Box display={{ base: "none", sm: "block" }} fontSize="sm">
                      <Text noOfLines="1">{user.profile.username}</Text>
                    </Box>
                    <Box>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                )}
              </MenuButton>
              <MenuList bg={"white"} borderColor={"gray.200"}>
                <MenuItem
                  onClick={() => navigate(`/${user.profile.username}`)}
                  icon={<FiUser />}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={() => navigate(`/settings`)} icon={<HiOutlineCog />}>Settings</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout} icon={<HiLogout />}>
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    </>
  )
}
