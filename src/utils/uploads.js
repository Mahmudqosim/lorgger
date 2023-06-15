import { ID } from "appwrite"
import { storage } from "./appwrite"

export const uploadFile = (file, bucketId) => {
  try {
    return storage.createFile(bucketId, ID.unique(), file)
  } catch (error) {
    return Object.create(error)
  }
}
