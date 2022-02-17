import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles, styled } from "@mui/styles";
import Themplates from "../../shared/theme";
import {
  Button,
  Chip,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import HeaderSearch from "../../shared/textBox/HeaderSearch";
import { getBillHistoryById } from "../../../../actions/bill";
import dayjs from "dayjs";
import { getTreatmentCategory } from "../../../../actions/treatmentCategory";
import { Visibility } from "@mui/icons-material";

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
    // borderBottom: "none",
    // borderRadius: "50%",
    padding: 0,
    margin: 0,
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

const BillHistory = () => {
  const classes = useStyles();
  const dispath = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: billHstory } = useSelector((state) => state.bill);
  const { result: treatmentCategory } = useSelector(
    (state) => state.treatmentCategory
  );

  const [search, setSearch] = useState("");
  const [displayImage, setDisplayImage] = useState({
    open: false,
    path: "",
  });

  useEffect(async () => {
    if (currentUser) {
      dispath(getBillHistoryById(currentUser.id));
      dispath(getTreatmentCategory());
    }
  }, []);

  const handleDisplayImage = (e, id) => {
    setDisplayImage({
      open: true,
      path: billHstory.find((item) => item.id == id).image,
    });
  };

  const handleCloseDisplayImage = () => {
    setDisplayImage({ open: false, path: "" });
  };
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
          <Container maxWidth="xl">
            <HeaderSearch
              normalText="ประวัติการขอเบิก"
              setSearch={setSearch}
              insertComponent={
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    textTransform: "none",
                    width: "80px",
                    height: "40px",
                    padding: 0,
                    margin: 0,
                  }}
                  disableRipple
                  href="/health/AddBill"
                >
                  Add Bill
                </Button>
              }
            />
            <Box sx={{ mb: 4 }} />
            <TableContainer
              component={Paper}
              sx={{ overflow: "scroll" }}
              elevation={3}
            >
              <Table sx={{ m: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        minWidth: 120,
                      }}
                    >
                      วันที่
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: 120 }}>
                      ขื่อรายการ
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: 120 }}>
                      ประเภท
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: 120 }}>
                      จำนวนเงิน
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: 120 }}>
                      หลักฐาน
                    </TableCell>
                    <TableCell
                      align="center"
                      // sx={{
                      //   borderTopRightRadius: "16px",
                      //   borderBottomRightRadius: "16px",
                      // }}
                    >
                      status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {billHstory &&
                    billHstory.map((val, index) => (
                      <TableRow
                        key={index}
                        // sx={{ bgcolor: index % 2 == 0 ? "none" : "grey.100" }}
                      >
                        <TableCell
                          sx={{
                            borderTopLeftRadius: "16px",
                            borderBottomLeftRadius: "16px",
                            fontWeight: "600",
                            color: "DarkSlateGray",
                          }}
                        >
                          {dayjs(val.date).format("DD / MM / YYYY")}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: "550",
                            color: "DarkSlateGray",
                          }}
                        >
                          {val.billname}
                        </TableCell>
                        <TableCell align="center">
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
                          sx={{ fontWeight: "550", color: "DarkSlateGray" }}
                        >
                          $ {val.finalExpenses}
                        </TableCell>
                        <TableCell align="center">
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
                          sx={{
                            borderTopRightRadius: "16px",
                            borderBottomRightRadius: "16px",
                          }}
                        >
                          <Chip
                            // sx={{ width: "120px" }}
                            label={
                              val.status == -1
                                ? "รอดำเนินการ"
                                : val.status == 1
                                ? "ดำเนินการสำเร็จ"
                                : val.status == 0
                                ? "ถูกปฏิเสธ"
                                : "ผิดพลาด"
                            }
                            sx={{
                              bgcolor:
                                val.status == -1
                                  ? "warning.light"
                                  : val.status == 1
                                  ? "success.light"
                                  : val.status == 0
                                  ? "error.light"
                                  : "secondary.light",
                              fontWeight: 600,
                              color:
                                val.status == -1
                                  ? "warning.darker"
                                  : val.status == 1
                                  ? "success.darker"
                                  : val.status == 0
                                  ? "error.darker"
                                  : "secondary.darker",
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
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

export default BillHistory;
