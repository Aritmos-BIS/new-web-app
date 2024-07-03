import { Container, Grid, Box } from "@mui/material";

function PageGroup() {
  return (
    <Container sx={{ minHeight: "100vh", mt: 5 }}>
      <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              
            </Box>
          </Grid>
      </Grid>
    </Container>
  );
}

export default PageGroup;
