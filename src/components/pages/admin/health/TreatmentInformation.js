import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../../shared/theme";
import { Box } from "@mui/system";
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
import { Clear, Search } from "@mui/icons-material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";
import healthServices from "../../../../services/health.services";
import { getAllUsers } from "../../../../actions/user";
import { getAllHealthInfo } from "../../../../actions/health";
import { getAllRightTreatment } from "../../../../actions/rightTreatment";
import healthCheckCategoryService from "../../../../services/healthCheckCategory.service";
import treatmentCategoryService from "../../../../services/treatmentCategory.service";
import dayjs from "dayjs";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  cardW: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    position: "relative",
    margin: "0px 0 40px",
  },
}));
const TreatmentInformation = () => {
  const classes = useStyles();
  const dispath = useDispatch();
  const [rows, setRows] = useState();
  const [searchList, setSearchList] = useState("");
  const [lastHealthCheck, setLastHealCheck] = useState();
  const [category, setCategory] = useState();
  const [selectCategory, setSelectCategory] = useState();

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

    const setupData = async () => {
      let rows_ = [];

      const category_ = await treatmentCategoryService.getTreatmentCategory();
      setCategory(category_);

      for (let i = 0; i < allUsers.length; i++) {
        const user = allUsers[i];
        const healthData = allHealth
          .filter((item) => item.userId == user.id)
          .map((e) => {
            return e.treatment;
          });
        if (healthData.length > 0) {
          const OPDTreatment = healthData[0].filter(
            (item) => item.category == 1
          );
          const IPDTreatment = healthData[0].filter(
            (item) => item.category == 2
          );
          const dentalTreatment = healthData[0].filter(
            (item) => item.category == 3
          );

          let themplateRow = {
            id: user.id,
            date: "-",
            profile: {
              firstname: user.firstname,
              lastname: user.lastname,
              image: user.image,
            },
          };
          if (OPDTreatment) {
            let OPDRow = { ...themplateRow };
            OPDRow.id = "#1-" + themplateRow.id;
            OPDRow.date = dayjs(OPDTreatment.at(-1).date).format("DD-MM-YYYY");
            OPDRow.expenses =
              "฿ " +
              OPDTreatment.reduce((prev, curr) => {
                return prev + curr.expenses;
              }, 0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            OPDRow.category =
              category_ && category_.find((item) => item.id == 1).name;

            console.log("OPDRow", OPDRow);
            rows_.push({ ...OPDRow });
          }

          if (IPDTreatment) {
            let IPDRow = { ...themplateRow };
            IPDRow.id = "#2-" + themplateRow.id;
            IPDRow.date = dayjs(IPDTreatment.at(-1).date).format("DD-MM-YYYY");
            IPDRow.expenses =
              "฿ " +
              IPDTreatment.reduce((prev, curr) => {
                return prev + curr.expenses;
              }, 0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            IPDRow.category =
              category_ && category_.find((item) => item.id == 2).name;

            console.log("IPDRow", IPDRow);
            rows_.push({ ...IPDRow });
          }

          if (dentalTreatment) {
            let dentalRow = { ...themplateRow };
            dentalRow.id = "#3-" + themplateRow.id;
            dentalRow.date = dayjs(dentalTreatment.at(-1).date).format(
              "DD-MM-YYYY"
            );
            dentalRow.expenses =
              "฿ " +
              dentalTreatment
                .reduce((prev, curr) => {
                  return prev + curr.expenses;
                }, 0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            dentalRow.category =
              category_ && category_.find((item) => item.id == 3).name;

            console.log("dentalRow", dentalRow);
            rows_.push({ ...dentalRow });
          }
        }
      }

      setRows(rows_);
    };

    if (currantUser && allUsers && allHealth && allRightTreatment) {
      setupData();
    }
  }, [allUsers, allHealth, allRightTreatment]);

  const CustomToolbar = (props) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <GridToolbarContainer className={gridClasses.toolbarContainer}>
          <GridToolbarExport sx={{ borderRadius: "4px" }} variant="text" />
        </GridToolbarContainer>
      </Box>
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "date", headerName: "วันที่", width: 240 },
    {
      field: "profile",
      headerName: "ชื่อ-สกุล",
      width: 400,
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
      field: "category",
      headerName: "ประเภทการรักษา",
      width: 320,
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
      field: "expenses",
      headerName: "ค่าใช้จ่ายทั้งหมด",
      width: 240,
    },
  ];

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
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
                    ข้อมูลการรักษาพยาบาล
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
                    onChange={(e) => setSelectCategory(e.target.value)}
                  >
                    <MenuItem value={"all"}>{`ทั้งหมด`}</MenuItem>
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
                          visibility: searchList != "" ? "visible" : "hidden",
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
                {/* {rows && ( */}
                <DataGrid
                  rows={
                    rows &&
                    rows
                      .filter(
                        (item) =>
                          (item.profile.firstname + " " + item.profile.lastname)
                            .toLowerCase()
                            .includes(searchList) == 1
                      )
                      .filter((item) =>
                        selectCategory && selectCategory != "all"
                          ? item.category == selectCategory
                          : true
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
                  sx={{
                    "&.MuiDataGrid-root": {
                      border: "none",
                    },
                  }}
                />
                {/* )} */}
              </Box>
            </Paper>
          </Container>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default TreatmentInformation;
