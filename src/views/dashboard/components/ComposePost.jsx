import {
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { flushSync } from "react-dom"
import { FcAddImage } from "react-icons/fc"
import { HiCode, HiX } from "react-icons/hi"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { userState } from "../../../atoms/user"
import CanvasImage from "../../../components/CanvasImage"
import { POSTS_BUCKET_ID } from "../../../utils/constants"
import { createLikeDoc } from "../../../utils/likes"
import { createPost } from "../../../utils/posts"
import { uploadFile } from "../../../utils/uploads"
import CodeSnippet from "./CodeSnippet"
import { postsState } from "../../../atoms/posts"

const ComposePost = () => {
  const [post, setPost] = useState({
    content: "",
    image: null,
    code: "// Start writing",
  })

  const [codeAdded, setCodeAdded] = useState(false)

  const [source, setSource] = useState(null)

  const [loading, setLoading] = useState(false)

  const user = useRecoilValue(userState)
  const setHomePosts = useSetRecoilState(postsState)

  const filePickerRef = useRef(null)

  const toast = useToast()

  function handleFileChange(event) {
    const FILE_TYPES = ["image/png", "image/jpg", "image/jpeg", "image/webp"]

    if (event.target.files.length < 1) {
      return
    }

    if (!FILE_TYPES.includes(event.target.files[0].type)) {
      toast({
        title: "File upload error",
        description: "File type should be either a png, jpg, webp",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      })

      return
    }

    if (event.target.files[0].size > 1024 * 1024 * 5) {
      toast({
        title: "File upload error",
        description: "Image size should not be larger than 2MB",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      })
      return
    }

    const reader = new FileReader()

    reader.addEventListener("load", () => {
      return setSource(reader.result)
    })

    reader.readAsDataURL(event.target.files[0])
  }

  function createPostAndUploadImage() {
    setLoading(true)

    /* if (post.content.length < 5) {
      return
    }
 */
    uploadFile(post.image, POSTS_BUCKET_ID)
      .then((data) => {
        createPost({
          name: user.user.name,
          userId: user.user.$id,
          content: post.content,
          code: post.code,
          image: data.$id,
          profilePicture: user.profile.profilePicture,
          username: user.profile.username,
        })
          .then((createdPost) => {
            createLikeDoc(createdPost.$id, user.user.$id)
              .then(() => {
                setLoading(false)

                setPost({
                  content: "",
                  image: null,
                  code: "// Start writing",
                })

                setCodeAdded(false)

                setHomePosts((posts) => {
                  return [...posts, createdPost]
                })
              })
              .catch((error) => {
                setLoading(false)
                console.log(error)
              })
          })
          .catch((error) => {
            console.log(error)
            setLoading(false)
          })
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  return (
    <Flex
      dropShadow="lg"
      border="1px solid"
      borderColor="gray.100"
      flexDirection="column"
      width="full"
      bg="white"
      borderRadius="10px"
    >
      <Textarea
        placeholder="Compose new post"
        p="6"
        border="none"
        borderBottom="1px solid"
        borderBottomColor="gray.200"
        borderRadius="10px 10px 0 0"
        value={post.content}
        onChange={(e) =>
          setPost((post) => ({ ...post, content: e.target.value }))
        }
      />
      {post.image && (
        <Flex position="relative" p="4">
          <Button
            position="absolute"
            top="8"
            right="8"
            height="3rem"
            p="2"
            bg="red.500"
            _hover={{ bg: "red.300" }}
            borderRadius="full"
            aspectRatio="1/1"
            onClick={() => {
              setSource(null)
              setPost((post) => ({ ...post, image: null }))

              filePickerRef.current.value = null
            }}
          >
            <HiX fontSize="1.5rem" />
          </Button>
          <Image
            borderRadius="md"
            width="full"
            objectFit="cover"
            height={300}
            src={URL.createObjectURL(post.image)}
          />
        </Flex>
      )}

      {codeAdded && (
        <Flex position="relative" p="4">
          <Button
            position="absolute"
            zIndex="1"
            top="8"
            right="8"
            height="3rem"
            p="2"
            bg="red.500"
            _hover={{ bg: "red.300" }}
            borderRadius="full"
            aspectRatio="1/1"
            onClick={() => {
              setCodeAdded(false)
            }}
          >
            <HiX fontSize="1.5rem" />
          </Button>
          <CodeSnippet
            code={post.code}
            setCode={(code) => {
              setPost((post) => ({ ...post, code }))
            }}
          />
        </Flex>
      )}

      <Flex
        p="4"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Stack direction={["column", "row"]} spacing="1">
          <Button
            border="none"
            leftIcon={<FcAddImage />}
            iconSpacing="0"
            fontWeight="semibold"
            color="gray.600"
            variant="outline"
            onClick={() => {
              filePickerRef.current.click()
            }}
          >
            Add Photo
          </Button>

          <Input
            type="file"
            ref={filePickerRef}
            onChange={handleFileChange}
            hidden
          />

          <CanvasImage
            source={source}
            setSelectedFile={(file) =>
              setPost((post) => ({
                ...post,
                image: file,
              }))
            }
          />

          <Button
            border="none"
            leftIcon={<HiCode />}
            iconSpacing="0"
            fontWeight="semibold"
            color="gray.600"
            variant="outline"
            onClick={() => {
              if (!codeAdded) {
                flushSync(() => {
                  setCodeAdded(true)
                })

                document
                  .getElementById("code-snippet")
                  .scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Add Code
          </Button>
        </Stack>

        <Button
          iconSpacing={0}
          onClick={() => {
            if (post.content.trim().length < 6) {
              toast({
                title: "Post error",
                description: "Content field is empty",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "bottom-left",
              })

              return
            }

            createPostAndUploadImage()
          }}
          disabled={loading}
        >
          {loading ? <Spinner size="sm" /> : "Create post"}
        </Button>
      </Flex>
    </Flex>
  )
}

export default ComposePost
