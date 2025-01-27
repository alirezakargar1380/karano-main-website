import React from "react";
import { Box, Typography, Grid, useMediaQuery, SvgIcon, Divider } from "@mui/material";
import { styled } from "@mui/system";

const steps = [
    {
        id: 1,
        title: "۱.  انتخاب کالا",
        description:
            "کالایی که مد نظر دارید رو از لیست دسته بندی کالا انتخاب کنید.",
        icon: (
            <SvgIcon sx={{
                fontSize: 'inherit'
            }}>
                <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2.5" y="16" width="17" height="17" rx="8.5" fill="#FE9E9E" />
                    <path d="M4.5 7.33301H6.24155C6.56958 7.33301 6.73359 7.33301 6.86558 7.39333C6.98189 7.44648 7.08046 7.53197 7.14953 7.6396C7.22791 7.76173 7.25111 7.9241 7.2975 8.24883L7.92857 12.6663M7.92857 12.6663L9.33109 22.9749C9.50907 24.283 9.59807 24.9371 9.9108 25.4295C10.1864 25.8633 10.5814 26.2083 11.0485 26.4228C11.5785 26.6663 12.2386 26.6663 13.5588 26.6663H24.9693C26.2261 26.6663 26.8544 26.6663 27.3679 26.4402C27.8207 26.2409 28.2091 25.9195 28.4897 25.512C28.8079 25.0498 28.9255 24.4326 29.1606 23.198L30.9255 13.9326C31.0082 13.4981 31.0496 13.2808 30.9896 13.111C30.937 12.962 30.8332 12.8366 30.6967 12.757C30.5411 12.6663 30.32 12.6663 29.8776 12.6663H7.92857ZM15.1667 32.6663C15.1667 33.4027 14.5697 33.9997 13.8333 33.9997C13.097 33.9997 12.5 33.4027 12.5 32.6663C12.5 31.93 13.097 31.333 13.8333 31.333C14.5697 31.333 15.1667 31.93 15.1667 32.6663ZM25.8333 32.6663C25.8333 33.4027 25.2364 33.9997 24.5 33.9997C23.7636 33.9997 23.1667 33.4027 23.1667 32.6663C23.1667 31.93 23.7636 31.333 24.5 31.333C25.2364 31.333 25.8333 31.93 25.8333 32.6663Z" stroke="#2B2B2B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M29.8327 19.3333C33.5146 19.3333 36.4993 16.3486 36.4993 12.6667C36.4993 8.98477 33.5146 6 29.8327 6C26.1508 6 23.166 8.98477 23.166 12.6667C23.166 16.3486 26.1508 19.3333 29.8327 19.3333Z" fill="white" />
                    <path d="M29.8327 9.16663V12.6667V16.1667M26.3326 12.6667H33.3327M36.4993 12.6667C36.4993 16.3486 33.5146 19.3333 29.8327 19.3333C26.1508 19.3333 23.166 16.3486 23.166 12.6667C23.166 8.98477 26.1508 6 29.8327 6C33.5146 6 36.4993 8.98477 36.4993 12.6667Z" stroke="#2B2B2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </SvgIcon>
        ),
        top: '400px'
    },
    {
        id: 2,
        title: "۲. ارسال برای واحد فروش",
        description:
            "کالایی که مد نظر دارید رو از لیست دسته بندی کالا انتخاب کنید.",
        icon: (
            <SvgIcon sx={{
                fontSize: 'inherit'
            }}>
                <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5.5" y="24" width="30" height="16" rx="8" fill="#FE9E9E" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.7 5.13333H17.3C11.409 5.13333 6.63333 9.90896 6.63333 15.8V22.2C6.63333 28.091 11.409 32.8667 17.3 32.8667H23.7C29.591 32.8667 34.3667 28.091 34.3667 22.2V15.8C34.3667 9.90896 29.591 5.13333 23.7 5.13333ZM17.3 3C10.2308 3 4.5 8.73075 4.5 15.8V22.2C4.5 29.2692 10.2308 35 17.3 35H23.7C30.7692 35 36.5 29.2692 36.5 22.2V15.8C36.5 8.73076 30.7692 3 23.7 3H17.3Z" fill="#282B2F" />
                    <path d="M34.9565 16.3328H30.6649C29.0708 16.3328 27.7178 15.1638 27.4865 13.5866L27.0059 10.3096" stroke="#282B2F" stroke-width="2.13333" />
                    <path d="M20.5 4.28678V10.31V13.1209C20.5 14.895 21.9382 16.3333 23.7124 16.3333H24.103C26.0303 16.3333 27.5238 14.648 27.2921 12.7347L26.6979 7.82845L26.1829 4.10938" stroke="#282B2F" stroke-width="2.13333" />
                    <path d="M6.04347 16.3328H10.3351C11.9292 16.3328 13.2822 15.1638 13.5135 13.5866L13.9941 10.3096" stroke="#282B2F" stroke-width="2.13333" />
                    <path d="M20.5 3.57617V10.3123V13.1232C20.5 14.8973 19.0618 16.3356 17.2876 16.3356H16.897C14.9697 16.3356 13.4762 14.6503 13.7079 12.737L14.3021 7.83076L14.8171 4.11169" stroke="#282B2F" stroke-width="2.13333" />
                    <circle cx="20.656" cy="23.2917" r="2.82872" stroke="#282B2F" stroke-width="1.85769" />
                    <path d="M15.6769 32.4155C15.6769 30.5567 17.1837 29.0499 19.0424 29.0499H22.2632C24.1219 29.0499 25.6287 30.5567 25.6287 32.4155C25.6287 33.0883 25.0832 33.6338 24.4104 33.6338H16.8952C16.2224 33.6338 15.6769 33.0883 15.6769 32.4155Z" stroke="#282B2F" stroke-width="1.85769" />
                </svg>
            </SvgIcon>
        ),
        top: '320px'
    },
    {
        id: 3,
        title: "۳.  تایید توسط واحد فروش",
        description:
            "کالایی که مد نظر دارید رو از لیست دسته بندی کالا انتخاب کنید.",
        icon: (
            <SvgIcon sx={{
                fontSize: 'inherit'
            }}>
                <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="23.5" y="3.78711" width="18.0025" height="18.0025" rx="9.00127" transform="rotate(90 23.5 3.78711)" fill="#FE9E9E" />
                    <path d="M33.1467 20.2879V15.2817C33.1467 13.0084 33.1467 11.8717 32.7043 11.0034C32.3151 10.2397 31.6941 9.61869 30.9304 9.22953C30.0621 8.78711 28.9254 8.78711 26.6521 8.78711H17.9926C15.7193 8.78711 14.5827 8.78711 13.7144 9.22953C12.9506 9.61869 12.3296 10.2397 11.9405 11.0034C11.498 11.8717 11.498 13.0084 11.498 15.2817V29.3533C11.498 31.6266 11.498 32.7633 11.9405 33.6316C12.3296 34.3954 12.9506 35.0163 13.7144 35.4055C14.5827 35.8479 15.7193 35.8479 17.9926 35.8479H22.3224M25.0284 20.9645H16.9102M19.6163 26.3766H16.9102M27.7345 15.5523H16.9102M30.4406 34.4949V26.3766M26.3815 30.4357H34.4997" stroke="#2B2B2B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </SvgIcon>
        ),
        top: '60px'
    },
];

