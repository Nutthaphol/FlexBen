import React, { useState, useEffect, Fragment } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../../shared/theme";
import {
  Container,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  ListItemIcon,
  TableContainer,
  TableBody,
  Avatar,
  Table,
  TableRow,
  TableCell,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getHistoryProfile } from "../../../../actions/history";
import itemService from "../../../../services/item.service";
import travelService from "../../../../services/travel.service";
import insuranceService from "../../../../services/insurance.service";
import packageService from "../../../../services/package.service";
import { Box } from "@mui/system";
import dayjs from "dayjs";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    padding: "1rem",
  },
}));

const History = () => {
  const classes = useStyles();
  const dispath = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: history } = useSelector((state) => state.history);
  const [data, setData] = useState();

  useEffect(async () => {
    if (currentUser && history == null) {
      dispath(getHistoryProfile(currentUser.id));
    }

    if (history) {
      let data_ = [];
      for (let i = 0; i < history.list.length; i++) {
        const type = history.list[i].type;
        const id = history.list[i].id;
        let tmp;
        if (type == "LifeStyle") {
          tmp = await itemService.getDetailItem(id).then((res) => {
            return res.data;
          });
        } else if (type == "Travel") {
          tmp = await travelService.getDetailTravel(id).then((res) => {
            return res.data;
          });
        } else if (type == "Insurance") {
          tmp = await insuranceService.getDetailInsurance(id).then((res) => {
            return res.data;
          });
        } else if (type == "Package") {
          tmp = await packageService.getDetailPackage(id).then((res) => {
            return res.data;
          });
        }
        tmp.number = history.list[i].number;
        tmp.date = history.list[i].date;
        data_.push(tmp);
      }

      setData(data_);
    }
  }, [history]);
  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
            <Paper className={classes.root}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                My History
              </Typography>
            </Paper>
            <br />
            <Paper className={classes.root}>
              <TableContainer>
                <Table>
                  <TableBody>
                    {data &&
                      data.map((val, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">
                            <ListItem disablePadding alignItems="flex-start">
                              <ListItemAvatar>
                                <Avatar
                                  sx={{
                                    width: 64,
                                    height: 64,
                                    marginRight: "10px",
                                  }}
                                  variant="rounded"
                                >
                                  <img
                                    src={`${process.env.REACT_APP_URL}image${val.image}`}
                                    width="auto"
                                    height="100%"
                                  />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                sx={{ marginTop: "5px" }}
                                primary={
                                  <Fragment>
                                    <Typography variant="h6" component="span">
                                      {val.name}
                                    </Typography>
                                  </Fragment>
                                }
                              />
                            </ListItem>
                          </TableCell>
                          <TableCell align="center">
                            buy when:{" "}
                            <i>{dayjs(val.date).format("MMM DD, YYYY")}</i>
                          </TableCell>
                          <TableCell align="center">
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Icon
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginRight: "5px",
                                }}
                                fontSize="small"
                              >
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                                  width="100%"
                                />
                              </Icon>
                              <Typography variant="subtitle1" component="span">
                                {val.price}{" "}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="subtitle1" component="span">
                              Qty. {val.number}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default History;
