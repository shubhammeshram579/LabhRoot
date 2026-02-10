import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "..//..//../public/dellevry.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginSuccess } from "..//../ReduxAuth/authSlice";
import api from "..//../api/axios";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userform, setUserform] = useState({
    email: "",
    password: "",
  });

  const handelform = (e) => {
    const { name, value } = e.target;
    setUserform((values) => ({ ...values, [name]: value }));
  };

  const handelSumbit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/users/login`, userform);

      //   console.log(res.data.data)

      dispatch(loginSuccess(res.data.data));

      navigate(`/home`);

      return res.data.data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen ">
        <div className="flex items-center justify-center gap-4 bg-gray-100 px-2 py-2">
          <div>
            <img src={img} alt="" className="h-[75vh] w-[27vw] object-cover" />
          </div>
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-semibold uppercase">
                Welcome to LabhRouts
              </h1>
              <p>Sign in your account</p>
            </div>

            <form
              onSubmit={handelSumbit}
              className="bg-gray-100 px-5 py-2 space-y-3"
            >
              <div className="flex flex-col">
                <label htmlFor="" className="text-md  font-medium">
                  Email
                </label>
                <input
                  className=" border-2 border-orange-700/20 rounded py-1"
                  type="email"
                  id="email"
                  name="email"
                  onChange={handelform}
                  placeholder=" test123@gmail.com"
                />
              </div>
              <div className="flex flex-col pb-2">
                <label htmlFor="" className="text-md  font-medium">
                  Password
                </label>
                <input
                  className=" border-2 border-orange-700/20 rounded py-1"
                  type="password"
                  id="password"
                  name="password"
                  onChange={handelform}
                  placeholder=" test@123"
                />
                <div className="flex items-center  gap-2 mt-2 text-sm">
                  <p>
                    <input type="checkbox" id="checkbox" name="checkbox" />
                    Remember me
                  </p>
                  <Link to="/" className="text-orange-500">
                    Forget Password ?
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className="py-2 bg-orange-300 px-5 rounded-lg"
              >
                Login
              </button>
            </form>
            <div className="flex items-center justify-start gap-4">
              <p>sign in with</p>
              <FcGoogle className="w-6 h-6" />
              <FaFacebook className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p>
                Don't have an account ?{" "}
                <span className="text-orange-500">
                  <Link to="/Registers">Sign Up</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
