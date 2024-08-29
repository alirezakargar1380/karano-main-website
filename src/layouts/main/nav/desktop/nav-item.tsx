import { color, m } from 'framer-motion';
import { forwardRef, use, useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Link, { LinkProps } from '@mui/material/Link';
import CardActionArea from '@mui/material/CardActionArea';
import ListItemButton from '@mui/material/ListItemButton';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';

import { NavItemProps, NavItemStateProps } from '../types';
import { Badge, Typography } from '@mui/material';
import { OrderTrackingPopover } from 'src/components/custom-popover';
import { usePopover } from 'src/components/custom-popover';
import { StyledRoundedWhiteButton } from 'src/components/styles/props/rounded-white-button';
import { useGetRejectedOrdersReport } from 'src/api/orders';
import { useShowOneTime } from 'src/hooks/use-show-one-time';
import { useOrderContext } from 'src/sections/order/context/order-context';

// ----------------------------------------------------------------------

export const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  ({ title, path, open, badge, active, hasChild, externalLink, subItem, ...other }, ref) => {
    const { show, showPopover, onHidePopover } = useOrderContext();

    const customizedPopover = usePopover();
    const refPop = useRef(null);

    useEffect(() => {
      if (badge && refPop && showPopover && !show)
        customizedPopover.onOpen({ currentTarget: refPop.current } as any);
    }, [showPopover, show]);


    const renderContent = (
      <Box sx={{
        // height: '100%'
        my: 'auto',
      }}>
        <StyledNavItem
          disableRipple
          disableTouchRipple
          ref={ref}
          open={open}
          active={active}
          subItem={subItem}
          {...other}
        >
          <Box ref={refPop}>
            {(badge && !active)? (
              <Badge
                sx={{
                  "& .MuiBadge-badge": {
                    color: "lightgreen",
                    backgroundColor: "#D12215",
                    mr: 2
                  }
                }}
                variant='dot'
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                {title}
              </Badge>
            ) : (<>{title}</>)}
          </Box>
          {hasChild && <Iconify width={16} icon="eva:arrow-ios-downward-fill" sx={{ ml: 1 }} />}
        </StyledNavItem>

        <OrderTrackingPopover
          open={customizedPopover.open}
          onClose={() => {
            customizedPopover.onClose();
          }}
          arrow={'top-left'}
          // anchorOrigin={{
          //   horizontal: 'left',
          //   vertical: 'bottom',
          // }}
          transformOrigin={{
            horizontal: 'center',
            vertical: 'top',
          }}
          sx={{
            mt: 5,
            width: '304px'
          }}
        >
          <Box sx={{ p: 2, width: 1 }}>
            <Typography fontFamily={'peyda-bold'} fontSize={16} borderBottom={'1px solid #f8f8f8'} pb={'16px'}>
              سفارش رد شده
            </Typography>
            <Typography fontFamily={'peyda-regular'} mt={'16px'} fontSize={12}>
              {`سفارش شما با کد {۱۲۳۴۵۶}  توسط مدیر فروش ردشده است. می‌توانید از طریق منوی «پیگیری سفارش»، وضعیت سفارش‌ ردشده خود را پیگیری کنید.`}
            </Typography>
            <Box textAlign={'right'}>
              <StyledRoundedWhiteButton variant='contained'
                sx={{
                  color: "#000", mt: 2,
                  "&:hover": {
                    bgcolor: "#D1D1D1"
                  }
                }}
                onClick={() => {
                  customizedPopover.onClose();
                  onHidePopover()
                }}
              >
                متوجه شدم
              </StyledRoundedWhiteButton>
            </Box>
          </Box>
        </OrderTrackingPopover>
      </Box>
    );

    return (
      <>
        {(badge && showPopover === true) ? (
          <>{renderContent}</>
        ) : (
          <Link component={RouterLink} href={path} color="inherit" underline="none" sx={{ height: 'fit-content', my: 'auto' }}>
            {renderContent}
          </Link>
        )}
      </>
    );
  }
);

// ----------------------------------------------------------------------

const StyledNavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'subItem',
})<NavItemStateProps>(({ open, active, subItem, theme }) => {
  const opened = open && !active;

  return {
    // Root item
    ...(!subItem && {
      ...theme.typography.body2,
      px: 12,
      py: 6,
      height: '30px',
      borderRadius: '12px',
      fontWeight: theme.typography.fontWeightMedium,
      transition: theme.transitions.create(['all'], {
        duration: theme.transitions.duration.shorter,
      }),
      '&:hover': {
        opacity: 1,
        backgroundColor: '#f2f2f2',
        color: '#000'
      },
      ...(active && {
        // color: theme.palette.primary.main,
        color: "#000",
        fontWeight: theme.typography.fontWeightSemiBold,
        backgroundColor: '#F2F2F2',
        border: '2px solid #000'
      }),
      ...(opened && {
        opacity: 0.64,
      }),
    }),

    // // Sub item
    // ...(subItem && {
    //   ...theme.typography.body2,
    //   padding: 0,
    //   fontSize: 13,
    //   color: theme.palette.text.secondary,
    //   fontWeight: theme.typography.fontWeightMedium,
    //   transition: theme.transitions.create(['all'], {
    //     duration: theme.transitions.duration.shorter,
    //   }),
    //   '&:hover': {
    //     backgroundColor: 'transparent',
    //     color: theme.palette.text.primary,
    //   },
    //   ...(active && {
    //     color: theme.palette.text.primary,
    //     fontWeight: theme.typography.fontWeightSemiBold,
    //   }),
    // }),
  };
});

// ----------------------------------------------------------------------

type NavItemDashboardProps = LinkProps & {
  path: string;
};

export function NavItemDashboard({ path, sx, ...other }: NavItemDashboardProps) {
  return (
    <Link component={RouterLink} href={path} sx={{ width: 1, height: 1 }} {...other}>
      <CardActionArea
        sx={{
          height: 1,
          minHeight: 320,
          borderRadius: 1.5,
          color: 'text.disabled',
          bgcolor: 'background.neutral',
          px: { md: 3, lg: 10 },
          ...sx,
        }}
      >
        <m.div
          whileTap="tap"
          whileHover="hover"
          variants={{
            hover: { scale: 1.02 },
            tap: { scale: 0.98 },
          }}
        >
          <Box
            component="img"
            alt="illustration_dashboard"
            src="/assets/illustrations/illustration_dashboard.png"
          />
        </m.div>
      </CardActionArea>
    </Link>
  );
}
