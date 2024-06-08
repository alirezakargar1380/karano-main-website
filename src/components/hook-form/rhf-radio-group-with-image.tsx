import { Controller, useFormContext } from 'react-hook-form';

import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import { SxProps } from '@mui/system';
import { Avatar, Box, Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = RadioGroupProps & {
  name: string;
  options: { label: string; src: string; value: any }[];
  label?: string;
  spacing?: number;
  helperText?: React.ReactNode;
  FSx?: SxProps
};

export default function RHFRadioGroup({
  row,
  name,
  label,
  options,
  spacing,
  helperText,
  FSx,
  ...other
}: Props) {
  const { control } = useFormContext();

  const labelledby = label ? `${name}-${label}` : '';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            <FormLabel component="legend" id={labelledby} sx={{ typography: 'body2' }}>
              {label}
            </FormLabel>
          )}

          <RadioGroup {...field} aria-labelledby={labelledby} row={row} {...other}>
            <Stack
              columnGap={12}
              rowGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}>
              {options.map((option) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={''}
                    sx={{
                      '&:not(:last-of-type)': {
                        mb: spacing || 0,
                      },
                      ...(row && {
                        mr: 0,
                        // '&:not(:last-of-type)': {
                        //   mr: spacing || 4,
                        // },
                      }),
                      ...FSx
                    }}
                  />
                  <Avatar src={option.src} />
                  <Typography variant="body2" sx={{ textTransform: 'capitalize', pt: 1, pl: 1 }}>{option.label}</Typography>
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
