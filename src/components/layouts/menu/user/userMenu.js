import React from "react";
import ListMenu from "../../../pages/shared/listMenu";

import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PageviewIcon from "@mui/icons-material/Pageview";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Article,
  Backpack,
  Dashboard,
  DirectionsRun,
  HealthAndSafety,
  Inventory2,
  LocalHospital,
  LocalMall,
  RestorePage,
  SelfImprovement,
  Shop2,
  Spa,
} from "@mui/icons-material";

const UserMenu = ({ open }) => {
  const dataListMenu = [
    {
      listItemIcon: <HomeIcon />,
      listItemText: "Home",
      listLink: "/home",
      listKey: "home",
    },
    {
      listItemIcon: <Shop2 />,
      listItemText: "Shop",
      listLink: "",
      listKey: "Shop",
      collapse: [
        {
          listItemIcon: <Inventory2 />,
          listItemText: "Package Shop",
          listLink: "/allPackages",
          listKey: "allpackages",
        },
        {
          listItemIcon: <SelfImprovement />,
          listItemText: "Insurance Shop",
          listLink: "/allInsurance",
          listKey: "allinsurance",
        },
        {
          listItemIcon: <LocalMall />,
          listItemText: "Shopping Mall",
          listLink: "/shoppingMall",
          listKey: "shoppingmall",
        },
        {
          listItemIcon: <Backpack />,
          listItemText: "Travel Shop",
          listLink: "/travelShop",
          listKey: "travelShop",
        },
      ],
    },
    {
      listItemIcon: <HealthAndSafety />,
      listItemText: "Health",
      listLink: "",
      listKey: "health",
      collapse: [
        {
          listItemIcon: <Dashboard />,
          listItemText: "Dashboard",
          listLink: "/health/Dashboard",
          listKey: "healthDashboard",
        },
        {
          listItemIcon: <LocalHospital />,
          listItemText: "Treatment history",
          listLink: "/health/TreatmentHistory",
          listKey: "healthTreatmentHistory",
        },
        {
          listItemIcon: <Spa />,
          listItemText: "Health history",
          listLink: "/health/HealthHistory",
          listKey: "healthHealthHistory",
        },
        {
          listItemIcon: <Article />,
          listItemText: "Add Bill",
          listLink: "/health/AddBill",
          listKey: "addbill",
        },
        {
          listItemIcon: <RestorePage />,
          listItemText: "Bill history",
          listLink: "/health/BillHistory",
          listKey: "BillHistory",
        },
      ],
    },
    {
      listItemIcon: <DirectionsRun />,
      listItemText: "Health check",
      listLink: "",
      listKey: "healthcheck",
      collapse: [
        {
          listItemIcon: <LocalHospital />,
          listItemText: "Booking outsite",
          listLink: "/healthcheck/BookingOutsite",
          listKey: "BookingOutsite",
        },
      ],
    },
  ];

  return <ListMenu dataListMenu={dataListMenu} open={open} />;
};

export default UserMenu;
