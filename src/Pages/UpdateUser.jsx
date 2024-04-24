import { useState } from "react";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types, no-unused-vars
const UpdateUser = ({ updateInformationSubmit }) => {
  const user = useLoaderData();
  const [fullname, setFullName] = useState(user.fullname);
  const [age, setAge] = useState(user.age);
  const [sex, setSex] = useState(user.sex);
  const [degree, setDegree] = useState(user.degree);
  const [university, setUniversity] = useState(user.university);
  const [experience, setExpereince] = useState(user.experience || 'None');
  const [cv, setCv] = useState(user.cv);
  const [contactEmail, setContactEmail] = useState(user.contactEmail);
  const [contactPhone, setContactPhone] = useState(user.contactPhone);

  const navigate = useNavigate();
  const { id } = useParams();

  const submitForm = async (e) => {
    e.preventDefault();
  
    const updatedInformation = {
      fullname,
      age,
      sex,
      experience,
      degree,
      university,
      contactEmail,
      contactPhone,
    };
  
   
  
  const updateInformationSubmit = async (id, updatedInformation) => {
    try {
      const response = await fetch(`http://localhost:5000/profile/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInformation),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update information");
      }
    } catch (error) {
      throw new Error("Failed to update information");
    }
  };
  try {
    await updateInformationSubmit(id, updatedInformation);
    toast.success("Information Updated Successfully");
    navigate(`/account/${id}`);
  } catch (error) {
    toast.error("Failed to update information. Please try again.");
    console.log(error.message)
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
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="border rounded w-full py-2 px-3"
                placeholder="Full Name"
                required
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Age</label>
              <input
                type="text"
                id="age"
                name="age"
                className="border rounded w-1/3 py-2 px-3 mb-2"
                placeholder="Age"
                required
                value={age}
                maxLength={2}
                minLength={2}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Sex</label>
              <div className="flex items-center">
                <label className="mr-2">
                  <input
                    type="radio"
                    id="male"
                    name="sex"
                    value="Male"
                    checked={sex === "Male"}
                    onChange={(e) => setSex(e.target.value)}
                    className="mr-1"
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    id="female"
                    name="sex"
                    value="Female"
                    checked={sex === "Female"}
                    onChange={(e) => setSex(e.target.value)}
                    className="mr-1"
                  />
                  Female
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Degree
              </label>
              <input
                type="text"
                id="degree"
                name="degree"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Degree"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Univeristy
              </label>
              <input
                type="text"
                id="University"
                name="University"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="University or Collage Attended"
                required
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Expereince
              </label>
              <select
                id="expereince"
                name="expereince"
                className="border rounded w-full py-2 px-3"
                value={experience}
                required
                onChange={(e) => setExpereince(e.target.value)}
              >
                <option value="None">None</option>
                <option value="less than 1 Year">Less than 1 Year</option>
                <option value="1 - 3 years">1 - 3 years</option>
                <option value="3 - 5 years">3 - 5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="contact_email"
                name="contact_email"
                className="border rounded w-full py-2 px-3"
                placeholder="Contact Email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              </div>
           <div className="mb-4">
              <label
                htmlFor="contactPhone"
                className="block text-gray-700 font-bold mb-2"
              >
                Phone Number
              </label>
              <div className="flex">
              <span className="border rounded-l py-2 px-3 bg-gray-200">+251</span>
              <input
                type="number"
                id="contactPhone"
                name="contactPhone"
                className="border rounded w-full py-2 px-3"
                placeholder="Contact Phone"
                required
                value={contactPhone}
                maxLength={9}
                minLength={9}
                onChange={(e) => setContactPhone(e.target.value)}
              />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">CV</label>
              <input
                type="file"
                id="cv"
                name="cv"
                className="border rounded w-full py-2 px-3"
                required
                accept="application/pdf"
                value={cv}
                onChange={(e) => setCv(e.target.value)}
              />
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
