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
import { Article, GroupWork } from "@mui/icons-material";

const AdminMenu = () => {
  const dataListMenu = [
    {
      listItemIcon: <GroupWork />,
      listItemText: "Create package",
      listLink: "/admin/FormPackage",
      listKey: "FormPackage",
    },
  ];

  return <ListMenu dataListMenu={dataListMenu} />;
};

export default AdminMenu;
