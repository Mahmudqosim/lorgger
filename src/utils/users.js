import { Query } from "appwrite"
import { databases } from "./appwrite"
import { DATABASE_ID, USER_COLLECTION_ID } from "./constants"

export const getUserProfile = async (username) => {
  try {
    return databases.listDocuments(DATABASE_ID, USER_COLLECTION_ID, [
      Query.equal("username", [username]),
    ])
  } catch (error) {
    return Object.create(error)
  }
}

export const toggleFollow = async (followerProfile, followingProfile) => {
  try {
    if (followingProfile.followers.includes(followerProfile.userId)) {
      await databases.updateDocument(
        DATABASE_ID,
        USER_COLLECTION_ID,
        followingProfile.$id,
        {
          followers: followingProfile.followers.filter(
            (p) => p !== followerProfile.userId
          ),
        }
      )

      await databases.updateDocument(
        DATABASE_ID,
        USER_COLLECTION_ID,
        followerProfile.$id,
        {
          following: followerProfile.following.filter(
            (p) => p !== followingProfile.userId
          ),
        }
      )

      return
    } else {
      await databases.updateDocument(
        DATABASE_ID,
        USER_COLLECTION_ID,
        followingProfile.$id,
        {
          followers: [...followingProfile.followers, followerProfile.userId],
        }
      )

      await databases.updateDocument(
        DATABASE_ID,
        USER_COLLECTION_ID,
        followerProfile.$id,
        {
          following: [...followerProfile.followers, followingProfile.userId],
        }
      )

      return
    }
  } catch (error) {
    return Object.create(error)
  }
}
