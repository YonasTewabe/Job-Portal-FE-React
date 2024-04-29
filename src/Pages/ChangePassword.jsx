/* eslint-disable react-refresh/only-export-components */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import withAuth from "../withAuth";
import axios from "../axiosInterceptor";


const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

  const id = Cookies.get("userId"); // Fetch userId from cookie

  const formData = new FormData();
  formData.append("password", Password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:5000/profile/${id}`, {
        headers: {},
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update information");
      }

      toast.success("Password changed Successfully");
      navigate(`/account/${id}`); // Update the navigation path
    } catch (error) {
      toast.error("Failed to update information. Please try again.");
      console.log(error.message);
    }

    setCurrentPassword("");
    setPassword("");
    setConfirmNewPassword("");
  };

  const validateForm = () => {
    const schema = Yup.object().shape({
      currentPassword: Yup.string().required("Current password is required"),
      Password: Yup.string()
        .required("New password is required")
        .matches(
          passwordRegex,
          "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character"
        )
        .min(8, "Password must be at least 8 characters"),
      confirmNewPassword: Yup.string()
        .required("Confirm new password is required")
        .oneOf([Yup.ref("Password"), null], "Passwords must match"),
    });

    try {
      schema.validateSync(
        { currentPassword, Password, confirmNewPassword },
        { abortEarly: false }
      );
      setErrors({});
      return true;
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-2xl text-indigo-700 text-center">Change Password</p>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={`border rounded py-2 px-3 w-full ${
                errors.currentPassword ? "border-red-500" : ""
              }`}
            />
            {errors.currentPassword && (
              <div className="text-red-500 text-sm">
                {errors.currentPassword}
              </div>
            )}

            <label
              htmlFor="newPassword"
              className="block text-gray-700 text-sm font-bold mt-6 mb-2"
            >
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Enter your new password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className={`border rounded py-2 px-3 w-full ${
                errors.newPassword ? "border-red-500" : ""
              }`}
            />
            {errors.newPassword && (
              <div className="text-red-500 text-sm">{errors.newPassword}</div>
            )}

            <label
              htmlFor="confirmNewPassword"
              className="block text-gray-700 text-sm font-bold mt-6 mb-2"
            >
              Confirm New Password
            </label>
            <input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              placeholder="Confirm your new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className={`border rounded py-2 px-3 w-full ${
                errors.confirmNewPassword ? "border-red-500" : ""
              }`}
            />
            {errors.confirmNewPassword && (
              <div className="text-red-500 text-sm">
                {errors.confirmNewPassword}
              </div>
            )}

            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth (ChangePassword);
