import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../Config/API";

export default function SignIn() {
  const Navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email().required("Please enter your email"),
      password: Yup.string().min(5).required("Please enter your password"),
    }),
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values, action) => {
      API.post("/admin/loginadmin", values)
        .then((res) => {
          if (res.data.status === "success") {
            alert(res.data.message);
            Navigate("/admin/dashboard");
          } else {
            alert(res.data.message);
          }
        })

        .catch((error) => {
          console.log(error);
        });
      //console.log(values);
      //// to get rid of all the values after submitting the form
      action.resetForm();
    },
  });
  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>

        <form onSubmit={handleSubmit}>
          <input
            variant="auth"
            extra="mb-3"
            type="email"
            autoComplete="off"
            name="email"
            id="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none `}
          />
          {touched.email && errors.email ? (
            <p className="form-error ml-2 font-bold text-red-500">
              {errors.email}
            </p>
          ) : null}

          {/* Password */}
          <input
            variant="auth"
            extra="mb-3"
            type="password"
            autoComplete="off"
            name="password"
            id="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none `}
          />
          {touched.password && errors.password ? (
            <p className="form-error ml-2 font-bold text-red-500">
              {errors.password}
            </p>
          ) : null}
          {/* Checkbox */}
          {/* <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <a
              className="text-sm font-medium text-[#014d4d]  dark:text-white"
              href=" "
            >
              Forgot Password?
            </a>
          </div> */}

          <button
            type="submit"
            className="linear mt-4  w-full rounded-xl border-2 bg-[#014d4d]  py-[12px] text-base font-medium text-white transition duration-200 hover:border-[#014d4d] hover:bg-white hover:text-[#014d4d]
          active:bg-[#014d4d]
        dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            disabled={isSubmitting}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
