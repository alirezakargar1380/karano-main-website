'use client';

import { useScroll } from 'framer-motion';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import MainLayout from 'src/layouts/main';

import ScrollProgress from 'src/components/scroll-progress';

import Image from 'src/components/image';
import HomeHero from '../home-hero';
import HomeMinimal from '../home-minimal';
import HomePricing from '../home-pricing';
import HomeDarkMode from '../home-dark-mode';
import HomeLookingFor from '../home-looking-for';
import HomeForDesigner from '../home-for-designer';
import HomeColorPresets from '../home-color-presets';
import HomeAdvertisement from '../home-advertisement';
import HomeCleanInterfaces from '../home-clean-interfaces';
import HomeHugePackElements from '../home-hugepack-elements';
import { Button, Card, CardContent, CardHeader, Container, Grid, Stack, Typography } from '@mui/material';
import { _carouselsExample } from 'src/sections/_examples/extra/carousel-view';
import CarouselBasic3 from 'src/sections/_examples/extra/carousel-view/carousel-basic-3';
import CarouselBasic1 from 'src/sections/_examples/extra/carousel-view/carousel-basic-1';
import { HEADER } from 'src/layouts/config-layout';
import { useCallback, useEffect, useState } from 'react';
import CarouselHomeCategory from 'src/sections/_examples/extra/carousel-view/carousel-home-category';
import CustomPopover, { usePopover, MenuPopoverArrowValue } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type StyledPolygonProps = {
  anchor?: 'top' | 'bottom';
};

const StyledPolygon = styled('div')<StyledPolygonProps>(({ anchor = 'top', theme }) => ({
  left: 0,
  zIndex: 9,
  height: 80,
  width: '100%',
  position: 'absolute',
  clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
  backgroundColor: theme.palette.background.default,
  display: 'block',
  lineHeight: 0,
  ...(anchor === 'top' && {
    top: -1,
    transform: 'scale(-1, -1)',
  }),
  ...(anchor === 'bottom' && {
    bottom: -1,
    backgroundColor: theme.palette.grey[900],
  }),
}));

// ----------------------------------------------------------------------

export default function HomeView() {

  const { scrollY, scrollYProgress } = useScroll();

  const [percent, setPercent] = useState(0);

  const customizedPopover = usePopover();

  const getScroll = useCallback(() => {
    let heroHeight = 0;

    // if (heroRef.current) {
    //   heroHeight = heroRef.current.offsetHeight;
    // }

    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      {/* <HomeHero /> */}

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
          mt: `${HEADER.H_DESKTOP + 20}px`
        }}
      >
        {/* <HomeMinimal /> */}

        <Stack spacing={10}>
          <Container maxWidth={'xl'}>
            <Box sx={{ width: 0.95, ml: 'auto' }}>
              <CarouselHomeCategory />

              <Stack spacing={12}>
                <CarouselBasic1 data={_carouselsExample.slice(0, 8)} />
                <Image alt={'karano'} src={'/assets/icons/product/wood_karano.jpg'} sx={{ width: 1 }} />
                <Box>
                  <Typography variant='h3' fontFamily={'peyda-bold'} sx={{ pb: 2 }}>ایده ها و محصولات قابل اجرا با کارانو</Typography>
                  <Grid container spacing={2}>
                    <Grid md={3} item>
                      <Image alt={'karano'} src={'/assets/images/landing/ideas/classic-01 12.jpg'} sx={{ width: 1, height: 1 }} />
                    </Grid>
                    <Grid md={3} item>
                      <Stack spacing={2}>
                        <Image alt={'karano'} src={'/assets/images/landing/ideas/classic-01 15.jpg'} sx={{ width: 1, height: 0.7 }} />
                        <Image alt={'karano'} src={'/assets/images/landing/ideas/classic-01 14.jpg'} sx={{ width: 1, height: 0.3 }} />
                      </Stack>

                    </Grid>
                    <Grid md={6} item>
                      <Box sx={{
                        width: 24,
                        height: 24,
                        position: 'absolute',
                        zIndex: 1,
                        // top: 0,
                        ml: '100px',
                        mt: '100px'
                      }}>
                        <Button variant="contained" onClick={customizedPopover.onOpen} sx={{ mr: 5 }}>
                          Open
                        </Button>
                        <CustomPopover
                          open={customizedPopover.open}
                          onClose={customizedPopover.onClose}
                          arrow={'bottom-center'}
                        >
                          <Box sx={{ p: 2, maxWidth: 280 }}>
                            <Typography variant="subtitle1" gutterBottom>
                              Etiam feugiat lorem non metus
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              Fusce vulputate eleifend sapien. Curabitur at lacus ac velit ornare lobortis.
                            </Typography>
                          </Box>
                        </CustomPopover>
                      </Box>
                      <Image alt={'karano'} src={'/assets/images/landing/ideas/image 227.jpg'} sx={{ width: 1, height: 1 }} />
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </Box>



          </Container>
        </Stack>



        {/* <HomeHugePackElements />

        <Box sx={{ position: 'relative' }}>
          <StyledPolygon />
          <HomeForDesigner />
          <StyledPolygon anchor="bottom" />
        </Box>

        <HomeDarkMode />

        <HomeColorPresets />

        <HomeCleanInterfaces />

        <HomePricing />

        <HomeLookingFor />

        <HomeAdvertisement /> */}
      </Box>
    </MainLayout>
  );
}
