import React from "react";

import SignIn from "views/auth/SignIn";
import {
  MdHome,
  MdHealthAndSafety,
  MdStore,
  MdCategory,
  MdOutlinePedalBike,
  MdOutlineDepartureBoard,
  MdOutlineShoppingBasket,
  MdOutlineShoppingCart,
  MdOutlineWallpaper,
  
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import Dashboard from "views/admin/Dashboard/Dashboard";
import Partners from "views/admin/Partners/Partners";
import SaleForce from "views/admin/SaleForce/SaleForce";
import Category from "views/admin/Category/Category";
import { AiOutlinePoweroff } from "react-icons/ai";
import Subcat from "views/admin/Category/Subcat";
import Delivery from "views/admin/SaleForce/Delivery";
import OpenOrders from "views/admin/OpenOrders";
import OrderHistory from "views/admin/OrderHistory";
import Sales from "views/admin/Sales";
import UserDetails from "views/admin/UserDetails";
import PharmacyDetails from "views/admin/PharmacyDetails";
import DeliveryPartnerDetails from "views/admin/DeliveryPartnerDetails";
import WalletDetails from "views/admin/WalletDetails";
import PharmacyPayoutReq from "views/admin/PharmacyPayoutReq";
import DeliveryPayoutReq from "views/admin/Delivery Payout Req";
const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <Dashboard />,
  },
  {
    name: "Medicines", //"Partners",
    layout: "/admin",
    path: "partners",
    icon: <MdHealthAndSafety className="h-6 w-6" />,
    component: <Partners />,
  },
  {
    name: "Pharmacies", //"SaleForce
    layout: "/admin",
    path: "saleForce",
    icon: <MdStore className="h-6 w-6" />,
    component: <SaleForce />,
  },
  {
    name: "Delivery Boys Location", //"Delivery
    layout: "/admin",
    path: "delivery",
    icon: <MdOutlinePedalBike className="h-6 w-6" />,
    component: <Delivery />,
  },
  {
    name: "Open Orders", //"OpenOrders
    layout: "/admin",
    path: "open-orders",
    icon: <MdOutlineDepartureBoard className="h-6 w-6" />,
    component: <OpenOrders />,
  },
  {
    name: "Orders History", //"OrderHistory
    layout: "/admin",
    path: "orders-history",
    icon: <MdOutlineDepartureBoard className="h-6 w-6" />,
    component: <OrderHistory />,
  },
  {
    name: "Pharmacy Payout Req", //"OrderHistory
    layout: "/admin",
    path: "pharmacy-payout-req",
    icon: <MdOutlineDepartureBoard className="h-6 w-6" />,
    component: <PharmacyPayoutReq />,
  },
  {
    name: "Delivery Payout Req", //"OrderHistory
    layout: "/admin",
    path: "delivery-payout-req",
    icon: <MdOutlineDepartureBoard className="h-6 w-6" />,
    component: <DeliveryPayoutReq />,
  },
  {
    name: "Sales", //"Sales
    layout: "/admin",
    path: "sales",
    icon: <MdOutlineShoppingBasket className="h-6 w-6" />,
    component: <Sales />,
  },
  {
    name: "User Details", //"UserDetails
    layout: "/admin",
    path: "user-details",
    icon: <FaUsers className="h-6 w-6" />,
    component: <UserDetails />,
  },
  {
    name: "Pharmacy Details", //"PharmacyDetails
    layout: "/admin",
    path: "pharmacy-details",
    icon: <MdStore className="h-6 w-6" />,
    component: <PharmacyDetails />,
  },
  {
    name: "Delivery Partner Details", //"DeliveryPartnerDetails
    layout: "/admin",
    path: "delivery-partner-details",
    icon: <MdOutlinePedalBike className="h-6 w-6" />,
    component: <DeliveryPartnerDetails />,
  },
  {
    name: "Wallet Details", //"WalletDetails
    layout: "/admin",
    path: "wallet-details",
    icon: <MdOutlineWallpaper className="h-6 w-6" />,
    component: <WalletDetails />,
  },
  {
    name: "Catories", //"SaleForce
    layout: "/admin",
    path: "category",
    icon: <MdCategory className="h-6 w-6" />,
    component: <Category />,
  },
  {
    name: "subcat",
    layout: "/admin",
    path: "subcat",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Subcat />,
    style: { display: "none" },
  },
  {
    name: "Logout",
    layout: "/auth",
    path: "sign-in",
    icon: <AiOutlinePoweroff className="h-6 w-6" />,
    component: <SignIn />,
  },
  // create multiple routes for sub menu
];
export default routes;
