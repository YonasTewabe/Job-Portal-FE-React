import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const ChangePassword = ({updatePassword}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatePassword = {
        password
    }

    if (!validateForm()) {
      return;
    }

    

    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");

    navigate("/");
  };

  const validateForm = () => {
    const schema = Yup.object().shape({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .required("New password is required")
        .matches(
            passwordRegex,
            'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character'
          )
        .min(8, "Password must be at least 8 characters"),
      confirmNewPassword: Yup.string()
        .required("Confirm new password is required")
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
    });

    try {
      schema.validateSync(
        { currentPassword, newPassword, confirmNewPassword },
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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

export default ChangePassword;
