import { databases } from "./appwrite"
import { DATABASE_ID, LIKES_COLLECTION_ID } from "./constants"

export const createLikeDoc = async (postId, userId) => {
  try {
    return databases.createDocument(DATABASE_ID, LIKES_COLLECTION_ID, postId, {
      postId,
      userId,
    })
  } catch (error) {
    return Object.create(error)
  }
}

export const getLikeDoc = async (postId, userId) => {
  try {
    const likeDoc = databases.getDocument(
      DATABASE_ID,
      LIKES_COLLECTION_ID,
      postId
    )

    if (!likeDoc) {
      createLikeDoc(postId, userId).then((data) => {
        return data
      })
    }

    return likeDoc
  } catch (error) {
    return Object.create(error)
  }
}

export const likePost = async ({ postId, likeDoc, userId }) => {
  try {
    if (likeDoc.users.includes(userId)) {
      return databases.updateDocument(
        DATABASE_ID,
        LIKES_COLLECTION_ID,
        postId,
        {
          users: likeDoc.users.filter((u) => u !== userId),
        }
      )
    } else {
      return databases.updateDocument(
        DATABASE_ID,
        LIKES_COLLECTION_ID,
        postId,
        {
          users: [...likeDoc.users, userId],
        }
      )
    }
  } catch (error) {
    return Object.create(error)
  }
}
