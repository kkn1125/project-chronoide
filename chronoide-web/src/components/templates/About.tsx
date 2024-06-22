import { Container, Stack, Toolbar, Typography } from "@mui/material";

function About() {
  return (
    <Stack>
      {/* section #1 */}
      <Toolbar />
      <Container>
        <Typography component="h2" fontWeight={700} fontSize={24}>
          About
        </Typography>
      </Container>
    </Stack>
  );
}

export default About;
