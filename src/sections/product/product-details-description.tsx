import { Box, Typography } from '@mui/material';
import Markdown from 'src/components/markdown';

// ----------------------------------------------------------------------

type Props = {
  description: string;
  attributes: string;
};
export default function ProductDetailsDescription({ description, attributes }: Props) {
  return (
    <Box>
      {(!!description) && (
        <Box sx={{ pt: { xs: 3, md: 3, lg: 5 } }}>
          <Typography variant='h5' fontFamily={'peyda-bold'} pb={2}>درباره محصول</Typography>
          <Typography fontFamily={'peyda-regular'}>
            {description}
          </Typography>
        </Box>
      )}


      {(!!attributes) && (
        <Box sx={{ pt: { xs: 3, md: 3, lg: 5 } }}>
          <Typography variant='h5' fontFamily={'peyda-bold'} pb={2}>ویژگی های کلی محصول</Typography>
          <Markdown children={attributes} sx={{
            fontFamily: 'peyda-regular'
          }} />
        </Box>
      )}

    </Box>
  );
}
