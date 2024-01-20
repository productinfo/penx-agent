import { Box } from '@fower/react'

export const PageHome = () => {
  return (
    <Box>
      <Box as="h1">PenX Agent</Box>
      <Box>PenX Agent is running on: http://localhost:65432</Box>
      <Box mt8>
        <Box
          as="img"
          src="http://localhost:65432/images/penx-agent.png"
          maxW-560
          h="auto"
        />
      </Box>
    </Box>
  )
}
