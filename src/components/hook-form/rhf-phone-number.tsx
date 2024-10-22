import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, Box, InputAdornment } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

type RHFPhoneInputProps = {
  name: string;
  helperText?: string;
};

type RHFPhoneInputMultiProps = {
  name: string;
  helperText?: string;
};

export function RHFPhoneInputMulti({ name, helperText }: RHFPhoneInputMultiProps) {
  const { control } = useFormContext();

  const handleChange = (index: number, value: string, onChange: (value: string) => void, currentValue: string) => {
    const newValue = currentValue.split(' ');
    newValue[index] = value.replace(/\D/g, '');
    onChange(newValue.join(' '));

    console.log(newValue.join(''),"-",value);

    // Auto-focus next input
    if ((value.length === (index < 3 ? 3 : 4)) && index < 3) {
      console.log('going to next input');
      const nextInput = document.getElementById(`phone-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    } else if (value.length === 0 && index > 0) {
      console.log('going to prev input');
      const prevInput = document.getElementById(`phone-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        pattern: {
          value: /^\+\d{3} \d{3} \d{3} \d{4}$/,
          message: 'Invalid phone number format'
        }
      }}
      render={({ field, fieldState: { error } }) => (
        <div>
          <Box display="flex" gap={1} sx={{ direction: 'rtl' }} alignItems={'center'} border={'1px solid #D1D1D1'}>
            <Box display={'flex'} alignItems={'center'}>
              +
              <TextField
                id="phone-input-0"
                inputProps={{ maxLength: 3 }}
                placeholder="xx"
                value={field.value.split(' ')[0] || ''}
                onChange={(e) => handleChange(0, e.target.value, field.onChange, field.value)}
                sx={{
                  width: '30px',
                  '& fieldset': {
                    border: 'none',
                  },
                  '& input': {
                    padding: 0
                  }
                }}
              />
            </Box>
            <TextField
              id="phone-input-1"
              inputProps={{ maxLength: 3 }}
              placeholder="xxx"
              value={field.value.split(' ')[1] || ''}
              onChange={(e) => handleChange(1, e.target.value, field.onChange, field.value)}
              sx={{
                width: '60px',
                '& fieldset': {
                  border: 'none',
                },
              }}
            />
            <TextField
              id="phone-input-2"
              inputProps={{ maxLength: 3 }}
              placeholder="xxx"
              value={field.value.split(' ')[2] || ''}
              onChange={(e) => handleChange(2, e.target.value, field.onChange, field.value)}
              sx={{ width: '60px',
                '& fieldset': {
                  border: 'none',
                }, }}
            />
            <TextField
              id="phone-input-3"
              inputProps={{ maxLength: 4 }}
              placeholder="xxxx"
              value={field.value.split(' ')[3] || ''}
              onChange={(e) => handleChange(3, e.target.value, field.onChange, field.value)}
              sx={{ width: '70px',
                '& fieldset': {
                  border: 'none',
                }, }}
            />
          </Box>

          {(error || helperText) && (
            <FormHelperText error={!!error}>
              {helperText || error?.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}

export default function RHFPhoneInput({ name, helperText }: RHFPhoneInputProps) {
  const { control } = useFormContext();

  let space = '         ';

  const formatPhoneNumber = (value: string, isDeleting?: boolean) => {
    let phone = value.replace(/[^\d]/g, '');
    // phone = "+"+phone;
    // console.log(phone, phone.length);
    if (isDeleting) {
      return phone.slice(0, -1);
    }
    if (phone.length > 0) {
      phone = "+" + phone;
    }

    if (phone.length < 3) return phone;
    if (phone.length < 5) return `${phone.slice(0, 3)}${space}${phone.slice(3)}`;;
    if (phone.length < 7) return `${phone.slice(0, 3)}${space}${phone.slice(3)}`;
    return `${phone.slice(0, 3)}${space}${phone.slice(3, 6)}${space}${phone.slice(6, 9)}${space}${phone.slice(9)}`;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <TextField
            {...field}
            fullWidth
            // inputProps={{ pattern: '[0-3]{3}-[3-9]{3}-[0-9]{4}' }}
            placeholder={`xx${space}xxx${space}xxx${space}xxxx`}
            error={!!error}
            onChange={(e) => {
              console.log(e.target.value.split(" ").join(''), field.value.split(" ").join(''));
              const formattedValue = formatPhoneNumber(e.target.value, e.target.value.split(" ").join('') < field.value.split(" ").join(''));
              field.onChange(formattedValue);
              // field.onChange(formatPhoneNumber(e.target.value)); // previus
            }}
            // onChange={(e: any) => handleChange(e, field.onChange)}
            InputProps={{

            }}
            sx={{
              '& input': {
                direction: 'rtl',
                // letterSpacing: '0.5em',
              },
            }}
          />

          {(error || helperText) && (
            <FormHelperText error={!!error}>
              {helperText || error?.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
