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
