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
import treatmentTypeService from "../../../../services/treatmentType.service";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  firstTab: {
    // borderStyle: "solid",
    // borderColor: "#D0D3D4",
    // borderWidth: "1px 1px 0px 1px",
    margin: "1px 1px 0px",
  },
  seconTab: {
    minWidth: "120px",
  },
  text: {
    fontWeight: "600",
  },
}));

const TabCustomRight = (props) => {
  const { right, useRight } = props;
  const classes = useStyles();
  const [treatmentType, setTreatmentType] = useState();
  const [tabCategorieTreatment, setTabCategorieTreatment] = useState(1);
  const [tabRightUser, setTabRightUser] = useState([
    "employee",
    "employee",
    "employee",
  ]);
  const [infoRight, setInfoRight] = useState();
  const [infoUseRight, setInfoUseRight] = useState();

  useEffect(async () => {
    if (!infoRight && right) {
      dataRight(tabCategorieTreatment, tabRightUser[tabCategorieTreatment - 1]);
    }
    if (!infoUseRight && useRight && right) {
      dataUseRight(
        tabCategorieTreatment,
        tabRightUser[tabCategorieTreatment - 1]
      );
    }
    if (!treatmentType) {
      const treatmentType_ = await treatmentTypeService.getTreatmentType();
      setTreatmentType(treatmentType_);
    }
  }, [infoRight, right, useRight, infoUseRight, treatmentType]);

  const handelOnChangeTabCategory = (value) => {
    setTabCategorieTreatment(value);
    dataRight(value, tabRightUser[value - 1]);
    dataUseRight(value, tabRightUser[value - 1]);
  };
  const handelOnChangeTabRightUser = (value, index) => {
    const right_ = [...tabRightUser];
    right_[index] = value;
    setTabRightUser(right_);
    dataRight(tabCategorieTreatment, value);
    dataUseRight(tabCategorieTreatment, value);
  };

  const dataRight = (category, rightUser) => {
    const dataRight = right.right
      .filter((item) => item.type == category)
      .map((item) => {
        var tmp = null;
        if (rightUser == "employee") {
          tmp = item.employee;
          tmp = tmp.reduce((prev, curr) => {
            curr.icon = "participant.svg";
            prev.push(curr);
            return prev;
          }, []);
        } else if (rightUser == "family") {
          tmp = item.family;
          tmp = tmp.reduce((prev, curr) => {
            curr.icon = "big-family.svg";
            prev.push(curr);
            return prev;
          }, []);
        } else {
          tmp = [];
        }
        return tmp;
      });
    setInfoRight(dataRight[0]);
  };

  const dataUseRight = (category, rightUser) => {
    const data = useRight
      .filter((item) => item.right == rightUser && item.category == category)
      .map((val) => {
        return val;
      });

    const detail = right.right.filter((item) => item.type == category);

    const maxCost =
      rightUser == "employee"
        ? detail[0].employee[0].maxCost
        : rightUser == "family"
        ? detail[0].family[0].maxCost
        : "";

    const dataUseRight = {};
    dataUseRight.icon =
      rightUser == "employee"
        ? "participant.svg"
        : rightUser == "family"
        ? "big-family.svg"
        : "";
    dataUseRight.category =
      treatmentType && treatmentType.find((item) => item.type == category).name;
    dataUseRight.describtion =
      rightUser == "employee"
        ? detail[0].employee[0].detail
        : rightUser == "family"
        ? detail[0].family[0].detail
        : "";
    dataUseRight.expenss = data.reduce((prev, curr) => prev + curr.expenss, 0);
    dataUseRight.cover = (dataUseRight.expenss * 100) / maxCost;
    dataUseRight.cover =
      dataUseRight.cover > 100 ? 100 : dataUseRight.cover.toFixed(2);
    dataUseRight.maxCost = maxCost;

    console.log("dataUseRight.cover", dataUseRight.cover);
    setInfoUseRight(dataUseRight);
  };
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
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
              sx={{ padding: "0 2rem" }}
              value={tabRightUser[tabCategorieTreatment - 1]}
              onChange={(e, value_) =>
                handelOnChangeTabRightUser(value_, tabCategorieTreatment - 1)
              }
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab
                className={classes.seconTab}
                label="พนักงาน"
                value="employee"
              />
              <Tab
                className={classes.seconTab}
                label="ครอบครัว"
                value="family"
              />
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
                category={val.category && val.category}
                describtion={val.detail && val.detail}
                cover={
                  val.maxCost &&
                  `${val.maxCost} ${
                    typeof val.maxCost == "number" ? val.unit : ""
                  }`
                }
                time={val.quantity && `${val.quantity} ครั้ง`}
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
          {infoUseRight && (
            <CardUseRight
              icon={infoUseRight.icon}
              category={infoUseRight.category}
              cover={infoUseRight.cover}
              maxCost={infoUseRight.maxCost}
              expenss={infoUseRight.expenss}
              describtion={infoUseRight.describtion}
            />
          )}
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default TabCustomRight;
