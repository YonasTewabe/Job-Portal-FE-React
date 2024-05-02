/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { useParams, useNavigate, useLoaderData, Link } from "react-router-dom";
import axios from "../axiosInterceptor";
import { toast } from "react-toastify";
import withAuth from "../withAuth";
import { FaExclamationTriangle } from "react-icons/fa";

// eslint-disable-next-line react/prop-types, no-unused-vars
const CompanyInfo = () => {
  const user = useLoaderData();
  const [companyname, setCompanyName] = useState(user.companyname || '');
  const [companydescription, setCompanyDescription] = useState(user.companydescription || '');
  const [companyPhone, setCompanyPhone] = useState(user.companyPhone || '');
  const [contactemail, setContactEmail] = useState(user.contactemail || '');

  const navigate = useNavigate();
  const { id } = useParams();

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("companyname", companyname);
    formData.append("companydescription", companydescription);
    formData.append("companyPhone", companyPhone);
    formData.append("contactemail", contactemail);

    try {
      const response =   await axios.patch(`http://localhost:5000/profile/${id}`, formData,  {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
        if  (response.status !== 200) {
        throw new Error("Failed to update information");
      }
      toast.success("Information Updated Successfully");
      navigate(`/account/${id}`);
    } catch (error) {
      toast.error("Failed to update information. Please try again.");
      console.log(error);
    }
  };
  const myRole= localStorage.getItem('role')

  return (
    <>
    {(myRole === 'Admin' || myRole === "hr") ? (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Complete Information
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="companyname"
                name="companyname"
                className="border rounded w-full py-2 px-3"
                placeholder="Company Name"
                required
                value={companyname}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold mb-2'
              >
                Company Description
              </label>
              <textarea
                id='companydescription'
                name='companydescription'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='What deos your company do'
                value={companydescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="contactemail"
                name="contactemail"
                className="border rounded w-full py-2 px-3"
                placeholder="Contact Email"
                required
                value={contactemail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="userPhone"
                className="block text-gray-700 font-bold mb-2"
              >
                Phone Number
              </label>
              <div className="flex">
                <span className="border rounded-l py-2 px-3 bg-gray-200">+251</span>
                <input
                  type="number"
                  id="companyPhone"
                  name="companyPhone"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Contact Phone"
                  required
                  value={companyPhone}
                  maxLength={9}
                  minLength={9}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Information
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
      ): (
        <section className="text-center flex flex-col justify-center items-center h-screen">
      <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />
      <h1 className="text-5xl font-bold mb-4">Unauthorized Access</h1>
<p className="text-xl mb-5">Sorry, you do not have the necessary permissions to view this page.</p>
      <Link
        to="/"
        className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
      >
        Back to Home
      </Link>
    </section>
      )}
      </>
  );
};


export default withAuth(CompanyInfo);
