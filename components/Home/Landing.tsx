import React from 'react';
import { useHistory } from 'react-router-dom';
// import '../../../assets/dashboard/css/black-dashboard.scoped.css';
// import "../../../assets/landing/css/main.scss";
import Particles from 'react-particles-js';
import {
  Box, Paragraph, Heading, Button
} from 'grommet';

const Landing = () => {
  const history = useHistory();
  const handleStart = (): void => {
    history.push('/login');
  };

  return (
    <>
      <Particles
        style={{
          zIndex: -1, position: 'absolute', left: 0, top: 0,
        }}
        params={
          {
            absorbers: [],
            background: {},
            backgroundMask: {
              enable: false,
            },
            detectRetina: false,
            emitters: [],
            fpsLimit: 60,
            infection: {
              cure: false,
              delay: 0,
              enable: false,
              infections: 0,
              stages: [],
            },
            interactivity: {
              // detectsOn: 'canvas',
              events: {
                onClick: {
                  enable: true,
                  mode: 'push',
                },
                onDiv: {
                  elementId: '',
                  enable: false,
                  mode: [],
                },
                onHover: {
                  enable: true,
                  mode: 'slow',
                  parallax: {
                    enable: false,
                    force: 60,
                    smooth: 10,
                  },
                },
                resize: true,
              },
              modes: {
                absorbers: [],
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40,
                },
                connect: {
                  distance: 80,
                  lineLinked: {
                    opacity: 0.5,
                  },
                  radius: 60,
                },
                emitters: [],
                grab: {
                  distance: 400,
                  lineLinked: {
                    opacity: 1,
                  },
                },
                push: {
                  quantity: 4,
                },
                remove: {
                  quantity: 2,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                  speed: 1,
                },
                slow: {
                  factor: 3,
                  radius: 100,
                },
              },
            },
            particles: {
              collisions: {
                enable: false,
                // mode: ",
              },
              color: {
                value: '#6320EE',
              },
              lineLinked: {
                blink: false,
                color: {
                  value: '#6320EE',
                },
                consent: false,
                distance: 150,
                enable: true,
                opacity: 0.4,
                shadow: {
                  blur: 5,
                  color: {
                    value: 'lime',
                  },
                  enable: false,
                },
                width: 1,
              },
              move: {
                attract: {
                  enable: false,
                  rotate: {
                    x: 600,
                    y: 1200,
                  },
                },
                // direction: 'none',
                enable: true,
                noise: {
                  delay: {
                    random: {
                      enable: false,
                      minimumValue: 0,
                    },
                    value: 0,
                  },
                  enable: false,
                  factor: {
                    horizontal: {
                      value: 50,
                      offset: 0,
                    },
                    vertical: {
                      value: 10,
                      offset: 40000,
                    },
                  },
                },
                // outMode: 'out',
                random: false,
                speed: 5,
                straight: false,
                trail: {
                  enable: false,
                  length: 5,
                  fillColor: {
                    value: '#000000',
                  },
                },
                vibrate: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                  factor: 800,
                },
                limit: 0,
                value: 100,
              },
              opacity: {
                animation: {
                  enable: false,
                  minimumValue: 0.1,
                  speed: 1,
                  sync: false,
                },
                // random: {
                //   enable: false,
                //   minimumValue: 1,
                // },
                value: 0.5,
              },
              rotate: {
                animation: {
                  enable: false,
                  speed: 0,
                  sync: false,
                },
                // direction: 'clockwise',
                random: false,
                value: 0,
              },
              shadow: {
                blur: 0,
                color: {
                  value: '#000000',
                },
                enable: false,
                offset: {
                  x: 0,
                  y: 0,
                },
              },
              shape: {
                options: {
                  polygon: {
                    fill: true,
                    close: true,
                  },
                  star: {
                    fill: true,
                    close: true,
                  },
                },
                type: 'circle',
              },
              size: {
                animation: {
                  enable: false,
                  minimumValue: 0.1,
                  speed: 40,
                  sync: false,
                },
                value: 5,
              },
              stroke: {
                color: {
                  value: '#000000',
                },
                width: 0,
                opacity: 1,
              },
              twinkle: {
                lines: {
                  enable: false,
                  frequency: 0.05,
                  opacity: 1,
                },
                particles: {
                  enable: false,
                  frequency: 0.05,
                  opacity: 1,
                },
              },
            },
            pauseOnBlur: true,
            polygon: {
              draw: {
                enable: false,
                stroke: {
                  color: {
                    value: '#fff',
                  },
                  width: 0.5,
                  opacity: 1,
                },
              },
              enable: false,
              // inline: {
              //   arrangement: 'one-per-point',
              // },
              // move: {
              //   radius: 10,
              //   type: 'path',
              // },
              scale: 1,
              // type: 'none',
              url: '',
            },
          }
        }
      />
      <Box pad="10%" alignContent="center" justify="center" fill background="rgb(0,0,0,0.5)">
        {/* <Box round="small" height="medium" width="large" elevation="xlarge" style={{ backgroundColor: "rgb(255, 255, 255)" }} pad="medium"> */}
        <Heading size="large" color="white" margin="0">Welcome to Cards Against Friends!</Heading>
        <Paragraph size="xxlarge" color="white">A new take on cards, forever and always free!</Paragraph>
        <Button style={{ width: '200px' }} size="large" primary color="brand" label="Start Playing" onClick={handleStart} />
        {/* </Box> */}
      </Box>
    </>
  );
};
export default Landing;
