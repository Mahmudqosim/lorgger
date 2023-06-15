import { Button, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
// import { useRecoilValue } from "recoil"
// import { userState } from "../../atoms/user"
import { useParams } from "react-router-dom"
import { getUserProfile } from "../../utils/users"

const Profile = () => {
  // const user = useRecoilValue(userState)
  const [userProfile, setUserProfile] = useState(null)
  const [userProfileLoading, setUserProfileLoading] = useState(false)

  const { username } = useParams()

  useEffect(() => {
    if (username) {
      getUserProfile(username)
        .then((data) => {
          console.log(data)
          setUserProfile(data)
        })
        .catch((err) => console.log(err))
    }
  }, [username])

  return (
    <Flex>
      {username}
      <Button>
        {/* {userProfile && user} */}
      </Button>
    </Flex>
  )
}

export default Profile