const ResponsiveSteps = () => {
    const isMobile = false;

    return (
        <Box>
            <Divider />
            <Typography variant='heading3' sx={{ pt: '64px' }}>سفارش به سبک کارانو</Typography>
            <Box
                sx={{
                    position: "relative",
                    padding: "2rem",
                    display: "flex",
                    height: {
                        xs: 'auto',
                        lg: '400px'
                    },
                    flexDirection: {
                        xs: "column",
                        lg: "row",
                    },
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                {/* Steps */}
                {steps.map((step) => (
                    <Box key={step.id}>
                        <Box
                            sx={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                background: "transparent",
                                zIndex: 1,
                                padding: "1rem",
                                marginTop: {
                                    xs: '0',
                                    lg: step.top
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    fontSize: "3rem",
                                    zIndex: 1,
                                }}
                            >
                                {step.icon}
                            </Box>
                            <Typography variant="h6" gutterBottom>
                                {step.title}
                            </Typography>
                            <Typography variant="body2" sx={{ maxWidth: "200px" }}>
                                {step.description}
                            </Typography>
                        </Box>
                        {(step.id == 1) && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: '35%',
                                    right: '18%',
                                    width: '100%',
                                    height: 'auto',
                                    display: { xs: 'none', lg: 'block' },
                                    zIndex: 0,
                                    textAlign: 'end'
                                }}
                            >
                                <SvgIcon sx={{
                                    width: '100%',
                                    height: 'auto',
                                    maxWidth: '409px',
                                    fontSize: 'inherit',
                                    marginTop: '10px',
                                }}>
                                    <svg width="409" height="184" viewBox="0 0 409 184" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.5" filter="url(#filter0_d_3652_114532)">
                                            <path d="M399.093 164.693C322.561 178.99 300.081 133.248 236.38 77.8788C156.753 8.66755 56.9318 0.305745 10.0911 14.1523" stroke="#FE9E9E" stroke-width="6" />
                                        </g>
                                        <defs>
                                            <filter id="filter0_d_3652_114532" x="0.240723" y="0.533447" width="408.403" height="182.805" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                <feOffset dy="4" />
                                                <feGaussianBlur stdDeviation="4.5" />
                                                <feComposite in2="hardAlpha" operator="out" />
                                                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.280833 0 0 0 0 0.280833 0 0 0 0.24 0" />
                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3652_114532" />
                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3652_114532" result="shape" />
                                            </filter>
                                        </defs>
                                    </svg>
                                </SvgIcon>
                            </Box>
                        )}
                        {(step.id == 2) && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: '55%',
                                    left: '19%',
                                    height: 'auto',
                                    display: { xs: 'none', lg: 'block' },
                                    zIndex: 0,
                                    textAlign: 'left'
                                }}
                            >
                                <SvgIcon sx={{
                                    width: '100%',
                                    height: 'auto',
                                    maxWidth: '409px',
                                    fontSize: 'inherit',
                                    marginTop: '10px',
                                }}>
                                    <svg width="409" height="159" viewBox="0 0 409 159" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g filter="url(#filter0_d_3652_114531)">
                                            <path d="M398.001 139.5C382.782 147.761 325.818 138.639 274.145 86.6195C209.555 21.5951 130.291 -30.706 11.3022 48.4165" stroke="#FFCFCF" stroke-width="6" />
                                        </g>
                                        <defs>
                                            <filter id="filter0_d_3652_114531" x="0.640991" y="0.522705" width="407.791" height="157.646" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                <feOffset dy="4" />
                                                <feGaussianBlur stdDeviation="4.5" />
                                                <feComposite in2="hardAlpha" operator="out" />
                                                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.280833 0 0 0 0 0.280833 0 0 0 0.24 0" />
                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3652_114531" />
                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3652_114531" result="shape" />
                                            </filter>
                                        </defs>
                                    </svg>
                                </SvgIcon>
                            </Box>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ResponsiveSteps;