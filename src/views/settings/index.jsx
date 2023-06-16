import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import { userState } from "../../atoms/user"
import { useEffect, useRef, useState } from "react"
import CanvasImage from "../../components/CanvasImage"
import { FcAddImage } from "react-icons/fc"

const Settings = () => {
  const [coverImageSource, setCoverImageSource] = useState(null)
  const [profilePictureSource, setProfilePictureSource] = useState(null)

  const [profile, setProfile] = useState({
    name: null,
    username: null,
    bio: null,
    coverImage: null,
    githubUrl: null,
    portfolioUrl: null,
    profilePicture: null,
  })

  const user = useRecoilValue(userState)

  const coverFilePickerRef = useRef(null)
  const profileFilePickerRef = useRef(null)

  const toast = useToast()

  useEffect(() => {
    if (user.profile) {
      setProfile({
        username: user.profile.username,
        bio: user.profile.bio,
        coverImage: user.profile.coverImage,
        githubUrl: user.profile.githubUrl,
        portfolioUrl: user.profile.portfolioUrl,
        profilePicture: user.profile.profilePicture,
        name: user.profile.name,
      })
    }
  }, [user])

  const handleChange = (e) => {
    setProfile((profile) => ({
      ...profile,
      [e.target.name]: e.target.value,
    }))
  }

  function handleFileChange(event, type) {
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
      if (type === "cover") {
        setCoverImageSource(reader.result)
      } else {
        setProfilePictureSource(reader.result)
      }
      return
    })

    reader.readAsDataURL(event.target.files[0])
  }

  return (
    <Flex flexDirection="column" gap={4}>
      <Flex>
        <Heading fontSize="2xl">Settings</Heading>
      </Flex>

      {profile && (
        <Flex bg="white" flexDirection={"column"} p="4" gap="6">
          <Box
            width="40"
            height="40"
            background="linear-gradient(#bbb, #eee)"
            backgroundImage={
              profile.profilePicture &&
              (typeof profile.profilePicture === "string"
                ? profile.profilePicture
                : URL.createObjectURL(profile.profilePicture))
            }
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            // display="flex"
          >
            <Input
              type="file"
              ref={profileFilePickerRef}
              onChange={(e) => handleFileChange(e, "profile")}
              hidden
            />

            <Button
              border="none"
              leftIcon={<FcAddImage />}
              iconSpacing="0"
              fontWeight="semibold"
              color="gray.100"
              variant="outline"
              onClick={() => {
                profileFilePickerRef.current.click()
              }}
              m={2}
              bg="blackAlpha.500"
            >
              Change Profile Picture
            </Button>

            <CanvasImage
              source={profilePictureSource}
              setSelectedFile={(file) =>
                setProfile((profile) => ({
                  ...profile,
                  profilePicture: file,
                }))
              }
            />
          </Box>
          
          <Box
            width="full"
            background="linear-gradient(#bbb, #eee)"
            backgroundImage={
              profile.coverImage &&
              (typeof profile.coverImage === "string"
                ? profile.coverImage
                : URL.createObjectURL(profile.coverImage))
            }
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            height="48"
            // display="flex"
          >
            <Input
              type="file"
              ref={coverFilePickerRef}
              onChange={(e) => handleFileChange(e, "cover")}
              hidden
            />

            <Button
              border="none"
              leftIcon={<FcAddImage />}
              iconSpacing="0"
              fontWeight="semibold"
              color="gray.100"
              variant="outline"
              onClick={() => {
                coverFilePickerRef.current.click()
              }}
              m={2}
              bg="blackAlpha.500"
            >
              Change Cover Image
            </Button>

            <CanvasImage
              source={coverImageSource}
              setSelectedFile={(file) =>
                setProfile((profile) => ({
                  ...profile,
                  coverImage: file,
                }))
              }
            />
          </Box>

          <Stack spacing={4}>
            <Stack direction={["column", "row"]}>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    onChange={handleChange}
                    placeholder="Name"
                    value={profile.name}
                    size="lg"
                    type="text"
                  />
                </FormControl>
              </Box>
            </Stack>
          </Stack>
        </Flex>
      )}
    </Flex>
  )
}

export default Settings
