import { ID, Query } from "appwrite"
import { databases } from "./appwrite"
import { DATABASE_ID, POST_COLLECTION_ID } from "./constants"

export const createPost = async ({
  userId,
  content,
  image,
  code,
  profilePicture,
  username,
  name,
}) => {
  try {
    return databases.createDocument(
      DATABASE_ID,
      POST_COLLECTION_ID,
      ID.unique(),
      {
        userId,
        content,
        image,
        code,
        profilePicture,
        username,
        name,
      }
    )
  } catch (error) {
    return Object.create(error)
  }
}

export const getPosts = async () => {
  try {
    return databases.listDocuments(DATABASE_ID, POST_COLLECTION_ID)
  } catch (error) {
    return Object.create(error)
  }
}

export const getUserPost = async ({ userId }) => {
  try {
    return databases.listDocuments(DATABASE_ID, POST_COLLECTION_ID, [
      Query.equal("userId", [userId]),
    ])
  } catch (error) {
    return Object.create(error)
  }
}

export const deletePost = async (postId) => {
  try {
    return databases.deleteDocument(DATABASE_ID, POST_COLLECTION_ID, postId)
  } catch (error) {
    return Object.create(error)
  }
}
