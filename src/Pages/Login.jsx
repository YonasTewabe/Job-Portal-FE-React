import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const ValidatedLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/credential/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!validateForm()) {
      return;
    }

    // Continue with login logic
    console.log("Logging in", { email, password });

    // Reset form
    setEmail("");
    setPassword("");

    navigate("/");
  };

  const validateForm = () => {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          passwordRegex,
          "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character"
        )
        .min(8, "Password must be at least 8 characters"),
    });

    try {
      schema.validateSync({ email, password }, { abortEarly: false });
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
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}

            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mt-6 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`border rounded py-2 px-3 w-full ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}

            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
            </div>
          </div>
        </form>
        <div className="text-center mt-4 flex justify-between">
          <Link to="/forgot-password" className="text-sm text-blue-500">
            Forgot Password?
          </Link>
          <span className="text-sm">
            Don&apos;t have an account yet?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign Up{" "}
            </Link>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ValidatedLoginForm;
