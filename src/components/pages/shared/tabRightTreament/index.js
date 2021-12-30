import React, { Fragment, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles, styled } from "@mui/styles";
import { grey } from "@mui/material/colors";
import { Box, display } from "@mui/system";
import { useState } from "react";
import { Tab, Tabs, Typography } from "@mui/material";
import CardRight from "./CardRight";
import CardUseRight from "./CardUseRight";
import treatmentCategoryService from "../../../../services/treatmentCategory.service";
import Themplates from "../theme";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  firstTab: {
    margin: "1px 1px 0px",
    fontWeight: 600,
    fontSize: "1rem",
    color: "#fff",
    "&.MuiButtonBase-root.MuiTab-root.Mui-selected": {
      color: "#0288d1",
    },
  },
  seconTab: {
    color: "#fff",
    minWidth: "120px",
    fontWeight: 600,
    fontSize: "1rem",
    "&.MuiButtonBase-root.MuiTab-root.Mui-selected": {
      color: "#ab47bc",
    },
  },
  text: {
    fontWeight: "600",
    color: "#fff",
  },
  indicator1: {
    backgroundColor: "#0288d1",
    height: "3px",
  },
  indicator2: {
    backgroundColor: "#ab47bc",
    height: "3px",
  },
}));

const TabCustomRight = (props) => {
  const { right, useRight } = props;
  const classes = useStyles();
  const [treatmentCategory, setTreatmentCategory] = useState();
  const [tabCategorieTreatment, setTabCategorieTreatment] = useState(1);
  const [tabRightUser, setTabRightUser] = useState([1, 1, 1]);
  const [infoRight, setInfoRight] = useState();
  const [infoUseRight, setInfoUseRight] = useState();

  useEffect(async () => {
    if (!infoRight && right) {
      dataRight(tabCategorieTreatment, tabRightUser[tabCategorieTreatment - 1]);
      dataUseRight(
        tabCategorieTreatment,
        tabRightUser[tabCategorieTreatment - 1]
      );
    }
    // if (!infoUseRight && useRight && right) {
    //   dataUseRight(
    //     tabCategorieTreatment,
    //     tabRightUser[tabCategorieTreatment - 1]
    //   );
    // }
    if (!treatmentCategory) {
      const treatmentCategory_ =
        await treatmentCategoryService.getTreatmentCategory();
      setTreatmentCategory(treatmentCategory_);
    }
  }, [infoRight, right, useRight, infoUseRight, treatmentCategory]);

  const handelOnChangeTabCategory = (value) => {
    setTabCategorieTreatment(value);
    dataRight(value, tabRightUser[value - 1]);
    dataUseRight(value, tabRightUser[value - 1]);
  };
  const handelOnChangeTabRightUser = (value, index) => {
    const right_ = [...tabRightUser];
    right_[index] = value;
    dataRight(tabCategorieTreatment, value);
    dataUseRight(tabCategorieTreatment, value);
    setTabRightUser(right_);
  };

  const dataRight = (category, rightUser) => {
    let tmpData;
    if (right) {
      const right_ = right.right;
      tmpData = right_.reduce((prev, curr) => {
        if (curr.category == category && curr.rightUser == rightUser) {
          curr.icon = rightUser == 1 ? "participant.svg" : "big-family.svg";
          prev.push(curr);
        }
        return prev;
      }, []);
    }
    setInfoRight([...tmpData]);
  };

  const dataUseRight = (category, rightUser) => {
    let tmpData = [];
    if (useRight && right) {
      // filter category and type
      const filter1 = right.right
        .filter(
          (item) => item.rightUser == rightUser && item.category == category
        )
        .map((val) => {
          return val;
        });
      console.log("filter1", filter1);

      filter1.map((val) => {
        let createData = {};
        const tmp = useRight.filter(
          (item) =>
            item.category == category &&
            item.right == val.type &&
            item.rightUser == rightUser
        );
        createData.icon = rightUser == 1 ? "participant.svg" : "big-family.svg";
        createData.category = category;
        createData.right = val.type;
        createData.count = tmp.length;
        createData.expess = tmp.reduce((prev, curr) => prev + curr.expess, 0);
        createData.countMethod = val.countMethod;
        createData.cover = val.cover;
        createData.period = val.period;
        createData.description = val.description;
        createData.unitCover = val.unitCover;
        createData.unitPeriod = val.unitPeriod;
        createData.usedP =
          createData.countMethod == "time"
            ? (createData.count * 100) / createData.period
            : (createData.expess * 100) / createData.period;
        createData.final =
          createData.countMethod == "time"
            ? createData.period - createData.count
            : createData.period - createData.expess;
        tmpData.push({ ...createData });
      });
    }
    console.log("tmpData", tmpData);
    setInfoUseRight([...tmpData]);
  };
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              borderBottom: 1,
              borderBottom: "1px solid",
              borderColor: "rgba(255, 255, 255, 0.12)",
            }}
          >
            <Tabs
              classes={{ indicator: classes.indicator1 }}
              value={tabCategorieTreatment}
              onChange={(e, value_) => handelOnChangeTabCategory(value_)}
            >
              <Tab className={classes.firstTab} label="OPD" value={1} />
              <Tab className={classes.firstTab} label="IPD" value={2} />
              <Tab className={classes.firstTab} label="Dental" value={3} />
            </Tabs>
          </Box>
          <Box>
            <Tabs
              classes={{ indicator: classes.indicator2 }}
              sx={{ padding: "0 2rem" }}
              value={tabRightUser[tabCategorieTreatment - 1]}
              onChange={(e, value_) =>
                handelOnChangeTabRightUser(value_, tabCategorieTreatment - 1)
              }
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab className={classes.seconTab} label="พนักงาน" value={1} />
              <Tab className={classes.seconTab} label="ครอบครัว" value={2} />
            </Tabs>
          </Box>
          <br />
          <Typography
            variant="h6"
            component="div"
            className={classes.text}
            color="text.secondary"
          >
            จำนวนสิทธิ
          </Typography>

          {infoRight &&
            infoRight.map((val, index) => (
              <CardRight
                key={index}
                icon={val.icon && val.icon}
                category={
                  treatmentCategory.find((item) => item.id == val.category).name
                }
                description={val.description}
                cover={
                  typeof val.cover == "number"
                    ? val.cover
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                      " " +
                      val.unitCover
                    : val.cover
                }
                period={
                  val.period &&
                  val.period.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                    " " +
                    val.unitPeriod
                }
                theme={theme}
              />
            ))}
          <br />
          <Typography
            variant="h6"
            component="div"
            className={classes.text}
            color="text.secondary"
          >
            ใช้ไป
          </Typography>
          {infoUseRight &&
            infoUseRight.map((val, index) => (
              <CardUseRight
                key={index}
                icon={val.icon}
                category={
                  treatmentCategory.find((item) => item.id == val.category).name
                }
                description={val.description}
                usedP={val.usedP}
                method={val.countMethod}
                final={val.final}
                unit={val.unitPeriod}
                theme={theme}
              />
            ))}
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default TabCustomRight;
