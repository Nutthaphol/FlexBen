import React from "react";
import ListMenu from "../../../pages/shared/listMenu";

import DoneAllIcon from "@mui/icons-material/DoneAll";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { RequestPage } from "@mui/icons-material";

const ManagerMenu = () => {
  const dataListMenu = [
    {
      listItemIcon: <RequestPage />,
      listItemText: "Bill request",
      listLink: "/manager/health/BillRequest",
      listKey: "billrequest",
    },
  ];

  return <ListMenu dataListMenu={dataListMenu} />;
};

export default ManagerMenu;
