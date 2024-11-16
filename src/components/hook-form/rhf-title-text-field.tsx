import { Controller, useFormContext } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Box, Stack, Typography } from '@mui/material';
import SvgColor from '../svg-color';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  custom_label: string;
  lable_caption?: string
};

export default function RHFTitleTextField({ name, custom_label, lable_caption, helperText, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Box sx={{ width: 1 }}>
      <Box display={'flex'} gap={'4px'}>
        <Typography sx={{ mb: '8px', display: 'block' }} variant='body3'>
          {custom_label}
        </Typography>
        {lable_caption && (<Typography variant='body3' color={"#727272"}>{`(${lable_caption})`}</Typography>)}
      </Box>
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
              <Stack direction={'row'} alignItems={'center'}>
                <SvgColor src='/assets/icons/input/alert-circle.svg' color={'#C80303'} />
                <Typography fontFamily={'peyda-regular'} variant='body2' ml={0.5} mt={1}>{error?.message}</Typography>
              </Stack>
            )}
            {helperText && (
              <Stack direction={'row'} alignItems={'center'}>
                <SvgColor src='/assets/icons/input/alert-circle.svg' color={'#727272'} sx={{ width: 20, height: 20, mt:  0.5 }} />
                <Typography variant='caption2' ml={0.5} mt={1}>{helperText}</Typography>
              </Stack>
            )}
          </>
        )}
      />
    </Box>
  );
}
