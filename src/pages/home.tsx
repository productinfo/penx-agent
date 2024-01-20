import { Box } from '@fower/react'

export const PageHome = () => {
  return (
    <Box textCenter>
      <Box text3XL fontBold mb2>
        PenX Agent
      </Box>
      <Box gray600 leadingSnug>
        PenX Agent is a proxy between PenX App and quick input client. With PenX
        Agent, you can input note quickly in PenX chrome extension, PenX CLI,
        PenX Raycast plugin, PenX Alfred plugin...
      </Box>
      <Box mt8>
        <Box
          as="img"
          src="http://localhost:65432/images/penx-agent.png"
          maxW-540
          h="auto"
        />
      </Box>
    </Box>
  )
}
