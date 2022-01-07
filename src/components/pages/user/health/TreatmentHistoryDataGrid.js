import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Themplates from "../../shared/theme";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { getAllUsers, getUserProfile } from "../../../../actions/user";
import Profile from "../../shared/card/Profile";
import CoverPhoto from "../../shared/card/CoverPhoto";
import healthCheckService from "../../../../services/healthCheck.service";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Icon,
} from "@mui/material";
import healthServices from "../../../../services/health.services";
import rightTreatmentService from "../../../../services/rightTreatment.service";
import dayjs from "dayjs";
import treatmentCategoryService from "../../../../services/treatmentCategory.service";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { Clear, Search } from "@mui/icons-material";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  card: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    position: "relative",
    margin: "0px 0 40px",
    backgroundColor: "#121212",
    color: "#fff",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
  },
  cardW: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    position: "relative",
    margin: "0px 0 40px",
  },

  maxCard: {
    display: "flex",
    alignItems: "center",
    flexFlow: "row wrap",
  },
}));

const TreatmentHistoryDataGrid = () => {
  const classes = useStyles();
  const dispath = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: userProfile } = useSelector((state) => state.userProfile);

  const [searchList, setSearchList] = useState("");
  const [lastHealthCheck, setLastHealCheck] = useState();
  const [category, setCategory] = useState();
  const [rows, setRows] = useState([]);
  const columns = [
    {
      field: "date",
      headerName: "วันที่",
      width: 160,
    },
    {
      field: "list",
      headerName: "รายการ",
      width: 310,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Icon
              sx={{
                borderRadius: "50%",
                padding: "4px",
                backgroundColor: "LightCyan",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/Treatment-Report/${params.value.icon}`}
                width="100%"
              />
            </Icon>
            <Box sx={{ marginLeft: "1rem" }}>{params.value.section}</Box>
          </Box>
        );
      },
    },
    {
      field: "category",
      headerName: "ประเภท",
      width: 180,
      renderCell: (params) => {
        return (
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                width: "60px",
                padding: "4px",
                bgcolor:
                  params.value == "OPD"
                    ? "LightSkyBlue"
                    : params.value == "IPD"
                    ? "khaki"
                    : "LightSalmon",
                color:
                  params.value == "OPD"
                    ? "RoyalBlue"
                    : params.value == "IPD"
                    ? "OrangeRed"
                    : "FireBrick",
                borderRadius: "4px",
                fontWeight: "700",
              }}
              variant="subtitle2"
            >
              {params.value}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "location",
      headerName: "สถานที่",
      width: 200,
    },
    {
      field: "expess",
      headerName: "ค่ารักษา",
      width: 180,
    },
    {
      field: "over",
      headerName: "ส่วนเกิน",
      width: 180,
    },
    {
      field: "note",
      headerName: "หมายเหตุ",
      width: 180,
    },
  ];

  useEffect(async () => {
    const setupData = async (userId) => {
      // get last tratment of user for display date in profile card
      const lastHealthCheck_ = await healthCheckService.getLastHealthCheck(
        userId
      );
      setLastHealCheck(lastHealthCheck_);

      // get all health database
      const health_ = await healthServices.getHealthProfile(userId);
      const right_ = await rightTreatmentService.getRightTreatmentByUserId(
        userId
      );

      const category_ = await treatmentCategoryService.getTreatmentCategory();

      setCategory(category_);

      const rows_ = calDatatable(health_.treatment, right_, category_);
      console.log("rows_", rows_);
      setRows(rows_);
    };
    if (currentUser) {
      dispath(getUserProfile(currentUser.id));
      setupData(currentUser.id);
    }
  }, []);

  const calDatatable = (treatment, right, category) => {
    console.log("treatment", treatment);
    treatment = treatment.reduce((prev, curr) => {
      curr.rightUser == 1 && prev.push(curr);
      return prev;
    }, []);
    let preData = [];
    let rightUser = right.right.filter((item) => item.rightUser == 1) || false;

    for (let i = 0; i < treatment.length; i++) {
      let info = treatment[i];

      //   check over cover insurance
      let over = rightUser
        ? info.expess -
          rightUser.find(
            (item) => item.category == info.category && item.type == info.right
          ).cover
        : false;

      over = over && over > 0 ? over : 0;

      const row = {
        id: i,
        date: dayjs(info.dete).format("DD-MM-YYYY"),
        list: { icon: info.icon, section: info.section },
        category: category
          ? category.find((item) => item.id == info.category).name
          : "",
        location: info.location,
        expess: info.expess,
        over: over,
        note: info.note,
      };

      preData.push(row);
    }
    console.log("treatment", treatment);
    console.log("preData", preData);
    return preData;
  };

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
          {userProfile ? (
            <Box sx={{ marginBottom: "2rem" }}>
              <Container maxWidth="xl">
                <Paper className={classes.cardW}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="div">
                        ประวัติการรักษาพยาบาล
                      </Typography>
                    </Box>
                    <FormControl sx={{ width: "240px", margin: "1rem 1rem" }}>
                      <InputLabel size="small" id="Category">
                        ประเภท
                      </InputLabel>
                      <Select
                        size="small"
                        labelId="Category"
                        id="category"
                        label="ประเภท"
                      >
                        {/* <MenuItem value="">All</MenuItem> */}
                        {category &&
                          category.map((val, index) => (
                            <MenuItem key={index} value={val.name}>
                              {val.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={searchList}
                      sx={{ width: "240px", margin: "1rem 1rem" }}
                      onChange={(e) => setSearchList(e.target.value)}
                      InputProps={{
                        startAdornment: <Search fontSize="small" />,
                        endAdornment: (
                          <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{
                              visibility:
                                searchList != "" ? "visible" : "hidden",
                            }}
                            onClick={() => setSearchList("")}
                          >
                            <Clear fontSize="small" />
                          </IconButton>
                        ),
                      }}
                      placeholder="Search…"
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "auto",
                    }}
                  >
                    {
                      <DataGrid
                        rows={rows && rows}
                        columns={columns}
                        autoHeight
                        checkboxSelection
                        disableSelectionOnClick
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        components={{
                          Toolbar: CustomToolbar,
                        }}
                        sx={{
                          "&.MuiDataGrid-root": {
                            border: "none",
                          },
                        }}
                      />
                    }
                  </Box>
                </Paper>
              </Container>
            </Box>
          ) : (
            ""
          )}
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default TreatmentHistoryDataGrid;
