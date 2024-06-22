import { ThemeProvider, createTheme } from "@mui/material";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";

const theme = createTheme({
  // other theme properties
  palette: {
    mode: "dark",
  },
  components: {
    MuiTypography: {
      defaultProps: {
        sx: { color: (theme) => theme.palette.text.primary },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        {/* <React.StrictMode> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
        {/* </React.StrictMode> */}
      </RecoilRoot>
    </ThemeProvider>
  </>,
);
