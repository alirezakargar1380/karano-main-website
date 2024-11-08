import { Controller, useFormContext } from 'react-hook-form';

import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import { SxProps } from '@mui/system';
import { Box } from '@mui/material';
import SvgColor from '../svg-color';

// ----------------------------------------------------------------------

type Props = RadioGroupProps & {
  name: string;
  options: { label: string; value: any }[];
  label?: string;
  spacing?: number;
  helperText?: React.ReactNode;
  FSx?: SxProps,
  disabled?: boolean | undefined
  FormControlSx?: SxProps

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
  FormControlSx,
  ...other
}: Props) {
  const { control } = useFormContext();

  const labelledby = label ? `${name}-${label}` : '';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset" sx={{ ...FormControlSx }}>
          {label && (
            <FormLabel component="legend" id={labelledby} sx={{ typography: 'title3' }}>
              {label}
            </FormLabel>
          )}

          <RadioGroup {...field} aria-labelledby={labelledby} row={row} {...other}>
            {options.map((option, index) => (
              <Box key={option.value}>
                <FormControlLabel
                  value={option.value}
                  disabled={disabled}
                  control={<Radio disabled={disabled} sx={{ ml: 0 }} />}
                  label={option.label}
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      typography: 'body2',
                      fontFamily: 'peyda-regular',
                    },
                    '&:not(:last-of-type)': {
                      mb: spacing || 0,
                    },
                    ...(row && {
                      mr: 0,
                      ml: 0,
                      '&:not(:last-of-type)': {
                        // mr: spacing || 2,
                      },
                    }),
                    ml: 0,
                    ...FSx
                  }}
                />
              </Box>
            ))}
          </RadioGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0, typography: 'caption2', mt: '25.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <SvgColor src="/assets/icons/notification/alert-circle.svg" sx={{ width: '16px' }} />
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
