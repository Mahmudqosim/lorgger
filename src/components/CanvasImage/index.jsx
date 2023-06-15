/* eslint-disable react-hooks/exhaustive-deps */
import { chakra } from "@chakra-ui/react"
import { useCallback, useEffect, useRef } from "react"

export default function CanvasImage({ source, setSelectedFile, type }) {
  const canvasRef = useRef(null)

  const resizeImage = useCallback(
    async (
      /* imageW: number,
      imageH: number, */
      originalWidthToHeightRatio,
      activeImage
    ) => {
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      const IMAGE_HEIGHT = type === "profile" ? 2000 : 750
      if (!context) return

      const heightValue = IMAGE_HEIGHT
      const widthValue = IMAGE_HEIGHT * originalWidthToHeightRatio
      // const heightValue = imageH > IMAGE_HEIGHT ? IMAGE_HEIGHT : imageH
      /* const widthValue =
        imageH > IMAGE_HEIGHT
          ? IMAGE_HEIGHT * originalWidthToHeightRatio
          : imageW */

      canvas.width = widthValue
      canvas.height = heightValue

      context.drawImage(
        activeImage,
        0,
        0,
        Math.floor(widthValue),
        Math.floor(heightValue)
      )

      const file = await dataUriToFile(
        canvas.toDataURL(),
        `${Math.floor(Math.random() * Date.now()).toString(36)}-file.png`
      )

      console.log(file)

      setSelectedFile(file)
    },
    []
  )

  async function dataUriToFile(url, fileName) {
    const blob = await (await fetch(url)).blob()
    return new File([blob], fileName, { type: blob.type })
  }

  useEffect(() => {
    const activeImage = new Image()

    activeImage.addEventListener("load", () => {
      let originalWidthToHeightRatio = activeImage.width / activeImage.height

      resizeImage(
        /* activeImage.width,
        activeImage.height, */
        originalWidthToHeightRatio,
        activeImage
      )
    })

    if (!source) return

    activeImage.src = source.toString()
  }, [resizeImage, source])

  return <chakra.canvas width="1200" height="900" hidden ref={canvasRef}></chakra.canvas>
}
