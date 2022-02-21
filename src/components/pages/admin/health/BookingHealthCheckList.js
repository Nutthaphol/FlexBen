import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles, styled } from "@mui/styles";
import Themplates from "../../shared/theme";
import HeaderSearch from "../../shared/textBox/HeaderSearch";
import { Box } from "@mui/system";
import {
  Avatar,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";
import { QueueOutlined } from "@mui/icons-material";
import { getAllBookingHealthCheck } from "../../../../actions/bookingHealthCheck";
import { getAllUsers } from "../../../../actions/user";
import { getHospitalPackage } from "../../../../actions/hospital";
import dayjs from "dayjs";
import * as XLSX from "xlsx";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({}));

const defaultColumns = [
  {
    field: "id",
    headerName: "ID",
    flex: 0.1,
    minWidth: 60,
  },
  {
    field: "profile",
    header: "ชื่อ-สกุล",
    flex: 1,
    minWidth: 240,
    renderCell: (params) => {
      return (
        <Box sx={{ display: "flex", alingItems: "center" }}>
          <Avatar
            sx={{ width: 36, height: 36, marginRight: "0.5rem" }}
            src={`${process.env.REACT_APP_URL}image/profile/${params.value.image}`}
          />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "600", display: "flex", alignItems: "center" }}
          >
            {`${
              // params.value.prefix +
              // " " +
              params.value.firstname + " " + params.value.lastname
            }`}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "dateBooking",
    headerName: "วันที่จอง",
    flex: 0.4,
    minWidth: 120,
  },
  { field: "time", headerName: "เวลาที่จอง", flex: 0.6, minWidth: 160 },
  {
    field: "hospital",
    headerName: "สถานที่ตรวจ",
    flex: 0.8,
    minWidth: 200,
  },
  {
    field: "collectingType",
    headerName: "รูปแบบการชำระเงิน",
    flex: 0.4,
    minWidth: 140,
    renderCell: (params) => {
      return (
        <Box>
          <Chip
            label={params.value}
            color={params.value == "เงินสด" ? "primary" : "warning"}
          />
        </Box>
      );
    },
  },
  {
    field: "booker",
    headerName: "จองโดย",
    flex: 0.6,
    minWidth: 160,
    renderCell: (params) => {
      return (
        <Box>
          <Typography variant="subtitle1">
            {`${params.value.firstname + " " + params.value.lastname}`}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "insertDate",
    headerName: "จองเมื่อวันที่",
    flex: 0.4,
    minWidth: 120,
  },
  {
    field: "view",
    headerName: "View",
    flex: 0.4,
    minWidth: 120,
    renderCell: (params) => {
      return <Button variant="contained">View</Button>;
    },
  },
];

export const BookingHealthCheckList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { result: hospitalList } = useSelector((state) => state.hospital);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: bookingHealthcheck } = useSelector(
    (state) => state.bookingHealthCheck
  );
  const { result: allUsers } = useSelector((state) => state.users);

  const [search, setSearch] = useState("");
  const [outFile, setOutFile] = useState(null);
  const [external, setExternal] = useState();
  const [rows, setRows] = useState();
  const [loadData, setLoadData] = useState(false);
  const [fullData, setFullData] = useState(false);

  useEffect(() => {
    const fetchData = async (callback_) => {
      await dispatch(getAllBookingHealthCheck());
      await dispatch(getAllUsers());
      await dispatch(getHospitalPackage());
      callback_();
    };

    !loadData &&
      fetchData(() => {
        setLoadData(true);
      });

    if (loadData && !rows) {
      preRowsTable();
    }
  }, [rows, loadData]);

  const preRowsTable = () => {
    let preRows = [];
    console.log("hospitalList", hospitalList);
    console.log("bookingHealthcheck", bookingHealthcheck);
    console.log("allUsers", allUsers);
    if (hospitalList && bookingHealthcheck && allUsers) {
      for (
        let runbooking = 0;
        runbooking < bookingHealthcheck.length;
        runbooking++
      ) {
        const thisData = bookingHealthcheck[runbooking];

        const profile = allUsers.find((item) => item.id == thisData.userId);
        const dateBooking = thisData.dateBooking;
        const time = thisData.time;
        const hospital = hospitalList.find(
          (item) => item.id == thisData.hospitalId
        ).name;
        const collectingType = thisData.collectingType;
        const booker = allUsers.find((item) => item.id == thisData.bookerId);
        const insertDate = thisData.insertDate;
        preRows.push({
          id: thisData.id,
          profile: profile,
          dateBooking: dayjs(dateBooking).format("DD-MM-YYYY"),
          time: time,
          hospital: hospital,
          collectingType: collectingType,
          booker: booker,
          insertDate: dayjs(insertDate).format("DD-MM-YYYY"),
        });
      }
    }

    console.log("preRows", preRows);
    setRows(preRows);
  };

  const handleImportFile = (file) => {
    setExternal(null);
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (!file) {
        reject();
      }
      fileReader.readAsArrayBuffer(file);
      fileReader.onabort = () => {};
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((data) => {
      const perData = data.map((row, index) => {
        console.log("row", row);
        return {
          id: index + 1,
          userId: row["employee id"],
          prefix: row["prefix"],
          firstname: row["firstname"],
          lastname: row["lastname"],
          hospitalId: row["id package"],
        };
      });
      file = null;
      setExternal(perData);
    });
  };

  const CustomToolbar = (props) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "row-reverse", mb: 2 }}>
        <GridToolbarContainer className={gridClasses.toolbarContainer}>
          <GridToolbarExport sx={{ borderRadius: "4px" }} variant="text" />
        </GridToolbarContainer>
      </Box>
    );
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Box className={`page`}>
          <Container maxWidth="lg">
            <Stack spacing={4} sx={{ mb: 4 }}>
              <HeaderSearch
                normalText="Employee health check reservation list"
                setSearch={setSearch}
              />
              <Box className={`buttonImport`}>
                <Button
                  startIcon={<QueueOutlined />}
                  component="label"
                  variant="contained"
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      width: 1,
                    },
                  }}
                >
                  Import Excel
                  <input
                    type="file"
                    hidden
                    onChange={(event) => {
                      const file = event.target.files[0];
                      event.target.value = null;
                      handleImportFile(file);
                    }}
                  />
                </Button>
              </Box>

              <Paper sx={{ p: 2 }}>
                {rows && (
                  <DataGrid
                    rows={rows}
                    rowHeight={64}
                    columns={defaultColumns}
                    autoHeight
                    checkboxSelection
                    disableSelectionOnClick
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    components={{
                      Toolbar: CustomToolbar,
                    }}
                  />
                )}
              </Paper>
            </Stack>
          </Container>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
