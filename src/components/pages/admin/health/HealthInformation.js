import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import Themplates from "../../shared/theme";
import {
  Avatar,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import healthServices from "../../../../services/health.services";
import { getAllUsers } from "../../../../actions/user";
import { getAllHealthInfo } from "../../../../actions/health";
import { Box } from "@mui/system";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";
import { getAllRightTreatment } from "../../../../actions/rightTreatment";
import { Clear, Search } from "@mui/icons-material";
import HeaderSearch from "../../shared/textBox/HeaderSearch";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  cardW: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    position: "relative",
    margin: "0px 0 40px",
  },
}));

const HealthInformation = () => {
  const classes = useStyles();
  const dispath = useDispatch();
  const [rows, setRows] = useState();
  const [searchList, setSearchList] = useState("");
  const [lastHealthCheck, setLastHealCheck] = useState();
  const [category, setCategory] = useState();

  const { user: currantUser } = useSelector((state) => state.auth);
  const { result: allUsers } = useSelector((state) => state.users);
  const { result: allHealth } = useSelector((state) => state.health);
  const { result: allRightTreatment } = useSelector(
    (state) => state.rightTreatment
  );

  useEffect(() => {
    !allUsers && dispath(getAllUsers());
    !allHealth && dispath(getAllHealthInfo());
    !allRightTreatment && dispath(getAllRightTreatment());

    const setupData = () => {
      let rows_ = [];

      for (let i = 0; i < allUsers.length; i++) {
        const user = allUsers[i];
        const healthData = allHealth.filter((item) => item.userId == user.id);
        const rightTreat = allRightTreatment.filter(
          (item) => item.userId == user.id
        );

        let opd = "-";
        let ipd = "-";
        let lastTreatment = "-";
        let used = "-";
        let cover = "-";
        let pending = true;

        if (healthData.length > 0) {
          opd = healthData.reduce((prev, curr) => {
            prev =
              prev + curr.treatment.filter((item) => item.category == 1).length;
            return prev;
          }, 0);
          ipd = healthData.reduce((prev, curr) => {
            prev =
              prev + curr.treatment.filter((item) => item.category == 2).length;
            return prev;
          }, 0);

          lastTreatment = healthData.at(-1).treatment.at(-1).section;

          used = healthData.reduce((prev, curr) => {
            prev =
              prev +
              curr.treatment.reduce((prev2, curr2) => {
                return prev2 + curr2.expenses;
              }, 0);
            return prev;
          }, 0);

          // pending = healthData.at(-1).treatment.at(-1).state.at(-1).clear
          //   ? "??????????????????"
          //   : "?????????????????????????????????";

          const row = {
            id: user.id,
            profile: {
              firstname: user.firstname,
              lastname: user.lastname,
              image: user.image,
            },
            opd: opd,
            ipd: ipd,
            lastTreatment: lastTreatment,
            used: "??? " + used.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            pending: pending,
          };
          rows_.push(row);
        }
      }
      setRows(rows_);
    };

    if (currantUser && allUsers && allHealth && allRightTreatment) {
      setupData();
    }
  }, [allUsers, allHealth, allRightTreatment]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.1, minWidth: 60 },
    {
      field: "profile",
      headerName: "????????????-????????????",
      flex: 1,
      minWidth: 280,
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
              {`${params.value.firstname + " " + params.value.lastname}`}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "opd",
      headerName: "OPD (???????????????)",
      flex: 0.4,
      minWidth: 120,
    },
    {
      field: "ipd",
      headerName: "IPD (???????????????)",
      flex: 0.4,
      minWidth: 120,
    },
    {
      field: "lastTreatment",
      headerName: "???????????????????????????????????????????????????",
      flex: 0.4,
      minWidth: 180,
    },
    {
      field: "used",
      headerName: "???????????????",
      flex: 0.4,
      minWidth: 120,
    },
    // {
    //   field: "pending",
    //   headerName: "?????????????????????????????????",
    //   width: 240,
    // },
  ];

  const CustomToolbar = (props) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <GridToolbarContainer className={gridClasses.toolbarContainer}>
          <GridToolbarExport sx={{ borderRadius: "4px" }} variant="text" />
        </GridToolbarContainer>
      </Box>
    );
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
          <Container maxWidth="xl">
            <HeaderSearch
              setSearch={setSearchList}
              normalText="?????????????????????????????????????????????????????????"
            />

            <Paper sx={{ p: 2, mb: 4, mt: 4 }}>
              {rows && (
                <DataGrid
                  rowHeight={64}
                  rows={
                    rows &&
                    rows
                      .filter(
                        (item) =>
                          (item.profile.firstname + " " + item.profile.lastname)
                            .toLowerCase()
                            .includes(searchList) == 1
                      )
                      .map((e) => {
                        return e;
                      })
                  }
                  columns={columns}
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
          </Container>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default HealthInformation;
