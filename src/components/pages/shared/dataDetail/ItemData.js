import React from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Star } from "@mui/icons-material";
import { amber } from "@mui/material/colors";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    padding: "1rem",
    boxShadow: "none",
    border: "1px solid #D0D3D4",
  },
  cardMedia: {
    // position: "flex",
    width: "100%",
    height: "auto",
    maxHeight: "30vh",
    backgroundColor: "white",
    objectFit: "cover",
    borderStyle: "solid",
    borderWidth: "1px 1px",
    marginTop: "1.5rem",
    borderColor: "#D0D3D4",
  },
}));

const ItemData = ({ detail }) => {
  const classes = useStyles();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Card className={classes.root}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant={"h4"}
                sx={{ fontWeight: "700" }}
                gutterBottom
              >
                {detail.name.toUpperCase()}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="h5" gutterBottom>
                <Grid container spacing={1}>
                  <Grid item>
                    <Star sx={{ color: amber[500] }} />
                  </Grid>
                  <Grid item>{detail.rating}</Grid>
                </Grid>
              </Typography>
            </Box>
            <CardMedia
              className={classes.cardMedia}
              component="img"
              image={`${process.env.REACT_APP_URL}image/${detail.image}`}
            />
            <Box
              sx={{ marginTop: "20px", marginBottom: "20px", width: "100%" }}
              className={classes.divider}
            >
              <Divider sx={{ width: "100%" }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: "700" }} gutterBottom>
              {detail.highLights}
            </Typography>
            <Typography variant="subtitle1">
              {" "}
              <span style={{ paddingLeft: "2.5rem" }} />
              {detail.description}
            </Typography>
            {/* <Typography variant="h5" gutterBottom sx={{ marginTop: "1rem" }}>
              รายละเอียด
            </Typography> */}
          </CardContent>
        </Card>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ItemData;
