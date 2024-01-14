import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react"
import { AiOutlineComment } from "react-icons/ai"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { HiHeart, HiOutlineHeart } from "react-icons/hi"
import { Link as ReactRouterLink } from "react-router-dom"
import { storage } from "../../../utils/appwrite"
import { POSTS_BUCKET_ID } from "../../../utils/constants"
import CodeViewer from "./CodeViewer"
import { deletePost } from "../../../utils/posts"
import { getLikeDoc, likePost } from "../../../utils/likes"
import { useEffect, useState } from "react"

const Post = ({ post, profile, userId, setPosts }) => {
  const [likeDoc, setLikeDoc] = useState(null)

  useEffect(() => {
    getLikeDoc(post.$id, userId)
      .then((data) => {
        setLikeDoc(data)
      })
      .catch((error) => console.log(error))
  }, [post, userId])

  const handleDeletePost = () => {
    deletePost(post.$id)
      .then(() => {

        setPosts((psts) => {
          const reducedPosts = psts.filter((p) => p.id !== post.$id)

          return reducedPosts
        })
      })
      .catch((error) => console.log(error))
  }

  const toggleLike = () => {
    likePost({
      postId: post.$id,
      likeDoc,
      userId,
    })
      .then((data) => {
        setLikeDoc(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <Box
      display="flex"
      gap="4"
      bg="white"
      p="4"
      width="full"
      borderBottom="1px solid"
      borderColor="gray.100"
      _hover={{ bg: "gray.50" }}
    >
      <VStack width="fit-content">
        <Avatar name={profile.name} src={profile.profilePicture} />

        {
          <VStack spacing="0" borderBottom="1px solid" borderColor="gray.100">
            <Text fontSize=".875rem" color="gray.500">
              {likeDoc && likeDoc.users.length}
            </Text>

            <IconButton
              variant="ghost"
              fontSize="1.5rem"
              color={
                likeDoc && likeDoc.users.includes(userId)
                  ? "red.500"
                  : "gray.600"
              }
              _hover={{
                bg: "none",
                color: `${
                  likeDoc && likeDoc.users.includes(userId)
                    ? "red.300"
                    : "gray.500"
                }`,
              }}
              icon={
                likeDoc && likeDoc.users.includes(userId) ? (
                  <HiHeart />
                ) : (
                  <HiOutlineHeart />
                )
              }
              onClick={toggleLike}
            />
          </VStack>
        }

        <ReactRouterLink to={`/posts/${post.$id}`}>
          <VStack spacing="0">
            <Text fontSize=".875rem" color="gray.500">
              0
            </Text>
            <IconButton
              variant="ghost"
              fontSize="1.5rem"
              _hover={{ bg: "none", color: "gray.500" }}
              icon={<AiOutlineComment />}
            />
          </VStack>
        </ReactRouterLink>
      </VStack>

      <VStack alignItems="flex-start" width="full">
        <Flex
          width="full"
          gap={2}
          alignItems="center"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Link
            display="flex"
            gap={2}
            alignItems="center"
            flexWrap="wrap"
            as={ReactRouterLink}
            to={`/${profile.username}`}
          >
            <Heading fontSize="1rem">{profile.name}</Heading>
            <Text fontSize=".875rem" color="gray.500">
              @{profile.username}
            </Text>
            <Text fontSize=".875rem" color="gray.500">
              {new Intl.DateTimeFormat(undefined, {
                dateStyle: "medium",
              }).format(new Date(post.$createdAt))}
            </Text>
          </Link>

          {post.userId === userId && (
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <BiDotsHorizontalRounded fontSize="1.5rem" />
              </MenuButton>
              <MenuList bg={"white"} borderColor={"gray.200"}>
                <MenuItem
                  color={"gray.500"}
                  bg={"none"}
                  _hover={{
                    bg: "gray.100",
                  }}
                  icon={<EditIcon fontSize="1.25rem" />}
                >
                  Edit Post
                </MenuItem>
                <MenuItem
                  color={"gray.500"}
                  bg={"none"}
                  _hover={{
                    bg: "gray.100",
                  }}
                  icon={<DeleteIcon fontSize="1.25rem" />}
                  onClick={handleDeletePost}
                >
                  Delete Post
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>

        <ReactRouterLink to={`/posts/${post.$id}`}>
          <Text noOfLines="5">{post.content}</Text>
        </ReactRouterLink>

        {post.image && post.image.trim().length > 0 && (
          <Image
            width="full"
            height="300px"
            objectFit="cover"
            borderRadius="md"
            src={storage.getFileView(POSTS_BUCKET_ID, post.image)}
          />
        )}

        {post.code && post.code.trim().length > 0 && (
          <CodeViewer code={post.code} short />
        )}
      </VStack>
    </Box>
  )
}

export default Post
