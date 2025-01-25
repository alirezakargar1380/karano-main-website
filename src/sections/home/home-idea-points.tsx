import { Box, IconButton, Link, Popover, Stack, Typography } from "@mui/material";
import { EIdeaSections, IdeaPoints } from "src/types/idea";
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useRef, useState } from "react";
import SvgColor from "src/components/svg-color";
import Label from "src/components/label";

interface Props {
    location: EIdeaSections
    points: IdeaPoints[]
}

export default function HomeIdeaPoints({ location, points }: Props) {

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

    return (
        <>
            {points.filter((p) => p.location == location)?.map((point, index) => (
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
        </>
    )
}