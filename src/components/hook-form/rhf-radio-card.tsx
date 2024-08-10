import { Controller, useFormContext } from 'react-hook-form';

import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import { Box, Divider, MenuItem, Stack, SxProps, Typography, TypographyOwnProps, TypographyPropsVariantOverrides, TypographyVariant } from '@mui/material';
import SvgColor from '../svg-color';
import RHFTextField from './rhf-text-field';
import { RHFSelect } from './rhf-select';

// ----------------------------------------------------------------------

type Props = RadioGroupProps & {
    name: string;
    options: {
        label: string
        value: any
        text?: string
        icon?: string
        children?: {
            name: string
            lable: string
            options: {
                value: string
                label: string
            }[]
        }[]
    }[];
    label?: string;
    spacing?: number;
    helperText?: React.ReactNode;
    BSx?: SxProps
    RadioSx?: SxProps
    variant?: TypographyVariant
};

export default function RHFRadioGroupCard({
    row,
    name,
    label,
    options,
    spacing,
    helperText,
    BSx,
    RadioSx,
    variant = 'h6',
    ...other
}: Props) {
    const { control } = useFormContext();

    const labelledby = label ? `${name}-${label}` : '';

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                    {label && (
                        <FormLabel component="legend" id={labelledby} sx={{ typography: 'body2' }}>
                            {label}
                        </FormLabel>
                    )}
                    <RadioGroup {...field} aria-labelledby={labelledby} row={row} {...other}>
                        <Stack direction={row ? 'row' : 'column'} spacing={2}>
                            {options.map((option, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        border: '1px solid #D1D1D1',
                                        borderRadius: '16px',
                                        mb: 2, py: 0.5, pl: 2, pr: 2,
                                        ...BSx,
                                        ...(field.value === option.value) && {
                                            border: '1px solid #D1D1D1',
                                        },
                                        ...(field.value === option.value && option.children?.length) && {
                                            border: '1px solid #D1D1D1',
                                            bgcolor: '#F8F8F8'
                                        }
                                    }}
                                >
                                    <Stack direction={'row'}>
                                        <FormControlLabel
                                            key={option.value}
                                            value={option.value}
                                            control={
                                                <Radio
                                                    sx={{
                                                        ...RadioSx
                                                    }}
                                                    size='small'
                                                />
                                            }
                                            label={''}
                                            sx={{
                                                '&:not(:last-of-type)': {
                                                    mb: spacing || 0,
                                                },
                                                ...(row && {
                                                    mr: 0,
                                                    '&:not(:last-of-type)': {
                                                        mr: spacing || 2,
                                                    },
                                                }),
                                                mr: 0.5
                                            }}
                                        />
                                        {(option.icon) && (
                                            <SvgColor src={option.icon} sx={{ mt: 0.7, mr: 1, color: "#727272" }} />
                                        )}
                                        <Typography sx={{ pt: 0.5, color: "#2B2B2B" }} variant={variant} fontFamily={'peyda-bold'}>{option.label}</Typography>
                                    </Stack>

                                    {(field.value === option.value && option.children?.length) && (
                                        <>
                                            <Divider sx={{ borderColor: '#D1D1D1', my: 2 }} />

                                            <Stack direction={'row'} sx={{ width: 1, mb: 2 }} justifyContent={'space-between'} spacing={1}>
                                                {option.children.map((option, index) => (
                                                    <Box sx={{ width: 0.5 }} key={index}>
                                                        <Typography variant='h6'>{option.lable}</Typography>
                                                        <RHFSelect name={option.name} sx={{
                                                            width: 1,
                                                            bgcolor: 'white',
                                                            borderRadius: 1,
                                                        }} variant='outlined' size='small' placeholder='انتخاب کنید'>
                                                            {option.options.map((item, ind) => (
                                                                <MenuItem value={item.value} key={ind}>{item.label}</MenuItem>
                                                            ))}
                                                        </RHFSelect>
                                                    </Box>
                                                ))}
                                            </Stack>
                                        </>
                                    )}


                                    {option.text && (
                                        <Typography sx={{ pt: 1 }} fontFamily={'peyda-regular'}>
                                            با انتخاب این گزینه شما بهای تمام کالاهای مورد نظر را باید پرداخت ‌کنید و برای تحویل آن‌ها زمان بیشتری را منتظر خواهید ‌ماند تا کالاهای ناموجود توسط کارانو، موجود شوند.
                                        </Typography>
                                    )}
                                </Box>
                            ))}
                        </Stack>
                    </RadioGroup>

                    {(!!error || helperText) && (
                        <FormHelperText error={!!error} sx={{ mx: 0 }}>
                            {error ? error?.message : helperText}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
}
