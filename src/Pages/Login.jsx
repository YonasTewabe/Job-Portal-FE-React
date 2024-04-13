import { Formik } from "formik";
// import * as EmailValidator from "email-validator";
import * as Yup from "yup";

const ValidatedLoginForm = () => (
  <Formik
    initialValues={{ email: "", password: "" }}
    validationSchema={Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
    })}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);
        setSubmitting(false);
      }, 500);
    }}
  >
    {({
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit
    }) => (
        <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md  bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
          <div className="mb-4">
        <label htmlFor="email"  
        className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
          ${
            errors.email && touched.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && touched.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <label htmlFor="password" 
                className="block text-gray-700 text-sm font-bold mt-6 mb-2">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`border rounded py-2 px-3 w-full ${
            errors.password && touched.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && touched.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
        </div>
      </form>
      </div>
      </div>
    )}
  </Formik>
);

export default ValidatedLoginForm;
