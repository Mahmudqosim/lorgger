import { WarningTwoIcon } from "@chakra-ui/icons"
import {
  Button,
  CircularProgress,
  Container,
  Heading,
  chakra,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FiRefreshCw } from "react-icons/fi"
import { Navigate, Outlet } from "react-router-dom"
import { useRecoilState } from "recoil"
import { userState } from "../../atoms/user"
import { getUserData, getAuthUserProfile } from "../../utils/auth"

const ProtectedRoute = () => {
  const [user, setUser] = useRecoilState(userState)
  const [redirectToLogin, setRedirectToLogin] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isNetworkError, setIsNetworkError] = useState(false)

  useEffect(() => {
    getUserData()
      .then((data) => {
        setLoading(true)

        if (data) {
          if (!user.profile) {
            getAuthUserProfile(data.$id)
              .then((profile) => {

                setUser(() => ({
                  user: data,
                  profile: profile.documents[0],
                  loggedIn: true,
                }))
              })
              .catch((error) => {
                if (error.code !== 401) {
                  setIsNetworkError(true)
                }
              })
          }

          setUser((value) => ({
            ...value,
            user: data,
            loggedIn: true,
          }))

          setLoading(false)
          setRedirectToLogin(false)
        }
      })
      .catch((error) => {
        if (error.code !== 401) {
          setIsNetworkError(true)
        }

        setUser(() => ({
          user: null,
          profile: null,
          loggedIn: false,
        }))

        setLoading(false)
        setRedirectToLogin(true)
      })
  }, [])

  if (loading || redirectToLogin === null) {
    return (
      <chakra.div
        display="flex"
        position="fixed"
        background="white"
        zIndex="overlay"
        top="0"
        left="0"
        right="0"
        width="full"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress isIndeterminate color="branddark.300" />
      </chakra.div>
    )
  }

  if (!loading && isNetworkError) {
    return (
      <Container
        borderRadius="md"
        p="4"
        textAlign="center"
        display="flex"
        gap="4"
        flexDirection="column"
        alignItems="center"
        mt={12}
      >
        <WarningTwoIcon color="red.300" fontSize="5xl" />
        <Heading color="gray.600">
          Oops! Something went wrong with our server or your internet
          connection.
        </Heading>

        <Button
          variant="outline"
          leftIcon={<FiRefreshCw />}
          onClick={() => window.location.reload()}
        >
          {" "}
          Reload Page
        </Button>
      </Container>
    )
  }

  return (
    <>
      {redirectToLogin === true ? (
        <Navigate to="/login" />
      ) : (
        <Container my="14">
          <Outlet />
        </Container>
      )}
    </>
  )
}

export default ProtectedRoute
