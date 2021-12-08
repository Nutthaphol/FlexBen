import React from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Icon,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Themplates from "../theme";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    padding: "16px",
    paddingBottom: "16px",
    boxShadow: "0 0 1px 1px D0D3D4",
    border: "1px solid #D0D3D4",
    //     backgroundColor:
    //       "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
  },
  icons: {
    fontSize: "2rem",
    border: "1px solid #fff",
    background: "linear-gradient(orange, violet)",
    //     borderImage:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
    borderRadius: "50%",
  },
  card: {
    padding: "0.5rem",
    boxShadow: "none",
    border: "2px solid #D0D3D4",
  },
  cardContent: {
    textAlign: "center",
    padding: "10px",
    "& .css-46bh2p-MuiCardContent-root:last-child": {
      paddingBottom: "10px",
    },
  },
}));
const AddCoinCard = (props) => {
  const classes = useStyles();
  const user = props.user;
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Card className={classes.root}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              md={4}
              xs={12}
              sx={{
                textAlign: "center",
              }}
            >
              <img
                width="100"
                style={{
                  borderRadius: "50%",
                  border: "3px solid transparent",
                  background: "linear-gradient(blue, violet)",
                }}
                src={`${process.env.REACT_APP_URL}image/profile/${user.image} `}
              />
              <Typography variant="h5" gutterBottom>
                {user.firstname + " " + user.lastname}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {user.position}
              </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={4} justifyContent="space-between">
                    <Grid item xs={12} md={4}>
                      <Card
                        className={classes.card}
                        sx={{ textAlign: "center" }}
                      >
                        <Typography
                          sx={{ textAlign: "center" }}
                          variant="subtitle1"
                          component="div"
                          gutterBottom
                        >
                          Coin ทั้งหมด
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: "600",
                            textAlign: "center",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                          component="div"
                          gutterBottom
                        >
                          <Icon
                            className={classes.icons}
                            sx={{ marginRight: "10px" }}
                          >
                            <img
                              src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                              width="100%"
                            />
                          </Icon>
                          {user.coin}
                        </Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card
                        className={classes.card}
                        sx={{ textAlign: "center" }}
                      >
                        <Typography
                          sx={{ textAlign: "center" }}
                          variant="subtitle1"
                          component="div"
                          gutterBottom
                        >
                          Insurance lock
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: "600",
                            textAlign: "center",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                          component="div"
                          gutterBottom
                        >
                          <Icon
                            className={classes.icons}
                            sx={{ marginRight: "10px" }}
                          >
                            <img
                              src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                              width="100%"
                            />
                          </Icon>
                          {user.insurancelock}
                        </Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card
                        className={classes.card}
                        sx={{ textAlign: "center" }}
                      >
                        <Typography
                          sx={{ textAlign: "center" }}
                          variant="subtitle1"
                          component="div"
                          gutterBottom
                        >
                          Lifestyle & Travel
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: "600",
                            textAlign: "center",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                          component="div"
                          gutterBottom
                        >
                          <Icon
                            className={classes.icons}
                            sx={{ marginRight: "10px" }}
                          >
                            <img
                              src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                              width="100%"
                            />
                          </Icon>
                          {user.coin - user.insurancelock}
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Button>
                      <Typography variant="h6" component="span">
                        Personalize Select
                      </Typography>
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button variant="contained" color="success">
                      Buy Now
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default AddCoinCard;
