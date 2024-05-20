// src/components/Login.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.css";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("Student");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const user = await login(data.email, data.password);
      //navigate(user.userType === "Student" ? "/student-form" : "/dashboard");
      navigate(user.user.endsWith("@rit.ac.in") ? "/dashboard" :"/student-form"  );

    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container mx-auto mt-32">
      <div className="card lg:card-side bg-base-100 shadow-sm">
        <div className="card-body flex justify-center items-center w-full ">
          <div role="tablist" className="tabs tabs-lifted  w-fit">
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab text-primary font-bold hover:text-accent"
              aria-label="Student/Officer"
              checked
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              <motion.form
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="flex justify-start items-center flex-col  gap-4"
              >
                <h2> Login</h2>
                <div className="flex gap-x-4 justify-between items-center mt-4 w-full ">
                  <label className="text-sm">Email</label>
                  <input
                    className="input input-sm input-bordered"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="flex gap-x-4 justify-between items-center">
                  <label className="text-sm">Password</label>
                  <input
                    className="input input-sm input-bordered"
                    type="password"
                    {...register("password", { required: true })}
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-full btn-accent text-sm font-semibold"
                >
                  Login
                </button>
                {error && <span className="error">{error}</span>}
              </motion.form>
            </div>

            {/* <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab  text-primary font-bold hover:text-accent"
              aria-label="Placement&nbsp;Officer"
            />
            <div
              role="tabpanel"
              className="tab-content  bg-base-100 border-base-300 rounded-box p-6"
            >
              <motion.form
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="flex justify-start items-center flex-col  gap-4"
              >
                <h2>Placement Officer Login</h2>
                <div className="flex gap-x-4 justify-between items-center mt-4 w-full ">
                  <label className="text-sm">Email</label>
                  <input
                    className="input input-sm input-bordered"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="flex gap-x-4 justify-between items-center">
                  <label className="text-sm">Password</label>
                  <input
                    className="input input-sm input-bordered"
                    type="password"
                    {...register("password", { required: true })}
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-full btn-accent text-sm font-semibold"
                >
                  Login
                </button>
                {error && <span className="error">{error}</span>}
              </motion.form>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
