import { ID } from "appwrite"
import { storage } from "./appwrite"

export const uploadFile = async (file, bucketId) => {
  try {
    if (!file) return { $id: "" }
    return storage.createFile(bucketId, ID.unique(), file)
  } catch (error) {
    return Object.create(error)
  }
}
