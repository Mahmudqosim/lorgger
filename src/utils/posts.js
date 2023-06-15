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

export const getPosts = async (lastId) => {
  const queryArr = lastId
    ? [Query.limit(30)]
    : [Query.limit(30), Query.cursorAfter(lastId)]

  try {
    return databases.listDocuments(DATABASE_ID, POST_COLLECTION_ID, queryArr)
  } catch (error) {
    return Object.create(error)
  }
}

export const getUserPosts = async (userId, lastId) => {
  const queryArr = lastId
    ? [Query.limit(30)]
    : [Query.limit(30), Query.cursorAfter(lastId)]

  try {
    return databases.listDocuments(
      DATABASE_ID,
      POST_COLLECTION_ID,
      queryArr.concat(Query.equal("userId", [userId]))
    )
  } catch (error) {
    return Object.create(error)
  }
}
