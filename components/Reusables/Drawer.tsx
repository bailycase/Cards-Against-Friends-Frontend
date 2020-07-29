import React, { ReactChildren, ReactChild } from 'react'
import { useTransition, animated } from 'react-spring'
import { Box, BoxProps } from 'grommet'
import styled from 'styled-components'

type location = 'left' | 'right'

interface DrawerProps {
    open: boolean
    location: location
    children: ReactChild | ReactChildren
    disabled: boolean;
}

interface DrawerContainerProps {
    location: location
}

const DrawerContainer = styled(animated.div) < DrawerContainerProps & BoxProps > `
  z-index: 10;
  position: fixed;
  height: 100%;
  right: 0;
  bottom: 0;
  left: ${(props) => props.location === 'left' && 0};
  right: ${(props) => props.location === 'right' && 0};
  width: 30%;
`

export default function Drawer(props: DrawerProps): any {
    const { open, location, children, disabled } = props
    if (disabled) return null
    const transitions = useTransition(open, null, {
        from: { transform: 'translate3d(400px,0,0)', opacity: 0 },
        enter: { transform: 'translate3d(0,0,0)', opacity: 1 },
        leave: { transform: 'translate3d(400px,0px,0px)', opacity: 0 }
    })
    return transitions.map(({ item, key, props }) => item && (
        <DrawerContainer location={location} key={key} style={props}>
            <Box elevation="xlarge" background="drawer" alignContent="center" pad="medium" align="center" fill>
                {children}
            </Box>
        </DrawerContainer >
    )
    )
}
