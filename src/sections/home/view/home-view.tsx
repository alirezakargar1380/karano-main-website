'use client';

import { useScroll } from 'framer-motion';

import Box from '@mui/material/Box';

import MainLayout from 'src/layouts/main';

import ScrollProgress from 'src/components/scroll-progress';

import Image from 'src/components/image';
import { Container, Grid, IconButton, Link, makeStyles, Popover, Stack, Typography } from '@mui/material';
import { _carouselsExample } from 'src/sections/_examples/extra/carousel-view';
import CarouselBasic1 from 'src/sections/_examples/extra/carousel-view/carousel-basic-1';
import { useCallback, useEffect, useRef, useState } from 'react';
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
import { Theme } from '@mui/material/styles';
import { useGetCategoryProducts } from 'src/api/category';
import { useGetLandingSettings } from 'src/api/settings';
import { useGetLandingIdeaImages, useGetLandingIdeaPoints } from 'src/api/landing';
import { EIdeaSections } from 'src/types/idea';
import HomeIdeaPoints from '../home-idea-points';

// ----------------------------------------------------------------------

export default function HomeView() {
  const { show, title, text, color, notification_id, onShowPopover, onHideDialog } = useOrderContext();

  const { idea } = useGetLandingIdeaImages();
  const { points } = useGetLandingIdeaPoints();

  const { settings } = useGetLandingSettings();

  const router = useRouter();

  const confirm = useBoolean();

  const mdUp = useResponsive('up', 'md');

  const { scrollY, scrollYProgress } = useScroll();

  const [percent, setPercent] = useState(0);

  const customizedPopover = usePopover();
  const hover = useBoolean();
  const [openedPopover, setOpenedPopover] = useState(false)
  const popoverAnchor = useRef(null);

  const popoverEnter = () => {
    setOpenedPopover(true)
  };

  const { products } = useGetCategoryProducts(settings?.most_sale_category?.id);

  const popoverLeave = () => {
    setOpenedPopover(false)
  };

  const [openedPopovers, setOpenedPopovers] = useState<boolean[]>([]);
  const popoverAnchors = useRef<(HTMLElement | null)[]>([]);

  const handlePopoverEnter = (index: number) => {
    const newOpenedPopovers = [...openedPopovers];
    newOpenedPopovers[index] = true;
    setOpenedPopovers(newOpenedPopovers);
  };

  const handlePopoverLeave = (index: number) => {
    const newOpenedPopovers = [...openedPopovers];
    newOpenedPopovers[index] = false;
    setOpenedPopovers(newOpenedPopovers);
  };


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
            <Typography sx={{ width: 1, color: "#fff", py: 5 }} variant='heading2'>
              کارانو، راه‌حل‌های کارامد در صنعت چوب
            </Typography>
            <Grid
              container
              sx={{ py: 8, height: 1 }}
              spacing={!mdUp ? 6 : 0}
            >

              <Grid item md={3} sm={12} xs={12} borderRight={mdUp ? '1px solid #fff' : ''}>
                <Box width={!mdUp ? 'fit-content' : 1} height={1} sx={{ mx: 'auto' }} borderBottom={!mdUp ? '1px solid #fff' : ''}>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                    <Typography variant='superHeading2'>
                      <Counter end={88} />
                    </Typography>
                    <Typography variant='superHeading1'>
                      +
                    </Typography>
                  </Stack>
                  <Typography sx={{ pb: 3 }} variant='title1'>سال تجربه و قدمت</Typography>
                </Box>
              </Grid>

              <Grid item md={3} sm={12} xs={12} borderRight={mdUp ? '1px solid #fff' : ''}>
                <Box width={!mdUp ? 'fit-content' : 1} sx={{ mx: 'auto' }} borderBottom={!mdUp ? '1px solid #fff' : ''}>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                    <Typography variant='superHeading2'>
                      <Counter end={88} />
                    </Typography>
                    <Typography variant='superHeading1'>
                      +
                    </Typography>
                  </Stack>
                  <Typography sx={{ pb: 3 }} variant='title1'>سال تجربه و قدمت</Typography>
                </Box>
              </Grid>

              <Grid item md={3} sm={12} xs={12} borderRight={mdUp ? '1px solid #fff' : ''}>
                <Box width={!mdUp ? 'fit-content' : 1} sx={{ mx: 'auto' }} borderBottom={!mdUp ? '1px solid #fff' : ''}>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                    <Typography variant='superHeading2'>
                      <Counter end={88} />
                    </Typography>
                    <Typography variant='superHeading1'>
                      +
                    </Typography>
                  </Stack>
                  <Typography sx={{ pb: 3 }} variant='title1'>سال تجربه و قدمت</Typography>
                </Box>
              </Grid>

              <Grid item md={3} sm={12} xs={12}>
                <Box width={!mdUp ? 'fit-content' : 1} sx={{ mx: 'auto' }} borderBottom={!mdUp ? '1px solid #fff' : ''}>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                    <Typography variant='superHeading2'>
                      <Counter end={88} />
                    </Typography>
                    <Typography variant='superHeading1'>
                      +
                    </Typography>
                  </Stack>
                  <Typography sx={{ pb: 3 }} variant='title1'>سال تجربه و قدمت</Typography>
                </Box>
              </Grid>

            </Grid>
          </Container>
        </Box>
      </m.div>

      <MainLayout header={false}>
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
                <HomeIdeaPoints location={EIdeaSections.right} points={points} />
                <Image alt={'karano'} src={endpoints.landing.idea_images.get_image(idea.find((i) => i.location == EIdeaSections.right)?.image_name || '')} sx={{ borderRadius: '12px', width: 1, height: 1 }} />
              </Grid>
              <Grid xs={6} sm={6} md={3} item>
                <Stack justifyContent={'space-between'} spacing={2} height={1} width={1}>
                  <Box sx={{ height: "30%", borderRadius: '12px' }}>
                    <Image alt={'karano'} src={endpoints.landing.idea_images.get_image(idea.find((i) => i.location == EIdeaSections.centerTop)?.image_name || '')} sx={{ objectFit: 'cover', borderRadius: '12px', height: 1, width: 1 }} />
                  </Box>
                  <Box sx={{ height: "70%", borderRadius: '12px' }}>
                    <Image alt={'karano'} src={endpoints.landing.idea_images.get_image(idea.find((i) => i.location == EIdeaSections.centerBottom)?.image_name || '')} sx={{ objectFit: 'cover', height: 1, borderRadius: '12px' }} />
                  </Box>
                </Stack>
              </Grid>
              <Grid xs={12} sm={12} md={6} item>
                {points.filter((p) => p.location == EIdeaSections.left)?.map((point, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 24,
                      height: 24,
                      position: 'absolute',
                      zIndex: 1,
                      ml: `${point.margin_right}px`,
                      mt: `${point.margin_top}px`
                    }}
                  >
                    <IconButton
                      // ref={popoverAnchor}
                      // onMouseEnter={popoverEnter}
                      // onMouseLeave={popoverLeave}
                      ref={el => popoverAnchors.current[index] = el}
                      onMouseEnter={() => handlePopoverEnter(index)}
                      onMouseLeave={() => handlePopoverLeave(index)}
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
                    <Popover
                      open={openedPopovers[index]}
                      anchorEl={popoverAnchors.current[index]}
                      // open={openedPopover}
                      // anchorEl={popoverAnchor.current}
                      closeAfterTransition={true}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      slotProps={{
                        paper: {
                          onMouseEnter: () => handlePopoverEnter(index),
                          onMouseLeave: () => handlePopoverLeave(index),
                          // onMouseEnter: popoverEnter,
                          // onMouseLeave: popoverLeave,
                          sx: {
                            mr: 1,
                            p: 0,
                            pointerEvents: 'auto',
                          }
                        }
                      }}
                      disableRestoreFocus
                      sx={{
                        '&.MuiModal-root': {
                          zIndex: 100
                        },
                        pointerEvents: 'none',
                      }}
                    >
                      <Link href={'/'} sx={{ textDecoration: 'none' }}>
                        <Box sx={{ p: '16px', minWidth: 306, bgcolor: '#fff' }}>
                          <Stack direction={'row'} justifyContent={'space-between'}>
                            <Label variant='filled' color='red' size='large'>جدید</Label>
                            <IconButton>
                              <SvgColor src='/assets/icons/home/arrow-narrow-left.svg' />
                            </IconButton>
                          </Stack>
                          <Typography variant="title3" sx={{ color: '#2B2B2B' }} mt={'8px'} gutterBottom>
                            {point?.product?.name}
                          </Typography>
                          <Typography variant="title3" sx={{ color: '#2B2B2B' }}>
                            {point?.product?.code?.code}
                          </Typography>
                          <Typography variant="body4" sx={{ color: '#2B2B2B' }} mt={'4px'} pb={'2px'} borderBottom={'1px solid #E0E0E0'}>
                            {point?.product?.category?.name}
                          </Typography>
                          <Typography variant="title3" sx={{ color: '#2B2B2B' }} mt={'16px'}>
                            قابل ثبت به صورت سفارشی
                          </Typography>
                        </Box>
                      </Link>
                    </Popover>
                  </Box>
                ))}
                <Image alt={'karano'} src={endpoints.landing.idea_images.get_image(idea.find((i) => i.location == EIdeaSections.left)?.image_name || '')} sx={{ borderRadius: '12px', width: 1, height: 1 }} />
              </Grid>
            </Grid>
          </Box>
          {/* </m.div> */}

          <HomeOrderWithKarano />

          <Box>
            <CarouselProducts data={products} label='!پرفروش ها' />
          </Box>

          <Box borderTop={'1px solid #D1D1D1'} pt={14}>
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
          </Box>


          <Box borderTop={'1px solid #D1D1D1'} pt={14}>
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
      </MainLayout >
    </>
  );
}
