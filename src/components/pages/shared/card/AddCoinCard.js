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
    //     backgroundColor:
    //       "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
  },
  cardContent: {
    //     padding: 0,
    //     paddingBottom: 0,
  },
  icons: {
    fontSize: "3.5rem",
    border: "2px solid transparent",
    background: "linear-gradient(orange, violet)",
    //     borderImage:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
    borderRadius: "50%",
  },
}));
const AddCoinCard = (props) => {
  const classes = useStyles();
  const user = props.user;
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
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
                  borderRight: "3px dashed #006100",
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
                <Grid container spacing={8}>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                      spacing={8}
                    >
                      <Grid
                        item
                        lg={4}
                        md={6}
                        xs={12}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon className={classes.icons}>
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/icons/InsuranceCoin.svg`}
                            width="100%"
                          />
                        </Icon>
                        <Box
                          sx={{
                            flexGrow: 0.5,
                          }}
                        />
                        <Box>
                          <Typography variant="h5" sx={{ fontWeight: "600" }}>
                            {user.coin[0].count}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                          >
                            ISR
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        lg={4}
                        md={6}
                        xs={12}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon className={classes.icons}>
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/icons/LifeStyleCoin.svg`}
                            width="100%"
                          />
                        </Icon>
                        <Box sx={{ flexGrow: 0.5 }} />
                        <Box>
                          <Typography variant="h5" sx={{ fontWeight: "600" }}>
                            {user.coin[1].count}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                          >
                            LIPE
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        lg={4}
                        md={6}
                        xs={12}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon className={classes.icons}>
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/icons/TravelCoin.svg`}
                            width="100%"
                          />
                        </Icon>
                        <Box sx={{ flexGrow: 0.5 }} />
                        <Box>
                          <Typography variant="h5" sx={{ fontWeight: "600" }}>
                            {user.coin[2].count}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                          >
                            TRV
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
                        <Button sx={{ color: "black", textTransform: "none" }}>
                          <Typography variant="h6">
                            Personalize Select
                          </Typography>
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          fullWidth
                        >
                          Buy
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default AddCoinCard;
