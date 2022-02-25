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
  Alert,
  Avatar,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Paper,
  Snackbar,
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

const rowsimportData = [
  {
    field: "id",
    headerName: "ID",
    flex: 0.5,
    minWidth: 80,
  },
  {
    field: "userId",
    headerName: "ID employee",
    flex: 0.5,
    minWidth: 180,
  },
  {
    field: "prefix",
    headerName: "Prefix",
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: "firstname",
    headerName: "First name",
    flex: 1,
    minWidth: 140,
  },
  {
    field: "lastname",
    headerName: "Last name",
    flex: 1,
    minWidth: 140,
  },
  {
    field: "phone",
    headerName: "Phone number",
    flex: 1,
    minWidth: 140,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    minWidth: 140,
  },
  {
    field: "nationalId",
    headerName: "National ID",
    flex: 1,
    minWidth: 140,
  },
  {
    field: "hospitalId",
    headerName: "Package ID",
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: "bookingDate",
    headerName: "Booking date",
    flex: 1,
    minWidth: 140,
  },
  {
    field: "bookingTime",
    headerName: "Booking time",
    flex: 1,
    minWidth: 140,
  },
  {
    field: "collectingType",
    headerName: "Collecting type",
    flex: 0.5,
    minWidth: 100,
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
  const [openDialgoData, setOpenDialogData] = useState(false);
  const [save, setSave] = useState(false);

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
            {params.value.image && (
              <Avatar
                sx={{ width: 36, height: 36, marginRight: "0.5rem" }}
                src={`${process.env.REACT_APP_URL}image/profile/${params.value.image}`}
              />
            )}
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
      field: "bookingDate",
      headerName: "วันที่จอง",
      flex: 0.4,
      minWidth: 120,
    },
    {
      field: "bookingTime",
      headerName: "เวลาที่จอง",
      flex: 0.6,
      minWidth: 160,
    },
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
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          const dataId = params.id;

          let data = bookingHealthcheck.find((item) => item.id == dataId);
          data.hospitalNmae = hospitalList.find(
            (item) => item.id == data.hospitalId
          ).name;

          setFullData(data);
          setOpenDialogData(true);
          setSave(false);
        };
        return (
          <Button variant="contained" onClick={onClick}>
            View
          </Button>
        );
      },
    },
  ];

  const preRowsTable = () => {
    let preRows = [];
    if (hospitalList && bookingHealthcheck && allUsers) {
      for (
        let runbooking = 0;
        runbooking < bookingHealthcheck.length;
        runbooking++
      ) {
        const thisData = bookingHealthcheck[runbooking];

        const profile = allUsers.find((item) => item.id == thisData.userId);
        const bookingDate = thisData.bookingDate;
        const bookingTime = thisData.bookingTime;
        const hospital = hospitalList.find(
          (item) => item.id == thisData.hospitalId
        ).name;
        const collectingType = thisData.collectingType;
        const booker = allUsers.find((item) => item.id == thisData.bookerId);
        const insertDate = thisData.insertDate;
        preRows.push({
          id: thisData.id,
          profile: profile,
          bookingDate: dayjs(bookingDate).format("DD-MM-YYYY"),
          bookingTime: bookingTime,
          hospital: hospital,
          collectingType: collectingType,
          booker: booker,
          insertDate: dayjs(insertDate).format("DD-MM-YYYY"),
        });
      }
    }
    setRows(preRows);
  };

  const handleImportFile = (file) => {
    setExternal(false);
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
      const preData = data.map((row, index) => {
        return {
          id: index + 10021,
          userId: row["employee id"],
          prefix: row["prefix"],
          firstname: row["firstname"],
          lastname: row["lastname"],
          phone: row["phone number"],
          email: row["Email"],
          nationalId: row["national id"],
          hospitalId: row["package id"],
          bookingDate: row["booking date"],
          bookingTime: row["booking time"],
          collectingType: row["collecting type"],
          bookerId: currentUser.id,
          insertDate: dayjs(new Date()).format("DD-MM-YYYY"),
        };
      });
      file = null;
      setExternal(preData);
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
          <Container maxWidth="xl">
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

              {external && (
                <Paper sx={{ p: 2 }}>
                  <DataGrid
                    rows={external}
                    rowHeight={64}
                    columns={rowsimportData}
                    getRowId={(row) => row.id}
                    autoHeight
                    checkboxSelection
                    disableSelectionOnClick
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    components={{
                      Toolbar: CustomToolbar,
                    }}
                  />
                  <Stack direction="row" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      onClick={() => {
                        setExternal(false);
                        setSave(true);
                      }}
                    >
                      save
                    </Button>
                  </Stack>
                </Paper>
              )}
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={save}
                onClose={() => setSave(false)}
                autoHideDuration={10000}
              >
                <Alert sx={{ width: "100%" }}>Save done!</Alert>
              </Snackbar>

              <Paper sx={{ p: 2 }}>
                {rows && (
                  <DataGrid
                    rows={
                      rows &&
                      rows
                        .filter(
                          (item) =>
                            (
                              item.profile.firstname +
                              " " +
                              item.profile.lastname
                            )
                              .toLowerCase()
                              .includes(search) == 1
                        )
                        .map((e) => {
                          return e;
                        })
                    }
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
        <Dialog
          open={openDialgoData}
          onClose={() => setOpenDialogData(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h4">#ID {fullData.id}</Typography>
          </DialogTitle>
          {fullData && (
            <DialogContent dividers>
              <Stack spacing={1} sx={{ p: 1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: 1 }}
                >
                  <Typography variant="body1">ชื่อ-สกุล</Typography>
                  <Typography variant="subtitle1">
                    {allUsers
                      .filter((item) => item.id == fullData.userId)
                      .slice(0, 1)
                      .map((e) => {
                        return e.firstname + " " + e.lastname;
                      })}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: 1 }}
                >
                  <Typography variant="body1">เบอร์โทรศัพท์</Typography>
                  <Typography variant="subtitle1">{fullData.phone}</Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: 1 }}
                >
                  <Typography variant="body1">E-mail</Typography>
                  <Typography variant="subtitle1">{fullData.email}</Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: 1 }}
                >
                  <Typography variant="body1">เลขบัตรประชาชน</Typography>
                  <Typography variant="subtitle1">
                    {fullData.nationalId}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: 1 }}
                >
                  <Typography variant="body1">package</Typography>
                  <Typography variant="subtitle1">
                    {
                      hospitalList.find(
                        (item) => item.id == fullData.hospitalId
                      ).name
                    }
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: 1 }}
                >
                  <Typography variant="body1">วันที่</Typography>
                  <Typography variant="subtitle1">
                    {dayjs(fullData.bookingDate).format("DD-MM-YYYY")}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: 1 }}
                >
                  <Typography variant="body1">เวลา</Typography>
                  <Typography variant="subtitle1">
                    {fullData.bookingTime}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: 1 }}
                >
                  <Typography variant="body1">ประเภทการเก็บเงิน</Typography>
                  <Typography variant="subtitle1">
                    {fullData.collectingType}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: 1 }}
                >
                  <Typography variant="body1">จองเมื่อวันที่</Typography>
                  <Typography variant="subtitle1">
                    {fullData.insertDate}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: 1 }}
                >
                  <Typography variant="body1">ผู้จอง</Typography>
                  <Typography variant="subtitle1">
                    {allUsers
                      .filter((item) => item.id == fullData.bookerId)
                      .slice(0, 1)
                      .map((e) => {
                        return e.firstname + " " + e.lastname;
                      })}
                  </Typography>
                </Stack>
              </Stack>
            </DialogContent>
          )}
          <DialogActions sx={{ p: 2 }}>
            <Button
              variant="contained"
              color="info"
              onClick={() => setOpenDialogData(false)}
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
