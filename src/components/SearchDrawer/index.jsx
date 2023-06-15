import {
    Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
} from "@chakra-ui/react"
import { useRef } from "react"

const SearchDrawer = ({ onClose, isOpen }) => {
  const searchField = useRef()

  return (
    <Drawer
      initialFocusRef={searchField}
      placement="top"
      onClose={onClose}
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Search</DrawerHeader>
        <DrawerBody display="flex" gap="2" pb={4}>
          <Input
            ref={searchField}
            id="search"
            placeholder="Search here..."
          />
          <Button>Search</Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default SearchDrawer
