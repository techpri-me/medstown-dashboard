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
  TbMapPinCode,
  MdAddLocation,
  MdAddBusiness
  
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
import PincodeSrc from "views/admin/Dashboard/PincodeSrc";
import ReferPharmacy from "views/admin/newScreen/ReferPharmacy";
const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <Dashboard />,
  },
  {
    name: "Open Orders", //"OpenOrders
    layout: "/admin",
    path: "open-orders",
    icon: <MdOutlineDepartureBoard className="h-6 w-6" />,
    component: <OpenOrders />,
    private: true, // Protected route
  },

  {
    name: "Orders History", //"OrderHistory
    layout: "/admin",
    path: "orders-history",
    icon: <MdOutlineDepartureBoard className="h-6 w-6" />,
    component: <OrderHistory />,
    private: true, // Protected route
  },
  {
    name: "Payments Details", //"Sales
    layout: "/admin",
    path: "sales",
    icon: <MdOutlineShoppingBasket className="h-6 w-6" />,
    component: <Sales />,
    private: true, // Protected route
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
    name: "Pharmacy Partner", //"SaleForce
    layout: "/admin",
    path: "saleForce",
    icon: <MdStore className="h-6 w-6" />,
    component: <SaleForce />,
  },
  {
    name: "Pharmacy Details", //"PharmacyDetails
    layout: "/admin",
    path: "pharmacy-details",
    icon: <MdStore className="h-6 w-6" />,
    component: <PharmacyDetails />,
  },
  {
    name: "ReferPharmacy",
    layout: "/admin",
    path: "referPharmacy",
    icon: <MdAddBusiness className="h-6 w-6" />,
    component: <ReferPharmacy/>,
    style: { display: "none" },
  },

  {
    name: "Delivery Boys Location", //"Delivery
    layout: "/admin",
    path: "delivery",
    icon: <MdOutlinePedalBike className="h-6 w-6" />,
    component: <Delivery />,
  },
  {
    name: "Delivery Partner Details", //"DeliveryPartnerDetails
    layout: "/admin",
    path: "delivery-partner-details",
    icon: <MdOutlinePedalBike className="h-6 w-6" />,
    component: <DeliveryPartnerDetails />,
  },
  {
    name: "Medicines", //"Partners",
    layout: "/admin",
    path: "partners",
    icon: <MdHealthAndSafety className="h-6 w-6" />,
    component: <Partners />,
  },

  {
    name: "User Details", //"UserDetails
    layout: "/admin",
    path: "user-details",
    icon: <FaUsers className="h-6 w-6" />,
    component: <UserDetails />,
  },
















  // {
  //   name: "Payments Details", //"WalletDetails
  //   layout: "/admin",
  //   path: "wallet-details",
  //   icon: <MdOutlineWallpaper className="h-6 w-6" />,
  //   component: <WalletDetails />,
  // },
  // {
  //   name: "Catories", //"SaleForce
  //   layout: "/admin",
  //   path: "category",
  //   icon: <MdCategory className="h-6 w-6" />,
  //   component: <Category />,
  // },


  // {
  //   name: "subcat",
  //   layout: "/admin",
  //   path: "subcat",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <Subcat />,
  //   style: { display: "none" },
  // },
 
  {
    name: "Pincode",
    layout: "/admin",
    path: "Pincode",
    icon: <MdAddLocation className="h-6 w-6" />,
    component: <PincodeSrc  />,
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
