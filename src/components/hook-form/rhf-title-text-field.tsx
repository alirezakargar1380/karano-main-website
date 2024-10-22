import { Controller, useFormContext } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Box, Stack, Typography } from '@mui/material';
import SvgColor from '../svg-color';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  custom_label: string;
};

export default function RHFTitleTextField({ name, custom_label, helperText, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Box sx={{ width: 1 }}>
      <Typography fontFamily={'peyda-bold'} sx={{ mb: '8px', display: 'block' }} variant='body3'>{custom_label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <TextField
              {...field}
              fullWidth
              type={type}
              value={type === 'number' && field.value === 0 ? '' : field.value}
              onChange={(event) => {
                if (type === 'number') {
                  field.onChange(Number(event.target.value));
                } else {
                  field.onChange(event.target.value);
                }
              }}
              error={!!error}
              // helperText={error ? error?.message : helperText}
              {...other}
            />
            {error && (
              <Stack direction={'row'}>
                <SvgColor src='/assets/icons/input/alert-circle.svg' color={'#C80303'} mt={1} />
                <Typography fontFamily={'peyda-regular'} variant='body2' ml={0.5} mt={1}>{error?.message}</Typography>
              </Stack>
            )}
          </>
        )}
      />
    </Box>
  );
}
