import { Box, Flex } from "@chakra-ui/react"
import { EditorView } from "@codemirror/view"
import { langNames, loadLanguage } from "@uiw/codemirror-extensions-langs"
import CodeMirror, { basicSetup } from "@uiw/react-codemirror"
import { BsCircleFill } from "react-icons/bs"

const extensions = langNames.reduce(
  (prev, next) => {
    return [...prev, loadLanguage(next)]
  },
  [EditorView.lineWrapping]
)

const CodeSnippet = ({ code, setCode }) => {
  return (
    <Flex id="code-snippet" flexDirection="column" width="full">
      <Box
        display="flex"
        p="4"
        gap="2"
        borderRadius="5px 5px 0 0"
        style={{ backgroundColor: "#282c34" }}
      >
        <BsCircleFill style={{ fill: "#ff5722" }} />
        <BsCircleFill style={{ fill: "#ffc107" }} />
        <BsCircleFill style={{ fill: "#8bc34a" }} />
      </Box>

      <CodeMirror
        suppressContentEditableWarning
        spellCheck={false}
        basicSetup={basicSetup}
        value={code}
        width="100%"
        height="100%"
        maxHeight="400px"
        theme="dark"
        extensions={extensions}
        onChange={(code) => {
          setCode(code)
        }}
      />
    </Flex>
  )
}

export default CodeSnippet
