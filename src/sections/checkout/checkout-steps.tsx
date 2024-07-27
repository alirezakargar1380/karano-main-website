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
import { svgIconClasses } from '@mui/material';

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
        <Step key={label} sx={{

        }}>
          <StepLabel
            StepIconComponent={(props) => <StepIcon {...props} step={index + 1} />}
            sx={{
              [`& .${stepLabelClasses.label}`]: {
                fontWeight: 'fontWeightSemiBold',
              },
              [`& .Mui-completed`]: {
                // color: "#fff",
                [`& .${svgIconClasses.root}`]: {
                  // color: "#000",
                  // fill: "#fff",
                  border: "1.5px solid #000",
                  borderRadius: 100
                },
                [`& .${svgIconClasses.root} path`]: {
                  // color: "red"
                },
              },
              [`& .Mui-completed .MuiStepLabel-label`]: {
                // color: "#000",
              },
              [`& .${svgIconClasses.root}`]: {
                ...((activeStep < index) && {
                  color: "#F2F2F2"
                })
              },
              [`& .${svgIconClasses.root} text`]: {
                ...((activeStep < index) && {
                  fill: "#727272"
                })
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
  step: number;
};


function StepIcon({ active, completed, step }: StepIconProps) {

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        bgcolor: '#F2F2F2',
        // color: 'text.disabled',
        ...(active && {
          color: '#fff',
          bgcolor: '#000',
          pl: 0.65,
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
            pt: 0.8,
            pr: 0.5
            // borderRadius: '50%',
          }}
        >
          {step === 1 && '۱'}
          {step === 2 && '۲'}
          {step === 3 && '۳'}
        </Box>
      )}
    </Stack>
  );
}
