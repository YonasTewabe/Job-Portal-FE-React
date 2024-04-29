import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import axios from '../axiosInterceptor';
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types, no-unused-vars
const UpdateUser = ({ updateInformationSubmit }) => {
  const user = useLoaderData() || {}; // Use an empty object if user is undefined
  const [companyname, setCompanyName] = useState(user.companyname || '');
  const [companydescription, setCompanyDescription] = useState(user.companydescription || '');
  const [companyPhone, setCompanyPhone] = useState(user.companyphone || '');
  const [contactemail, setContactEmail] = useState(user.contactemail || '');

  const navigate = useNavigate();
  const { id } = useParams();

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("companyname", companyname);
    formData.append("companydescription", companydescription);
    formData.append("companyphone", companyPhone);
    formData.append("contactemail", contactemail);

    try {
      const response = await axios.patch(`http://localhost:5000/profile/${id}`,formData,  {
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
      console.log(error.message);
    }

  };


  return (
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
                placeholder='Add any job duties, expectations, requirements, etc'
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
                id="contactEmail"
                name="contactEmail"
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
                  type="tel"
                  id="companyphone"
                  name="companyphone"
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
  );
};

export default UpdateUser;
