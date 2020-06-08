import React, { ReactElement } from 'react'
import { Layer, Box, Heading, Paragraph } from 'grommet'
import packageJson from '../../package.json'

interface Props {

}

export default function AlertModal({ }: Props): ReactElement {
    return (
        <Layer>
            <Box gap="medium" direction="column" pad="large" align="center" width="large" justify="evenly">
                <Heading size="medium" margin="none">
                    Early Build {packageJson.version}
                </Heading>
                <Paragraph size="large" margin="none">
                    This is a small project being built by a single developer. With that being said, this is an early alpha build with core functionality added. There will be some bugs and issues, expect these to be fixed over time as found.
                    There will be many updates and improvements over time.
          </Paragraph>
                <Heading size="small" margin="none">
                    Please enjoy Cards Against Friends
          </Heading>
            </Box>
        </Layer>
    )
}
