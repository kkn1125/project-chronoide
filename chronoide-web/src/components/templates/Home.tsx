import { Container, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { chronoTreeState } from "../../recoils/chrono.state";
import FolderTree from "../moleculars/FolderTree";
import ChronoTaskGenerator from "../organisms/ChronoTaskGenerator";

function Home() {
  const chronoTree = useRecoilValue(chronoTreeState);

  return (
    <Stack>
      {/* section #1 */}
      <Toolbar />

      <Container>
        <Typography component="h2" fontWeight={700} fontSize={24} gutterBottom>
          Your Task
        </Typography>
        <Paper sx={{ py: 3, pl: 10, pr: 3, overflow: "auto", maxHeight: 200 }}>
          <FolderTree chronoTree={chronoTree} />
        </Paper>
        <Toolbar />
        <ChronoTaskGenerator />
      </Container>
    </Stack>
  );
}

export default Home;
