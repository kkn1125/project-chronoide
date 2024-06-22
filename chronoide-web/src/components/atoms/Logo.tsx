import { Typography } from "@mui/material";

interface LogoProps {
  name: string;
  ismd?: boolean;
}

const defaultOptions = {
  mr: 2,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
};

function Logo({ name, ismd = false }: LogoProps) {
  return ismd ? (
    <Typography
      fontWeight={700}
      fontSize={24}
      sx={{
        ...defaultOptions,
        display: {
          xs: "none",
          md: "flex",
        },
      }}>
      {name}
    </Typography>
  ) : (
    <Typography
      fontWeight={700}
      sx={{
        ...defaultOptions,
        display: {
          xs: "flex",
          md: "none",
        },
        flexGrow: 1,
      }}>
      {name}
    </Typography>
  );
}

export default Logo;
