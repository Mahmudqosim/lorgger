import { Box, Flex } from "@chakra-ui/react"
import { EditorView } from "@codemirror/view"
import { langs } from "@uiw/codemirror-extensions-langs"
import { dracula } from "@uiw/codemirror-theme-dracula"
import CodeMirror, { basicSetup } from "@uiw/react-codemirror"
import { BsCircleFill } from "react-icons/bs"

const CodeViewer = ({ code, language, short }) => {
  const langExtension = language ? langs[language] : langs["javascript"]

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
        maxHeight={short && "250px"}
        style={{
          fontSize: "1rem",
        }}
        theme={dracula}
        extensions={[EditorView.lineWrapping, langExtension()]}
        readOnly
      />

      <Box
        display="flex"
        p="4"
        gap="2"
        borderRadius="0 0 5px 5px"
        style={{ backgroundColor: "#282c34" }}
      ></Box>
    </Flex>
  )
}

export default CodeViewer
