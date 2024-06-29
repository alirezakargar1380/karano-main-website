import { Controller, useFormContext } from 'react-hook-form';

import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import { Box, Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = RadioGroupProps & {
    name: string;
    options: { label: string; value: any, text?: string }[];
    label?: string;
    spacing?: number;
    helperText?: React.ReactNode;
};

export default function RHFRadioGroupTitleText({
    row,
    name,
    label,
    options,
    spacing,
    helperText,
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
                        {options.map((option) => (
                            <Box sx={{ border: '2px solid #000', borderRadius: '16px', width: 1, mb: 2, p: 2 }} key={option.value}>
                                <Stack direction={'row'} sx={{}}>
                                    <FormControlLabel
                                        value={option.value}
                                        control={<Radio />}
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
                                    <Typography sx={{ pt: 0.5 }} fontFamily={'peyda-bold'} variant='h5'>{option.label}</Typography>
                                </Stack>
                                {option.text && (
                                    <Typography sx={{ pt: 1 }} fontFamily={'peyda-regular'}>
                                        با انتخاب این گزینه شما بهای تمام کالاهای مورد نظر را باید پرداخت ‌کنید و برای تحویل آن‌ها زمان بیشتری را منتظر خواهید ‌ماند تا کالاهای ناموجود توسط کارانو، موجود شوند.
                                    </Typography>
                                )}
                            </Box>
                        ))}
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
