import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Skeleton,
  SkeletonCircle,
  Spinner,
  Stack,
  Text,
  chakra,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { userState } from "../../atoms/user"
import { BiBriefcaseAlt, BiEdit } from "react-icons/bi"
import { useParams } from "react-router-dom"
import { getUserProfile, toggleFollow } from "../../utils/users"
import { BsGithub } from "react-icons/bs"
import Posts from "../../components/Posts"

const Profile = () => {
  const user = useRecoilValue(userState)
  const [userProfile, setUserProfile] = useState(null)
  const [userProfileLoading, setUserProfileLoading] = useState(false)

  const [following, setFollowing] = useState()
  const [followLoading, setFollowLoading] = useState(false)

  const { username } = useParams()

  useEffect(() => {
    if (username && user.profile && username === user.profile.username) {
      setUserProfile(user.profile)
      return
    }

    if (username) {
      setUserProfileLoading(true)
      getUserProfile(username)
        .then((data) => {
          setUserProfile(data.documents[0])

          setFollowing(data.documents[0].followers.includes(user.user.$id))

          setUserProfileLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setUserProfileLoading(false)
        })
    }
  }, [user, username])

  const handleFollow = () => {
    setFollowLoading(true)

    toggleFollow(user.profile, userProfile)
      .then(() => {
        setFollowLoading(false)
        setFollowing(!following)
      })
      .catch((error) => {
        setFollowLoading(false)

        console.log(error)
      })
  }

  return (
    <chakra.div bg="white">
      <Flex position="relative" flexDirection="column" gap="6">
        {userProfileLoading && !userProfile && (
          <Box width="full" padding="6" pt="12" bg="white">
            <SkeletonCircle mb="4" size="24" />

            <Stack>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          </Box>
        )}

        {userProfile && (
          <>
            <Box
              position="absolute"
              width="full"
              background="linear-gradient(#bbb, #eee)"
              backgroundImage={userProfile.profilePicture}
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              backgroundPosition="center"
              height="36"
              // display="flex"
            />
            <Box width="full" padding="6" pt="12" bg="white">
              <Avatar
                border="5px solid"
                borderColor="whiteAlpha.500"
                size={{ base: "xl", md: "2xl" }}
                mb="4"
                name={userProfile.name}
                src={userProfile.profilePicture}
              />

              <Flex
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
                gap="2"
              >
                <Stack spacing={1}>
                  <Heading fontSize="2xl">{userProfile.name}</Heading>
                  <Text color="gray.400">@{userProfile.username}</Text>
                </Stack>

                {user.user && user.user.$id === userProfile.userId ? (
                  <Button variant="outline" leftIcon={<BiEdit />}>
                    Edit Profile
                  </Button>
                ) : (
                  <Button bg={following ? 'gray.500' : 'gray.700'} onClick={handleFollow}>
                    {followLoading && <Spinner size="sm" />}
                    {following ? "Unfollow" : "Follow"}
                  </Button>
                )}
              </Flex>

              <Text mt="4">Building solutions with tech ⚡️</Text>

              <HStack mt="4" spacing="6" color="gray.500">
                <a
                  href="https://chakra-templates.dev/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Text display="inline-flex" alignItems="center" gap="2">
                    <BiBriefcaseAlt />
                    <chakra.span display={{ base: "none", sm: "inline-block" }}>
                      https://chakra-templates.dev/
                    </chakra.span>
                  </Text>
                </a>

                <a
                  href="https://github.com/Mahmudqosim/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Text display="inline-flex" alignItems="center" gap="2">
                    <BsGithub />

                    <chakra.span display={{ base: "none", sm: "inline-block" }}>
                      Mahmudqosim
                    </chakra.span>
                  </Text>
                </a>
              </HStack>

              <Stack
                mt="4"
                spacing="6"
                color="gray.500"
                direction="['column', 'row']"
              >
                <Text>
                  <chakra.span color="gray.700" fontWeight="bold">
                    {userProfile.followers.length}
                  </chakra.span>{" "}
                  Followers
                </Text>
                <Text>
                  <chakra.span color="gray.700" fontWeight="bold">
                  {userProfile.following.length}
                  </chakra.span>{" "}
                  Following
                </Text>
              </Stack>
            </Box>
          </>
        )}
      </Flex>

      <Flex>
        {userProfile && <Posts userId={user.user.$id} profile={userProfile} isProfilePage />}
      </Flex>
    </chakra.div>
  )
}

export default Profile
