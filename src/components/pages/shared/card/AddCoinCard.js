import React from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Icon,
  Paper,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Themplates from "../theme";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  boxDetail: {
    borderRadius: "16px",
    padding: "24px 4px",
    textAlign: "center",
    width: "100%",
    height: "80px",
  },
}));
const AddCoinCard = (props) => {
  const classes = useStyles();
  const user = props.user;
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper sx={{ p: 4 }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} lg={4} xl={3}>
              <Stack alignItems="center">
                <Avatar
                  sx={{ height: 120, width: 120 }}
                  src={`${process.env.REACT_APP_URL}image/profile/${user.image} `}
                />
                <Typography variant="h5" gutterBottom>
                  {user.firstname + " " + user.lastname}
                </Typography>
                <Typography variant="h5">{user.position}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} lg={8} xl={9} sx={{ position: "relative" }}>
              <Stack spacing={1} justifyContent="space-between">
                <Stack
                  sx={{ width: 1 }}
                  direction="row"
                  justifyContent="space-between"
                  spacing={6}
                >
                  <Box
                    className={classes.boxDetail}
                    sx={{ bgcolor: "info.lighter" }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                    >
                      <Icon className={classes.icons}>
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                          width="100%"
                        />
                      </Icon>
                      <Typography variant="h3" sx={{ color: "info.darker" }}>
                        {user.coin}
                      </Typography>
                    </Stack>
                    <Typography variant="subtitle1" sx={{ color: "info.dark" }}>
                      Coin ทั้งหมด
                    </Typography>
                  </Box>
                  <Box
                    className={classes.boxDetail}
                    sx={{ bgcolor: "warning.lighter" }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                    >
                      <Icon className={classes.icons}>
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                          width="100%"
                        />
                      </Icon>
                      <Typography variant="h3" sx={{ color: "warning.darker" }}>
                        {user.insurancelock}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "warning.dark" }}
                    >
                      Insurance lock
                    </Typography>
                  </Box>
                  <Box
                    className={classes.boxDetail}
                    sx={{ bgcolor: "error.lighter" }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                    >
                      <Icon className={classes.icons}>
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                          width="100%"
                        />
                      </Icon>
                      <Typography variant="h3" sx={{ color: "error.darker" }}>
                        {user.coin - user.insurancelock}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "error.dark" }}
                    >
                      Lifestyle & Travel
                    </Typography>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Button color="primary">Personalize Select</Button>
                  <Button color="secondary">Buy Now</Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default AddCoinCard;
