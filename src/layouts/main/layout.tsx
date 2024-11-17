import { Container, Grid } from "@mui/material";
import { useResponsive } from "src/hooks/use-responsive";

export default function Layout({ children }: { children: React.ReactNode }) {

    const mdUp = useResponsive('up', 'md');

    return (
        <Container maxWidth={'xl'}>
            <Grid container>
            {(mdUp) ? (
                <Grid item xs={2} sm={1} md={1} />
            ) : null}

            <Grid item xs={!mdUp ? 12 : 10} sm={!mdUp ? 12 : 11} md={11} sx={{ px: '0px!important' }}>
                {children}
            </Grid>
        </Grid>
        </Container>
        
    )
}