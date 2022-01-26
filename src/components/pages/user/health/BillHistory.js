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
            <HeaderSearch normalText="ประวัติการขอเบิก" setSearch={setSearch} />
            <Table
              sx={{
                borderCollapse: "separate",
                borderSpacing: "0px 10px !important",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderText}>
                    วันที่
                  </TableCell>
                  <TableCell align="center" className={classes.tableHeaderText}>
                    ขื่อรายการ
                  </TableCell>
                  <TableCell align="center" className={classes.tableHeaderText}>
                    ประเภท
                  </TableCell>
                  <TableCell align="center" className={classes.tableHeaderText}>
                    จำนวนเงิน
                  </TableCell>
                  <TableCell align="center" className={classes.tableHeaderText}>
                    หลักฐาน
                  </TableCell>
                  <TableCell align="center" className={classes.tableHeaderText}>
                    status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billHstory &&
                  billHstory.map((val, index) => (
                    <TableRow key={index} className={classes.paperTableRow}>
                      <TableCell
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
                              width: "60px",
                              padding: "4px",
                              bgcolor:
                                val.category == "1"
                                  ? "LightSkyBlue"
                                  : val.category == "2"
                                  ? "khaki"
                                  : "LightSalmon",
                              color:
                                val.category == "1"
                                  ? "RoyalBlue"
                                  : val.category == "2"
                                  ? "OrangeRed"
                                  : "FireBrick",
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
                          borderTopRightRadius: "4px",
                          borderBottomRightRadius: "4px",
                        }}
                      >
                        <Chip
                          sx={{ width: "120px" }}
                          label={
                            val.status == -1
                              ? "รอดำเนินการ"
                              : val.status == 1
                              ? "ดำเนินการสำเร็จ"
                              : val.status == 0
                              ? "ถูกปฏิเสธ"
                              : "ผิดพลาด"
                          }
                          color={
                            val.status == -1
                              ? "warning"
                              : val.status == 1
                              ? "success"
                              : val.status == 0
                              ? "error"
                              : "secondary"
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Container>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default BillHistory;
