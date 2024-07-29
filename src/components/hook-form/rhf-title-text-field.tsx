import { Controller, useFormContext } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  custom_label: string;
};

export default function RHFTitleTextField({ name, custom_label, helperText, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Box sx={{ width: 1 }}>
      <Typography fontFamily={'peyda-bold'} sx={{ pb: 0.5, pl: 0.75 }} variant='body2'>{custom_label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
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
            helperText={error ? error?.message : helperText}
            {...other}
          />
        )}
      />
    </Box>
  );
}
