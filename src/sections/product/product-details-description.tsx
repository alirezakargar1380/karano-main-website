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
        <Box sx={{ pt: '48px' }}>
          <Typography variant='title3' pb={'16px'}>درباره محصول</Typography>
          <Typography variant='body2'>
            {description}
          </Typography>
        </Box>
      )}


      {(!!attributes) && (
        <Box sx={{ pt: { xs: 3, md: 3, lg: 5 } }}>
          <Typography variant='title3' pb={'16px'}>ویژگی های کلی محصول</Typography>
          <Markdown
            children={attributes}
            sx={{
              typography: 'body2',
              '& ul': {
                pl: 2
              }
            }}
          />
        </Box>
      )}

    </Box>
  );
}
