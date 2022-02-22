import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles, styled } from "@mui/styles";
import Themplates from "../../shared/theme";
import { getBookingHealthCheckbyId } from "../../../../actions/bookingHealthCheck";
import {
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import HeaderSearch from "../../shared/textBox/HeaderSearch";
import { Box } from "@mui/system";
import { getHospitalPackage } from "../../../../actions/hospital";
import dayjs from "dayjs";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({}));
const BookingHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { result: bookingHealthcheck } = useSelector(
    (state) => state.bookingHealthCheck
  );
  const { result: hospitalList } = useSelector((state) => state.hospital);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [listed, setListed] = useState();
  const [search, setSearch] = useState();
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    const fetchData = async (callback_) => {
      const id = currentUser.id;
      console.log("hospitalList", hospitalList);
      await dispatch(getBookingHealthCheckbyId(id));
      await dispatch(getHospitalPackage());
      callback_();
    };

    !loadData &&
      fetchData(() => {
        setLoadData(true);
      });

    if (!listed && loadData) {
      const result =
        bookingHealthcheck &&
        bookingHealthcheck.reduce((prev, curr) => {
          const data = hospitalList.find((item) => item.id == curr.hospitalId);

          if (data) {
            curr.hospitalName = data.name;
            prev.push(curr);
          }
          return prev;
        }, []);
      setListed(result);
    }
  }, [listed, loadData]);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
          <Container maxWidth="xl">
            <HeaderSearch normalText="Booking History" setSearch={setSearch} />
            <Box sx={{ mb: 4 }} />
            <Paper sx={{ mb: 4, overflow: "scroll", mt: 4, p: 2 }}>
              <Table sx={{}}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ minWidth: 120 }}>Package</TableCell>
                    <TableCell sx={{ minWidth: 100 }}>วันที่</TableCell>
                    <TableCell sx={{ minWidth: 120 }}>เวลา</TableCell>
                    <TableCell sx={{ minWidth: 120 }}>ชื่อ-สกุล</TableCell>
                    <TableCell sx={{ minWidth: 80 }}>
                      ประเภทการชำระเงิน
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listed &&
                    listed.map((val, index) => (
                      <TableRow key={val.id + index + val.hospitalId}>
                        <TableCell>{val.hospitalName}</TableCell>
                        <TableCell>
                          {dayjs(val.bookingDate).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>{val.bookingTime}</TableCell>
                        <TableCell>{`${
                          val.prefix + " " + val.firstname + " " + val.lastname
                        }`}</TableCell>
                        <TableCell>
                          <Chip
                            label={val.collectingType}
                            color={
                              val.collectingType == "เงินสด"
                                ? "primary"
                                : "secondary"
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Paper>
          </Container>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default BookingHistory;
