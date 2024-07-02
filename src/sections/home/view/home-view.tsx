'use client';

import { useScroll } from 'framer-motion';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import MainLayout from 'src/layouts/main';

import ScrollProgress from 'src/components/scroll-progress';

import Image from 'src/components/image';
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { _carouselsExample } from 'src/sections/_examples/extra/carousel-view';
import CarouselBasic3 from 'src/sections/_examples/extra/carousel-view/carousel-basic-3';
import CarouselBasic1 from 'src/sections/_examples/extra/carousel-view/carousel-basic-1';
import { HEADER } from 'src/layouts/config-layout';
import { useCallback, useEffect, useState } from 'react';
import CarouselHomeCategory from 'src/sections/_examples/extra/carousel-view/carousel-home-category';
import CustomPopover, { usePopover, MenuPopoverArrowValue } from 'src/components/custom-popover';
import CarouselBasic2 from 'src/sections/_examples/extra/carousel-view/carousel-basic-2';
import CarouselProducts from 'src/sections/_examples/extra/carousel-view/carousel-products';
import { varFade, MotionViewport } from 'src/components/animate';

import { m } from 'framer-motion';
import HomeOrderWithKarano from '../home-order-with-karano';
import CountUp from 'react-countup';
import { useResponsive } from 'src/hooks/use-responsive';
import { LoadingButton } from '@mui/lab';

import { useSnackbar } from 'src/components/snackbar';
// ----------------------------------------------------------------------

