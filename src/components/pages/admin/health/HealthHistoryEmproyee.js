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

import XlsxPopulate from "xlsx-populate";
import { saveAs } from "file-saver";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";
import { Clear, Search } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import healthCheckCategoryService from "../../../../services/healthCheckCategory.service";
import healthCheckService from "../../../../services/healthCheck.service";
import { getAllUsers } from "../../../../actions/user";
import dayjs from "dayjs";
import { getAllHealthCheck } from "../../../../actions/healthCheck";
import { getHealthCheckCategory } from "../../../../actions/healthCheckCategory";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  cardW: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    position: "relative",
    margin: "0px 0 40px",
  },
}));

const dataGridWidthInfo = 990;
const yearWidth = 80;
const profileWidth = 320;

const defaultColums = [
  {
    field: "year",
    heanderName: "ปี",
    width: yearWidth,
  },
  {
    field: "profile",
    heanderName: "ชื่อ-สกุล",
    width: profileWidth,
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
];

let listYears = [];

const HealthHistoryEmproyee = () => {
  const classes = useStyles();
  const dispath = useDispatch();
  const [rows, setRows] = useState();
  const [columns, setColumns] = useState();
  const [searchList, setSearchList] = useState("");
  const [healthCheckTab, setHealthCheckTab] = useState(0);
  const [healthCheck, setHealthCheck] = useState();
  const [selectYear, setSelectYear] = useState();
  const [healthCheckBox, setHealthCheckBox] = useState();
  const [selectUser, setSelectUser] = useState([]);

  const { user: currantUser } = useSelector((state) => state.auth);
  const { result: allUsers } = useSelector((state) => state.users);
  const { result: allHealthCheck } = useSelector((state) => state.healthCheck);

  useEffect(async () => {
    if (listYears.length == 0) {
      let nowYaers = new Date().getFullYear();
      let oldYear = new Date("2020").getFullYear();

      while (nowYaers >= oldYear) {
        listYears.push(nowYaers);
        nowYaers = nowYaers - 1;
      }
    }

    !allUsers && dispath(getAllUsers());
    !allHealthCheck && dispath(getAllHealthCheck());
    if (!healthCheckBox && !healthCheck) {
      const healthCheck_ =
        await healthCheckCategoryService.getHealthCheckCategory();

      const checkList_ = healthCheck_.map((e) => {
        return false;
      });

      setHealthCheck(healthCheck_);
      setHealthCheckBox(checkList_);
    }

    if (allUsers && allHealthCheck) {
      const healthCheck_ = await healthCheckService.getAllHealthCheck();
      setDataGrids();
    }
  }, [
    healthCheckBox,
    allUsers,
    allHealthCheck,
    healthCheckTab,
    searchList,
    // selectYear,
  ]);

  const handleCheckAll = (e) => {
    const data = [...healthCheckBox];
    let checkAll = data.reduce((prev, curr) => {
      prev.push(e.target.checked);
      return prev;
    }, []);
    setHealthCheckBox([...checkAll]);
  };

  const handleChecked = (e, index) => {
    let data = [...healthCheckBox];
    data[index] = e.target.checked;
    setHealthCheckBox([...data]);
  };

  const handleTab = (e, index) => {
    setHealthCheckTab(index);
  };

  const setDataGrids = (index = healthCheckTab + 1) => {
    const category_ = index;
    const data = allHealthCheck;

    // set columns of data grid table
    const columns_ = [...defaultColums];

    let label = data[0].time[0].testResult.find(
      (item) => item.category == category_
    );

    label = label.result.map((e) => {
      return e.section;
    });

    const thisWidth = parseInt(dataGridWidthInfo / label.length);

    for (let i = 0; i < label.length; i++) {
      columns_.push({
        field: label[i],
        heanderName: label[1],
        width: thisWidth,
      });
    }

    setColumns([...columns_]);

    // set rows of data grid table

    let rows_ = [];

    for (let i = 0; i < allUsers.length; i++) {
      const user = allUsers[i];
      // select health check data of user
      const healthCheckProfile = data.filter((item) => item.userId == user.id);
      // if have, continue
      if (healthCheckProfile.length > 0) {
        for (let j = 0; j < healthCheckProfile.length; j++) {
          // select year
          const year = healthCheckProfile[j].time;

          // set data grid row form above condition
          for (let z = 0; z < year.length; z++) {
            const inTime = year[z];
            // select category form teb select
            const categoryData = inTime.testResult.find(
              (item) => item.category == category_
            );
            let row = {
              id: user.id + "-" + dayjs(inTime.dateTest).format("MM-YYYY"),
              year: dayjs(inTime.dateTest).format("YYYY"),
              profile: {
                firstname: user.firstname,
                lastname: user.lastname,
                image: user.image,
              },
            };

            row = categoryData.result.reduce((prev, curr) => {
              prev[curr.section] = curr.value + " " + curr.unit;
              return prev;
            }, row);

            rows_.push({ ...row });
          }
        }
      }
    }

    setRows(rows_);
  };

  const exportCSV = async () => {
    let data = [];
    let header = [];
    let sheetname = [];

    let cateId = healthCheckBox
      .map((e, index) => {
        if (e) {
          return index + 1;
        }
        return;
      })
      .reduce((prev, curr) => {
        curr && prev.push(curr);
        return prev;
      }, []);

    for (let i = 0; i < cateId.length; i++) {
      const idc = cateId[i];
      // create sheet name
      const sheetname_ = healthCheck.find((item) => item.id == idc).shortname;

      // create header

      let hearder_ = ["ปี", "ชื่อ-สกุล"];
      const listHeader = allHealthCheck[0].time[0].testResult
        .find((item) => item.category == idc)
        .result.map((e) => {
          return e.section;
        });
      hearder_ = hearder_.concat(listHeader);

      // create data

      let data_ = [];
      for (let i = 0; i < selectUser.length; i++) {
        const userId = selectUser[i];
        const user = allUsers.find((item) => item.id == userId);
        const healthCheckProfile = allHealthCheck.filter(
          (item) => item.userId == userId
        );
        if (healthCheckProfile.length > 0) {
          // each category
          for (let j = 0; j < healthCheckProfile.length; j++) {
            const year = healthCheckProfile[j].time;
            // each user
            for (let z = 0; z < year.length; z++) {
              const inTime = year[z];
              // select category form teb select
              const categoryData = inTime.testResult.find(
                (item) => item.category == idc
              );
              let row = {
                year: dayjs(inTime.dateTest).format("YYYY"),
                name: user.firstname + " " + user.lastname,
              };
              row = categoryData.result.reduce((prev, curr) => {
                prev[curr.section] = curr.value + " " + curr.unit;
                return prev;
              }, row);

              data_.push({ ...row });
            }
          }
        }
      }

      // final data
      header.push(hearder_);
      sheetname.push(sheetname_);
      data.push(data_);
    }

    XlsxPopulate.fromBlankAsync().then(async (workbook) => {
      for (let i = 0; i < sheetname.length; i++) {
        const inSheet = workbook.addSheet(sheetname[i]);
        const sheetData = getSheetData(data[i], header[i]);
        const totalColumns = sheetData[0].length;

        console.log("sheetData", sheetData);

        inSheet.cell("A1").value(sheetData);
        const range = inSheet.usedRange();
        const endColumn = String.fromCharCode(64 + totalColumns);
        inSheet.row(1).style("bold", true);
        inSheet.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
        range.style("border", true);
      }
      workbook.deleteSheet("Sheet1");

      return workbook.outputAsync().then((res) => {
        saveAs(res, "Testfile.xlsx");
      });
    });

    console.log("cateId", cateId);
    console.log("sheetname", sheetname);
    console.log("header", header);
    console.log("data", data);
  };

  const getSheetData = (data, header) => {
    var fields = Object.keys(data[0]);
    var sheetData = data.map(function (row) {
      return fields.map(function (fieldName) {
        return row[fieldName] ? row[fieldName] : "";
      });
    });
    sheetData.unshift(header);
    return sheetData;
  };

  const CustomToolbar = (props) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <GridToolbarContainer className={gridClasses.toolbarContainer}>
          <Button
            onClick={() => exportCSV()}
            disabled={
              selectUser.length == 0 || healthCheckBox.indexOf(true) == -1
                ? true
                : false
            }
          >
            Export
          </Button>
        </GridToolbarContainer>
      </Box>
    );
  };
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
                    ข้อมูลประวัติการตรวจสุขภาพ
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    flexWrap: "wrap",
                  }}
                >
                  <FormControl sx={{ width: "240px", margin: "1rem 1rem" }}>
                    <InputLabel size="small" id="Category">
                      ประเภท
                    </InputLabel>
                    <Select
                      size="small"
                      labelId="Category"
                      id="category"
                      label="ประเภท"
                      onChange={(e) => setSelectYear(e.target.value)}
                    >
                      <MenuItem value={"all"}>{`ทั้งหมด`}</MenuItem>
                      {listYears.length > 0 &&
                        listYears.map((val, index) => (
                          <MenuItem key={index} value={val}>
                            {val}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={searchList}
                    sx={{ width: "240px", margin: "1rem 1rem" }}
                    onChange={(e) =>
                      setSearchList(e.target.value.toLowerCase())
                    }
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
                    placeholder="Search name"
                  />
                </Box>
              </Box>
              {healthCheck && healthCheckBox && (
                <Fragment>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", margin: "0 1rem" }}
                  >
                    <FormControlLabel
                      sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                      label="Check all"
                      control={
                        <Checkbox
                          checked={healthCheckBox.every((e) => e == true)}
                          indeterminate={
                            healthCheckBox.every((e) => e == false)
                              ? false
                              : healthCheckBox.every((e) => e == true)
                              ? false
                              : true
                          }
                          onChange={(e) => handleCheckAll(e)}
                        />
                      }
                    />

                    {healthCheckBox.map((val, index) => (
                      <FormControlLabel
                        sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                        key={index}
                        label={healthCheck[index].shortname}
                        control={<Checkbox checked={val} />}
                        onChange={(e) => handleChecked(e, index)}
                      />
                    ))}
                  </Box>
                  <Box sx={{ overflow: "auto" }}>
                    <Tabs
                      value={healthCheckTab}
                      onChange={(e, value) => handleTab(e, value)}
                    >
                      {healthCheck.map((val, index) => (
                        <Tab key={index} id={index} label={val.shortname} />
                      ))}
                    </Tabs>
                  </Box>
                </Fragment>
              )}
              <Box
                sx={{
                  width: "100%",
                  height: "auto",
                }}
              >
                {rows && columns && (
                  <DataGrid
                    rows={rows
                      // search
                      .filter(
                        (item) =>
                          (item.profile.firstname + " " + item.profile.lastname)
                            .toLowerCase()
                            .includes(searchList) == 1
                      )
                      // select year
                      .filter((item) =>
                        selectYear && selectYear != "all"
                          ? item.year == selectYear
                          : true
                      )
                      .map((e) => {
                        return e;
                      })}
                    columns={columns}
                    autoHeight
                    checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={(select) => {
                      setSelectUser(
                        select.map((e) => {
                          return parseInt(e.split("-")[0]);
                        })
                      );
                    }}
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
                )}
              </Box>
            </Paper>
          </Container>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default HealthHistoryEmproyee;
