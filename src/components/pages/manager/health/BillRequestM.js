import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles, styled } from "@mui/styles";
import { getAllUsers } from "../../../../actions/user";
import {
  Avatar,
  Button,
  ButtonBase,
  Chip,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import HeaderSearch from "../../shared/textBox/HeaderSearch";
import Themplates from "../../shared/theme";
import { getBillHistory } from "../../../../actions/bill";
import billService from "../../../../services/bill.service";
import dayjs from "dayjs";
import { Box, margin } from "@mui/system";
import { getTreatmentCategory } from "../../../../actions/treatmentCategory";
import { Visibility } from "@mui/icons-material";
import { tooltipClasses } from "@mui/material/Tooltip";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  paper: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    position: "relative",
    margin: "0px 0 40px",
  },
  tableHeaderText: {
    fontSize: "16px",
    fontWeight: "550",
    color: "DarkSlateGray",
    borderBottom: "none",
  },
  paperTableRow: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: "4px",
    border: "none",
    boxShadow: "rgb(65 171 255 / 16%) 0px 0px 0px 1px",
  },
  tableCell: {
    borderBottom: "none",
    backgroundColor: "transparent",
    height: "56px",
  },
}));

const BillRequestM = () => {
  const classes = useStyles();
  const dispath = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: allUsers } = useSelector((state) => state.users);
  const { result: treatmentCategory } = useSelector(
    (state) => state.treatmentCategory
  );
  const [loadBill, setLoadBill] = useState();
  const [search, setSearch] = useState("");
  const [displayImage, setDisplayImage] = useState({
    open: false,
  });

  useEffect(async () => {
    if (!loadBill) {
      const res = await billService.getBillHistory();
      console.log("res", res);
      setLoadBill(res.data);
    }

    if (currentUser) {
      dispath(getTreatmentCategory());
      dispath(getAllUsers());
    }
  }, [loadBill]);

  const handleDisplayImage = (e, id) => {
    setDisplayImage({
      open: true,
      path: loadBill.find((item) => item.id == id).image,
      avatar: filterDataUsers(id, "avatar"),
      fullname: filterDataUsers(id, "fullname"),
      department: filterDataUsers(id, "department"),
      billname: loadBill.find((item) => item.id == id).billname,
    });
  };

  const handleCloseDisplayImage = () => {
    setDisplayImage({ open: false });
  };

  const filterDataUsers = (id, params) => {
    if (allUsers) {
      const data = allUsers.find((item) => item.id == id) || false;

      if (data) {
        switch (params) {
          case "fullname":
            return `${data.firstname + " " + data.lastname}`;
          case "avatar":
            return data.image;
          case "department":
            return data.department;
          default:
            return data;
        }
      }
      return "";
    }
  };

  const handleStatusBillRequest = (id, status) => {
    if (loadBill) {
      let loadBill_ = [...loadBill];
      const index = loadBill_.findIndex((item) => item.id == id);
      loadBill_[index].status = status;
      setLoadBill(loadBill_);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
          <Container maxWidth="xl">
            <HeaderSearch
              normalText={"รายการคำข้อเบิกบิล"}
              setSearch={setSearch}
            />
            <Paper sx={{ p: 2, mb: 4 }} elevation={1}>
              <Table
                sx={{
                  borderCollapse: "separate",
                  borderSpacing: "0px 10px !important",
                }}
              >
                <TableHead>
                  <TableRow sx={{ bgcolor: "grey.300" }}>
                    <TableCell
                      sx={{
                        borderTopLeftRadius: "16px",
                        borderBottomLeftRadius: "16px",
                      }}
                    >
                      โปรไฟล์
                    </TableCell>
                    <TableCell align="center">วันที่</TableCell>
                    <TableCell align="center">ชื่อรายการ</TableCell>
                    <TableCell align="center">ประเภท</TableCell>
                    <TableCell align="center">จำนวนเงิน</TableCell>
                    <TableCell align="center">หลักฐาน</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderTopRightRadius: "16px",
                        borderBottomRightRadius: "16px",
                      }}
                    >
                      status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadBill &&
                    loadBill.map((val, index) => (
                      <TableRow
                        key={index}
                        sx={{ bgcolor: index % 2 == 0 ? "none" : "grey.100" }}
                      >
                        <TableCell
                          className={classes.tableCell}
                          sx={{
                            borderTopLeftRadius: "16px",
                            borderBottomLeftRadius: "16px",
                            fontWeight: "600",
                            color: "DarkSlateGray",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              sx={{ margin: "0 8px" }}
                              src={`${
                                process.env.REACT_APP_URL
                              }image/profile/${filterDataUsers(
                                val.sender,
                                "avatar"
                              )}`}
                            />
                            <Box>
                              <Typography
                                sx={{
                                  fontWeight: "550",
                                  color: "DarkSlateGray",
                                }}
                              >
                                {filterDataUsers(val.sender, "fullname")}
                              </Typography>
                              <Typography
                                noWrap
                                sx={{
                                  fontWeight: "550",
                                  color: "DarkSlateGray",
                                  opacity: "0.6",
                                  maxWidth: "160px",
                                }}
                              >
                                {filterDataUsers(val.sender, "department")}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.tableCell}
                          sx={{
                            borderTopLeftRadius: "4px",
                            borderBottomLeftRadius: "4px",
                            fontWeight: "600",
                            color: "DarkSlateGray",
                          }}
                        >
                          {dayjs(val.date).format("DD / MM / YYYY")}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.tableCell}
                          sx={{
                            fontWeight: "550",
                            color: "DarkSlateGray",
                          }}
                        >
                          {val.billname}
                        </TableCell>
                        <TableCell align="center" className={classes.tableCell}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                padding: "0 8px",
                                bgcolor:
                                  val.category == "1"
                                    ? "info.light"
                                    : val.category == "2"
                                    ? "warning.light"
                                    : "error.light",
                                color:
                                  val.category == "1"
                                    ? "info.darker"
                                    : val.category == "2"
                                    ? "warning.darker"
                                    : "error.darker",
                                borderRadius: "4px",
                                fontWeight: "700",
                              }}
                              variant="subtitle2"
                            >
                              {treatmentCategory &&
                                treatmentCategory.find(
                                  (item) => item.id == val.category
                                ).name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.tableCell}
                          sx={{ fontWeight: "550", color: "DarkSlateGray" }}
                        >
                          $ {val.finalExpenses}
                        </TableCell>
                        <TableCell align="center" className={classes.tableCell}>
                          <Tooltip title="Click to display">
                            <IconButton
                              color="info"
                              onClick={(e) => {
                                handleDisplayImage(e, val.id);
                              }}
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.tableCell}
                          sx={{
                            borderTopRightRadius: "16px",
                            borderBottomRightRadius: "16px",
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            sx={{
                              margin: "0 8px",
                            }}
                            disableRipple
                            variant="contained"
                            color="success"
                            fullWidth
                            size="small"
                          >
                            อนุมัติ
                          </Button>
                          <Button
                            sx={{
                              margin: "0 8px",
                            }}
                            disableRipple
                            variant="contained"
                            color="error"
                            fullWidth
                            size="small"
                          >
                            ไม่อนุมัติ
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Paper>
          </Container>
          <Dialog
            open={displayImage.open}
            onClose={() => handleCloseDisplayImage()}
            maxWidth="md"
            fullWidth
          >
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{ margin: "0 8px", width: 56, height: 56 }}
                  src={`${process.env.REACT_APP_URL}image/profile/${displayImage.avatar}`}
                />
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "550",
                      color: "DarkSlateGray",
                    }}
                  >
                    {displayImage.fullname}
                  </Typography>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: "550",
                      color: "DarkSlateGray",
                      opacity: "0.6",
                    }}
                  >
                    {displayImage.department}
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, textAlign: "end" }}>
                  <Typography
                    noWrap
                    variant="h4"
                    sx={{
                      fontWeight: "550",
                      color: "DarkSlateGray",
                    }}
                  >
                    {displayImage.billname}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  overflow: "scroll",
                }}
              >
                <img
                  src={`${process.env.REACT_APP_URL}image/${displayImage.path}`}
                  width="100%"
                />
              </Box>
            </DialogContent>
          </Dialog>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default BillRequestM;
