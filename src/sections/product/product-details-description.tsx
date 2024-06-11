import { Box, Typography } from '@mui/material';
import Markdown from 'src/components/markdown';

// ----------------------------------------------------------------------

type Props = {
  description: string;
};

// export default function ProductDetailsDescription({ description }: Props) {
export default function ProductDetailsDescription() {
  return (
    <Box>
      <Box sx={{ pt: { xs: 3, md: 3, lg: 5 } }}>
        <Typography variant='h5' fontFamily={'peyda-bold'} pb={2}>درباره محصول</Typography>
        <Typography fontFamily={'peyda-regular'}>
          کارانو در سال 1369 فعالیت خود را در زمینه تولید محصولات چوبی آغاز نمود. این موسسه با اتکا بر توان اجرایی خود و بهرهگیری از تجربه پیشگامان جهانی صنعت چوب، همواره به ارتقا سطح اجرا در صنعت ساختمان کشور یاری رسانده است.              </Typography>
      </Box>

      <Box sx={{ pt: { xs: 3, md: 3, lg: 5 } }}>
        <Typography variant='h5' fontFamily={'peyda-bold'} pb={2}>ویژگی های کلی محصول</Typography>
        <Typography>متن با نقطهمتن با نقطهمتن با نقطهمتن با نقطهمتن با نقطه</Typography>
      </Box>
    </Box>
  );
}
