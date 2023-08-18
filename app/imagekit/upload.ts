import { v4 as uuidv4 } from "uuid"

import imagekit from "./initialize"
import { UploadResponse } from "imagekit/dist/libs/interfaces"

async function uploadImage(
  url: string,
  unique: boolean = true
): Promise<UploadResponse | null> {
  try {
    const response: UploadResponse = await imagekit.upload({
      file: url,

      fileName: "logo.jpeg",
      useUniqueFileName: unique,
      folder: "/logos",
      isPrivateFile: false,
    })
    if (response?.url && response?.name) {
      return response
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

export default uploadImage
