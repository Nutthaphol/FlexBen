import React from "react";
import ListMenu from "../../../pages/shared/listMenu";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import Filter3Icon from "@mui/icons-material/Filter3";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import {
  Article,
  Feed,
  FormatAlignCenter,
  GroupWork,
  Healing,
  HealthAndSafety,
  LocalHospital,
  ManageSearch,
  RequestPage,
  UploadFile,
} from "@mui/icons-material";
import { Form } from "formik";

const AdminMenu = ({ open }) => {
  const dataListMenu = [
    {
      listItemIcon: <GroupWork />,
      listItemText: "Create package",
      listLink: "/admin/FormPackage",
      listKey: "FormPackage",
    },
    {
      listItemIcon: <HealthAndSafety />,
      listItemText: "Health employee",
      listLink: "",
      listKey: "health",
      collapse: [
        {
          listItemIcon: <LocalHospital />,
          listItemText: "Health information",
          listLink: "/admin/health/HealthInformation",
          listKey: "HealthInformation",
        },
        {
          listItemIcon: <Healing />,
          listItemText: "Treatment information",
          listLink: "/admin/health/TreatmentInformation",
          listKey: "TreatmentInformation",
        },
        {
          listItemIcon: <ManageSearch />,
          listItemText: "Health history",
          listLink: "/admin/health/HealthHistory",
          listKey: "HealthHistory",
        },
        {
          listItemIcon: <RequestPage />,
          listItemText: "Bill request",
          listLink: "/admin/health/BillRequest",
          listKey: "billrequest",
        },
      ],
    },
  ];

  return <ListMenu dataListMenu={dataListMenu} open={open} />;
};

export default AdminMenu;
