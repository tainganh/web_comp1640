import Dashboard from "views/Dashboard.jsx";
import Category from "views/Category.jsx";
import Topics from "views/Topics.jsx";
import Users from "./views/Users.jsx";
import Students from "./views/Students.jsx";
import Coordinator from "./views/MarketingCoordinator";
import Manager from "./views/Manager.jsx";
import Guest from "./views/Guest.jsx";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/types",
    name: "Manage Faculties",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: Category,
    layout: "/admin"
  },
  {
    path: "/topics",
    name: "Manage Topics",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: Topics,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Manage Users",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: Users,
    layout: "/admin"
  },
  {
    path: "/students",
    name: "Upload Actical",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: Students,
    layout: "/admin"
  },
  {
    path: "/coordinator",
    name: "MKT Coordinator",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Coordinator,
    layout: "/admin"
  },
  {
    path: "/manager",
    name: "MKT Manager",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-puzzle-10",
    component: Manager,
    layout: "/admin"
  },
  {
    path: "/guest",
    name: "Guest",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-puzzle-10",
    component: Guest,
    layout: "/admin"
  }
];
export default routes;
