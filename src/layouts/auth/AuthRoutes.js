import SignIn from "views/auth/SignIn";
import { MdLock } from "react-icons/md";
import UserOrders from "views/admin/UserDetails/UserOrders";
const Authroute = [
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
 
];

export default Authroute;
