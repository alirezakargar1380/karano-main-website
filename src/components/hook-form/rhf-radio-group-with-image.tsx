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
  FSx?: SxProps;
  disabled?: boolean | undefined
};

export default function RHFRadioGroup({
  row,
  name,
  label,
  options,
  spacing,
  helperText,
  FSx,
  disabled,
  ...other
}: Props) {
  const { control } = useFormContext();

  const labelledby = label ? `${name}-${label}` : '';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset" sx={{ width: 1 }}>
          {label && (
            <FormLabel component="legend" id={labelledby} sx={{ typography: 'body2' }}>
              {label}
            </FormLabel>
          )}

          <RadioGroup {...field} aria-labelledby={labelledby} row={row} {...other}>
            {/* <Stack
              columnGap={12}
              rowGap={0}
              display="grid"
              justifyItems={'center'}
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(1, 1fr)',
                lg: 'repeat(2, 1fr)',
              }}
              > */}
            {options.map((option, index) => (
              <Box sx={{ display: 'flex', justifyContent: 'normal' }} key={option.value}>
                <FormControlLabel
                  value={option.value}
                  disabled={disabled}
                  control={<Radio disabled={disabled} />}
                  label={''}
                  sx={{
                    '&:not(:last-of-type)': {
                      mb: spacing || 0,
                    },
                    ...(row && {
                      mr: 0,
                      ml: 0,
                    }),
                    ...FSx
                  }}
                />
                <Avatar src={option.src}
                  sx={{
                    ...(disabled && {
                      opacity: 0.5
                    })
                  }}
                />
                <Typography variant="body2" sx={{
                  fontFamily: 'peyda-regular',
                  pt: 1,
                  pl: 1,
                  ...(disabled && {
                    color: '#D1D1D1'
                  })
                }}>
                  {option.label}
                </Typography>
              </Box>
            ))}
            {/* </Stack> */}

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
