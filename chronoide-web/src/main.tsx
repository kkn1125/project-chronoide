import { ThemeProvider, createTheme } from "@mui/material";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ko";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={7} autoHideDuration={3000}>
          <ThemeProvider theme={theme}>
            <RecoilRoot>
              {/* <React.StrictMode> */}
              <BrowserRouter>
                <App />
              </BrowserRouter>
              {/* </React.StrictMode> */}
            </RecoilRoot>
          </ThemeProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  </>,
);
