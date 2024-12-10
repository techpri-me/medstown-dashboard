/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "routes.js";
console.log(routes);


const Sidebar = ({ open, onClose }) => {
  return (
    <div
    className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 sidebar ${
      open ? "translate-x-0" : "-translate-x-96"
    }`}
  >
    <span
      className="absolute top-4 right-4 block cursor-pointer xl:hidden"
      onClick={onClose}
    >
      <HiX />
    </span>

    {/* Logo Section */}
    <div className={`mx-[56px] mt-[30px] flex items-center`}>
      <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-[#014d4d] dark:text-white">
        MEDSTOWN
        <sup style={{ fontSize: "11px", top: "-1.2em" }}>TM</sup>
      </div>
    </div>
    <div className="mt-[58px] h-px bg-gray-300 dark:bg-white/30" />

    {/* Sidebar Navigation */}
    <ul className="mb-50 pt-1 overflow-y-auto h-[calc(100vh-150px)]">
      <Links routes={routes} />
    </ul>

    {/* Optionally, if using Slider for horizontal menus */}
    {/* 
    <Slider {...settings}>
      {routes.map((route, index) => (
        <div key={index}>
          <Links routes={route} />
        </div>
      ))}
    </Slider>
    */}
    
  </div>
  );
};

export default Sidebar;
