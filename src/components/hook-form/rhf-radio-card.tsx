import { Controller, useFormContext } from 'react-hook-form';

import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import { Box, Stack, SxProps, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = RadioGroupProps & {
    name: string;
    options: { label: string; value: any, text?: string }[];
    label?: string;
    spacing?: number;
    helperText?: React.ReactNode;
    BSx?: SxProps
};

export default function RHFRadioGroupCard({
    row,
    name,
    label,
    options,
    spacing,
    helperText,
    BSx,
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
                        <Stack direction={'row'} spacing={1}>
                            {options.map((option, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        border: '2px solid #D1D1D1',
                                        borderRadius: '16px', mb: 2, py: 0.5, pl: 2, pr: 4,
                                        ...BSx
                                    }}
                                >
                                    <Stack direction={'row'}>
                                        <FormControlLabel
                                            key={option.value}
                                            value={option.value}
                                            control={<Radio sx={{
                                                p: '4px',
                                                '&::after': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    left: '3px',
                                                    right: '3px',
                                                    top: '3px',
                                                    bottom: '6px',
                                                    background: 'white',
                                                    borderRadius: '50%',
                                                    width: '6px',
                                                    height: '6px'
                                                },
                                            }} />}
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
                                            }}
                                        />
                                        <Typography sx={{ pt: 0.5 }} variant='body2'>{option.label}</Typography>
                                    </Stack>
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
