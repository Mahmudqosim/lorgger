import { ID, Query } from "appwrite"
import { databases, users } from "./appwrite"
import { DATABASE_ID, USER_COLLECTION_ID } from "./constants"
import { gravatar } from "./gravatar"

export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  try {
    return users.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    )
  } catch (error) {
    return Object.create(error)
  }
}

export const createUserProfile = async (data) => {
  try {
    return databases.createDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      ID.unique(),
      JSON.stringify({
        userId: data.$id,
        name: data.name,
        username: `${data.name
          .split(" ")[0]
          .toLowerCase()
          .substring(0, 10)}${data.$id.substring(9, 13)}`,
        profilePicture: gravatar(data.email),
      })
    )
  } catch (error) {
    return Object.create(error)
  }
}

export const getAuthUserProfile = async (userId) => {
  try {
    return databases.listDocuments(DATABASE_ID, USER_COLLECTION_ID, [
      Query.equal("userId", [userId]),
    ])
  } catch (error) {
    return Object.create(error)
  }
}

export const loginUser = async ({ email, password }) => {
  try {
    return users.createEmailSession(email, password)
  } catch (error) {
    return Object.create(error)
  }
}

export const getUserData = async () => {
  try {
    return users.get()
  } catch (error) {
    return Object.create(error)
  }
}

export const logout = async () => {
  try {
    return users.deleteSession("current")
  } catch (error) {
    return Object.create(error)
  }
}
