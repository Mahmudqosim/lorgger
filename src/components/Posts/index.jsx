import { Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getPosts, getUserPost } from "../../utils/posts"
import Post from "./components/Post"
import { useRecoilState } from "recoil"
import { postsState } from "../../atoms/posts"

const Posts = ({ userId, profile, isProfilePage }) => {
  const [posts, setPosts] = useState(null)
  const [homePosts, setHomePosts] = useRecoilState(postsState)

  useEffect(() => {
    if (isProfilePage) {
      getUserPost({ userId: profile.userId })
        .then((data) => {
          setPosts(data.documents)
        })
        .catch((err) => console.log(err))
    } else {
      getPosts()
        .then((data) => {
          setHomePosts(data.documents)
        })
        .catch((err) => console.log(err))
    }
  }, [isProfilePage, profile, setHomePosts])

  return (
    <Flex
      mt="6"
      width="full"
      flexDirection="column"
      borderTop="1px solid"
      borderColor="gray.100"
    >
      {isProfilePage ? (
        (posts && posts.length) > 0 ? (
          posts.map((post) => (
            <Post
              key={post.$id}
              userId={userId}
              post={post}
              profile={
                isProfilePage
                  ? profile
                  : {
                      name: post.name,
                      username: post.username,
                      userId: post.userId,
                      profilePicture: post.profilePicture,
                    }
              }
              setPosts={setPosts}
            />
          ))
        ) : (
          <Text width="full" textAlign="center">
            No posts here
          </Text>
        )
      ) : (homePosts && homePosts.length) > 0 ? (
        homePosts.map((post) => (
          <Post
            key={post.$id}
            userId={userId}
            post={post}
            profile={
              isProfilePage
                ? profile
                : {
                    name: post.name,
                    username: post.username,
                    userId: post.userId,
                    profilePicture: post.profilePicture,
                  }
            }
            setPosts={setPosts}
          />
        ))
      ) : (
        <Text width="full" textAlign="center">
          No posts here
        </Text>
      )}
    </Flex>
  )
}

export default Posts
