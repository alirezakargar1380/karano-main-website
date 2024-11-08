'use client';

import { useScroll } from 'framer-motion';

import Box from '@mui/material/Box';

import MainLayout from 'src/layouts/main';

import ScrollProgress from 'src/components/scroll-progress';

import Image from 'src/components/image';
import { Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import { _carouselsExample } from 'src/sections/_examples/extra/carousel-view';
import CarouselBasic1 from 'src/sections/_examples/extra/carousel-view/carousel-basic-1';
import { useCallback, useEffect, useState } from 'react';
import CarouselHomeCategory from 'src/sections/_examples/extra/carousel-view/carousel-home-category';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import CarouselBasic2 from 'src/sections/_examples/extra/carousel-view/carousel-basic-2';
import CarouselProducts from 'src/sections/_examples/extra/carousel-view/carousel-products';
import { varFade, MotionViewport } from 'src/components/animate';

import { m } from 'framer-motion';
import HomeOrderWithKarano from '../home-order-with-karano';
import { useResponsive } from 'src/hooks/use-responsive';

import { useOrderContext } from 'src/sections/order/context/order-context';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { endpoints, server_axios } from 'src/utils/axios';
import { PrimaryButton } from 'src/components/styles/buttons/primary';
import { Counter } from './counter';
import SvgColor from 'src/components/svg-color';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function HomeView() {
  const { show, title, text, color, notification_id, onShowPopover, onHideDialog } = useOrderContext();

  const router = useRouter();

  const confirm = useBoolean();

  const mdUp = useResponsive('up', 'md');

  const { scrollY, scrollYProgress } = useScroll();

  const [percent, setPercent] = useState(0);

  const customizedPopover = usePopover();

  const getScroll = useCallback(() => {
    let heroHeight = 0;

    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    if (show && title) confirm.onTrue();
  }, [show, title])

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  const handleSeenNotification = useCallback(async () => {
    console.log(notification_id)
    await server_axios.patch(endpoints.notification.seen(notification_id))
  }, [notification_id]);

  return (
    <>
      <MainLayout footer={false}>

        <ConfirmDialog
          open={confirm.value}
          onClose={async () => {
            await handleSeenNotification();
            confirm.onFalse();
            onHideDialog();
            onShowPopover();
          }}
          color={color}
          title={title}
          closeTitle="الان نه؛ بعداً"
          content={text}
          action={
            <PrimaryButton
              size='medium'
              sx={{ borderRadius: 50, px: 2 }}
              onClick={async () => {
                await handleSeenNotification();
                router.push(paths.orderTracking)
              }}
            >
              پیگیری سفارش
            </PrimaryButton>
          }
        />

        <ScrollProgress scrollYProgress={scrollYProgress} />

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

          <Stack spacing={4}>
            <CarouselHomeCategory />
            <CarouselBasic1 sx={{ mt: 4 }} />
          </Stack>

        </Box>
      </MainLayout>

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
          <Container maxWidth={'xl'}>
            <Typography sx={{ width: 1, color: "#fff", py: 5 }} variant='heading3'>
              کارانو، راه‌حل‌های کارامد در صنعت چوب
            </Typography>
            <Grid
              container
              sx={{ py: 8, height: 1 }}
              spacing={!mdUp ? 6 : 0}
            >

              <Grid item md={3} sm={12} xs={12} borderRight={mdUp ? '1px solid #fff' : ''}>
                <Box width={!mdUp ? 'fit-content' : 1} height={1} sx={{ mx: 'auto' }} borderBottom={!mdUp ? '1px solid #fff' : ''}>
                  <Typography variant='heading1'>
                    <Counter end={88} /> +
                  </Typography>
                  <Typography fontFamily={'peyda-regular'} sx={{ pb: 3 }} variant='h5'>سال تجربه و قدمت</Typography>
                </Box>
              </Grid>

              <Grid item md={3} sm={12} xs={12} borderRight={mdUp ? '1px solid #fff' : ''}>
                <Box width={!mdUp ? 'fit-content' : 1} sx={{ mx: 'auto' }} borderBottom={!mdUp ? '1px solid #fff' : ''}>
                  <Typography variant='heading1'>
                    <Counter end={88} /> +
                  </Typography>
                  <Typography fontFamily={'peyda-regular'} sx={{ pb: 3 }} variant='h5'>سال تجربه و قدمت</Typography>
                </Box>
              </Grid>

              <Grid item md={3} sm={12} xs={12} borderRight={mdUp ? '1px solid #fff' : ''}>
                <Box width={!mdUp ? 'fit-content' : 1} sx={{ mx: 'auto' }} borderBottom={!mdUp ? '1px solid #fff' : ''}>
                  <Typography variant='heading1'>
                    <Counter end={88} /> +
                  </Typography>
                  <Typography fontFamily={'peyda-regular'} sx={{ pb: 3 }} variant='h5'>سال تجربه و قدمت</Typography>
                </Box>
              </Grid>

              <Grid item md={3} sm={12} xs={12}>
                <Box width={!mdUp ? 'fit-content' : 1} sx={{ mx: 'auto' }} borderBottom={!mdUp ? '1px solid #fff' : ''}>
                  <Typography variant='heading1'>
                    <Counter end={88} /> +
                  </Typography>
                  <Typography fontFamily={'peyda-regular'} sx={{ pb: 3 }} variant='h5'>سال تجربه و قدمت</Typography>
                </Box>
              </Grid>

            </Grid>
          </Container>
        </Box>
      </m.div>

      {/* <MainLayout header={false}> */}
        <Container maxWidth={'xl'} sx={{ mt: '120px' }}>
          <Stack spacing={10}>
            {/* <m.div variants={varFade().inUp}> */}
            <Box>
              <Typography
                variant='heading3'
                sx={{
                  pb: '44px',
                  textAlign: {
                    xs: 'center',
                    sm: 'center',
                    md: 'left'
                  }
                }}
              >
                ایده ها و محصولات قابل اجرا با کارانو
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={6} sm={6} md={3} item>
                  <Image alt={'karano'} src={'/assets/images/landing/ideas/classic-01 12.jpg'} sx={{ borderRadius: '12px', width: 1, height: 1 }} />
                </Grid>
                <Grid xs={6} sm={6} md={3} item>
                  <Stack justifyContent={'space-between'} spacing={2} height={1} width={1}>
                    <Box sx={{ height: "30%", borderRadius: '12px' }}>
                      <Image alt={'karano'} src={'/assets/images/landing/ideas/classic-01 14.jpg'} sx={{ objectFit: 'cover', borderRadius: '12px', height: 1, width: 1 }} />
                    </Box>
                    <Box sx={{ height: "70%", borderRadius: '12px' }}>
                      <Image alt={'karano'} src={'/assets/images/landing/ideas/classic-01 15.jpg'} sx={{ objectFit: 'cover', height: 1, borderRadius: '12px' }} />
                    </Box>
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
                    <IconButton onClick={customizedPopover.onOpen}
                      sx={{
                        color: '#fff',
                        bgcolor: '#0a0a0a70',
                        '& :hover': {
                          bgcolor: '#A9A9A9'
                        },
                        '.svg-color': {
                          '&:hover': {
                            bgcolor: '#fff',
                            outline: '1px solid #727272',
                          }
                        }
                      }}
                    >
                      <SvgColor src='/assets/icons/home/point.svg'
                        color={'#fff'}
                      />
                    </IconButton>
                    <CustomPopover
                      open={customizedPopover.open}
                      onClose={customizedPopover.onClose}
                      arrow={'bottom-left'}
                      hiddenArrow
                      sx={{
                        bgcolor: '#fff'
                      }}
                    >
                      <Box sx={{ p: '16px', minWidth: 306 }}>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Label variant='filled' color='red' size='large'>جدید</Label>
                          <IconButton>
                            <SvgColor src='/assets/icons/home/arrow-narrow-left.svg' />
                          </IconButton>
                        </Stack>
                        <Typography variant="title3" sx={{ color: '#2B2B2B' }} mt={'8px'} gutterBottom>
                          نام محصول
                        </Typography>
                        <Typography variant="title3" sx={{ color: '#2B2B2B' }}>
                          کد محصول
                        </Typography>
                        <Typography variant="body4" sx={{ color: '#2B2B2B' }} mt={'4px'} pb={'2px'} borderBottom={'1px solid #E0E0E0'}>
                          کتگوری اصلی محصول
                        </Typography>
                        <Typography variant="title3" sx={{ color: '#2B2B2B' }} mt={'16px'}>
                          قابل ثبت به صورت سفارشی
                        </Typography>
                      </Box>
                    </CustomPopover>
                  </Box>
                  <Image alt={'karano'} src={'/assets/images/landing/ideas/image 227.jpg'} sx={{ borderRadius: '12px', width: 1, height: 1 }} />
                </Grid>
              </Grid>
            </Box>
            {/* </m.div> */}

            <HomeOrderWithKarano />

            <Box>
              <CarouselProducts data={_carouselsExample.slice(0, 8)} label='!پرفروش ها' />
            </Box>

            <Grid container spacing={5}>
              <Grid item sm={12} md={3}>
                <Typography variant='heading3'>
                  آنچه شما ساخته اید
                </Typography>
                <Typography sx={{ pt: '8px' }} variant='body2'>
                  مشاهده محصولات ساخته  شده به وسیله پروفیل‌های کارنو!
                  برای دیده‌ شدن آنچه شما مشتریان عزیز کارانو ساخته‌اید، می‌توانید تصاویر خود را برای ما در این بخش بارگذاری کنید.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box sx={{ direction: 'ltr' }}>
                  <CarouselBasic2 data={_carouselsExample.slice(4, 8)} />
                </Box>
              </Grid>
            </Grid>

            <Box>
              <Grid container spacing={5}>
                <Grid item md={5}>
                  <Typography variant='heading3' sx={{ pb: 2 }}>داستان کارانو</Typography>
                  <Typography variant='body3' sx={{ pb: 2 }}>
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
      {/* </MainLayout> */}
    </>
  );
}
