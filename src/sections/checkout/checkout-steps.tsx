import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Stepper, { StepperProps } from '@mui/material/Stepper';
import StepLabel, { stepLabelClasses } from '@mui/material/StepLabel';
import MuiStepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import Iconify from 'src/components/iconify';
import { useEffect, useState } from 'react';
import { useCheckoutContext } from './context';

// ----------------------------------------------------------------------

const StepConnector = styled(MuiStepConnector)(({ theme }) => ({
  top: 12,
  left: 'calc(-50%, 20px)',
  right: 'calc(50%, 20px)',
  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  [`&.${stepConnectorClasses.active}, &.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#000',
    },
  },
}));

// ----------------------------------------------------------------------

interface Props extends StepperProps {
  steps: string[];
  activeStep: number;
}

export default function CheckoutSteps({ steps, activeStep, sx, ...other }: Props) {
  const [skipped, setSkipped] = useState(new Set<number>());
  const isStepSkipped = (step: number) => skipped.has(step);

  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<StepConnector />}
      sx={{
        mb: { xs: 3, md: 5 },
        ...sx,
      }}
      {...other}
    >
      {steps.map((label, index: number) => (
        <Step key={label}>
          <StepLabel
            StepIconComponent={StepIcon}
            sx={{
              [`& .${stepLabelClasses.label}`]: {
                fontWeight: 'fontWeightSemiBold',
              },
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

// ----------------------------------------------------------------------

type StepIconProps = {
  active: boolean;
  completed: boolean;
};


function StepIcon({ active, completed }: StepIconProps) {
  const checkout = useCheckoutContext();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        bgcolor: '#F2F2F2',
        // color: 'text.disabled',
        ...(active && {
          color: '#fff',
          bgcolor: '#000',
          pl: 0.1,
          pb: 0.2
        }),
        ...(completed && {
          bgcolor: 'transparent',
          border: '1px solid',
        }),
      }}
    >
      {completed ? (
        <Iconify icon="eva:checkmark-fill" sx={{ color: '#000' }} />
      ) : (
        <Box
          sx={{
            width: 10,
            height: 16,
            borderRadius: '50%',
            pb: 0.75
            // backgroundColor: 'currentColor',
          }}
        >
          {active && checkout.activeStep + 1}
          {!active && !completed && checkout.activeStep + 2}
        </Box>
      )}
    </Stack>
  );
}