export default function HomeView() {
  const mdUp = useResponsive('up', 'md');

  const { scrollY, scrollYProgress } = useScroll();

  const [percent, setPercent] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

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

  useEffect(() => {
    enqueueSnackbar('این یک پیام تست ا یک پیام تست ا یک پیام تست ا یک پیام تست ا یک پیام تست م تست است', {
      autoHideDuration: 60000 * 1000,
      variant: 'error'
    })
  }, [])

  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      {/* <HomeHero /> */}

      <Box
        // maxWidth={'xl'}
        component={MotionViewport}
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
          // mt: `${HEADER.H_DESKTOP + 100}px`
        }}
      >

        <Container maxWidth={'xl'}>
          <Stack spacing={4}>
            <CarouselHomeCategory />
            <CarouselBasic1 data={_carouselsExample.slice(0, 8)} sx={{ mt: 4 }} />
          </Stack>
        </Container>


        <m.div
          initial={varFade().inDown.initial}
          whileInView={varFade().inDown.animate}
          exit={varFade().inUp.exit}
          viewport={{
            once: true,
            // amount: 1
          }}
          transition={{
            duration: 1,
          }}
        >
          <Box sx={{
            mt: 10,
            backgroundImage: "url('/assets/images/landing/mmm.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            color: '#fff', textAlign: 'center'
          }}>
            <Typography sx={{ width: 1, color: "#fff", py: 5 }} variant='h3'>
              کارانو، راه‌حل‌های کارامد در صنعت چوب
            </Typography>
            <Grid
              container
              sx={{ py: 6, fontFamily: 'peyda-bold', fontSize: '4rem' }}
              spacing={!mdUp ? 6 : 0}
            >

              <Grid item md={3} sm={12} xs={12} borderRight={mdUp ? '1px solid #fff' : ''}>
                <Box width={!mdUp ? 'fit-content' : 1} sx={{ mx: 'auto' }} borderBottom={!mdUp ? '1px solid #fff' : ''}>

                  <CountUp duration={3} end={99} redraw={true} delay={1} /> +
                  <Typography fontFamily={'peyda-regular'} sx={{ pb: 3 }} variant='h5'>سال تجربه و قدمت</Typography>

                </Box>
              </Grid>

              <Grid item md={3} sm={12} xs={12} borderRight={mdUp ? '1px solid #fff' : ''}>
                <Box width={!mdUp ? 'fit-content' : 1} sx={{ mx: 'auto' }} borderBottom={!mdUp ? '1px solid #fff' : ''}>

                  <CountUp duration={3} end={99} redraw={true} delay={1} /> +
                  <Typography fontFamily={'peyda-regular'} sx={{ pb: 3 }} variant='h5'>سال تجربه و قدمت</Typography>

                </Box>
              </Grid>

              <Grid item md={3} sm={12} xs={12} borderRight={mdUp ? '1px solid #fff' : ''}>
                <Box width={!mdUp ? 'fit-content' : 1} sx={{ mx: 'auto' }} borderBottom={!mdUp ? '1px solid #fff' : ''}>

                  <CountUp duration={3} end={99} redraw={true} delay={1} /> +
                  <Typography fontFamily={'peyda-regular'} sx={{ pb: 3 }} variant='h5'>سال تجربه و قدمت</Typography>

                </Box>
              </Grid>

              <Grid item md={3} sm={12} xs={12}>
                <Box width={!mdUp ? 'fit-content' : 1} sx={{ mx: 'auto' }} borderBottom={!mdUp ? '1px solid #fff' : ''}>

                  <CountUp duration={3} end={99} redraw={true} delay={1} /> +
                  <Typography fontFamily={'peyda-regular'} sx={{ pb: 3 }} variant='h5'>سال تجربه و قدمت</Typography>

                </Box>
              </Grid>

            </Grid>
          </Box>
        </m.div>

        <Container maxWidth={'xl'} sx={{ mt: 10 }}>
          <Stack spacing={10}>
            {/* <m.div variants={varFade().inUp}> */}
            <Box>
              <Typography variant='h2' fontFamily={'peyda-bold'} sx={{
                pb: 2, textAlign: {
                  xs: 'center',
                  sm: 'center',
                  md: 'left'
                }
              }}>ایده ها و محصولات قابل اجرا با کارانو</Typography>
              <Grid container spacing={2}>
                <Grid xs={6} sm={6} md={3} item>
                  <Image alt={'karano'} src={'/assets/images/landing/ideas/classic-01 12.jpg'} sx={{ width: 1, height: 1 }} />
                </Grid>
                <Grid xs={6} sm={6} md={3} item>
                  <Stack spacing={2}>
                    <Image alt={'karano'} src={'/assets/images/landing/ideas/classic-01 15.jpg'} sx={{ width: 1, height: 0.7 }} />
                    <Image alt={'karano'} src={'/assets/images/landing/ideas/classic-01 14.jpg'} sx={{ width: 1, height: 0.3 }} />
                  </Stack>
                </Grid>
                <Grid xs={12} sm={12} md={6} item sx={{
                  display: {
                    xs: 'none',
                    sm: 'none',
                    md: 'block'
                  }
                }}>
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
            {/* </m.div> */}

            <HomeOrderWithKarano />

            <CarouselProducts data={_carouselsExample.slice(0, 8)} label='پرفروش ها!' />

            <Grid container spacing={5}>
              <Grid item sm={12} md={3}>
                <Typography fontFamily={'peyda-bold'} variant='h5'>
                  آنچه شما ساخته اید
                </Typography>
                <Typography fontFamily={''} sx={{ pb: 3 }} variant='h6'>
                  مشاهده محصولات ساخته  شده به وسیله پروفیل‌های کارنو!
                  برای دیده‌ شدن آنچه شما مشتریان عزیز کارانو ساخته‌اید، می‌توانید تصاویر خود را برای ما در این بخش بارگذاری کنید.
                </Typography>
                <LoadingButton variant='contained' sx={{ borderRadius: '16px' }}>باگذاری تصاویر</LoadingButton>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box>
                  <CarouselBasic2 data={_carouselsExample.slice(4, 8)} />
                </Box>
              </Grid>
            </Grid>

            <Box>
              <Grid container spacing={5}>
                <Grid item md={5}>
                  <Typography variant='h3' fontFamily={'peyda-bold'} sx={{ pb: 2 }}>سفارش به سبک کارانو</Typography>
                  <Typography variant='h6' fontFamily={'peyda-medium'} sx={{ pb: 2 }}>
                    کارانو در سال ۱۳۹۶  فعالیت خود را در زمینه تولید محصولات چوبی آغاز نمود. این موسسه با اتکا بر توان اجرایی خود و بهره‌گیری از تجربه پیشگامان جهانی صنعت چوب، همواره به ارتقا سطح اجرا در صنعت ساختمان کشور یاری رسانده است.
                    هم اکنون کارانو، با عرضه قطعات پیش ساخته دکوراسیون داخلی، سال‌ها تجربه خود را در اختیار همکاران این صنعت قرار داده است.
                    صنایع چوبی چنوب و گروه صنعتی تهران فرم، نام‌های تجاری سابق کارانو می‌باشد.
                  </Typography>
                </Grid>
                <Grid item md={7}>
                  <Image alt={'karano'} src={'/assets/images/landing/Screen Shot 1401-12-04 at 17.15.png'} sx={{ width: 1 }} />
                </Grid>
              </Grid>
            </Box>


          </Stack>
        </Container>







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
