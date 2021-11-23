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
import { LocalMall } from "@mui/icons-material";

const UserMenu = () => {
  const dataListMenu = [
    {
      listItemIcon: <HomeIcon />,
      listItemText: "Home",
      listLink: "/home",
      listKey: "home",
    },
    {
      listItemIcon: <LocalMall />,
      listItemText: "Shopping Mall",
      listLink: "/shoppingMall",
      listKey: "shoppingmall",
    },
  ];

  return <ListMenu dataListMenu={dataListMenu} />;
};

export default UserMenu;
