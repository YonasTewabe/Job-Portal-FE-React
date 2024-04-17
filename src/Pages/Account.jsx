import { useLoaderData, Link } from "react-router-dom";

import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
const Account = () => {
  const user = useLoaderData();
  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1  w-full gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md md:text-left">
              <h3 className="text-indigo-800 text-lg font-bold mb-6">
                Personal Information
              </h3>
              <h3 className="text-xl font-bold">Full Name:</h3>

              <p className="my-2 bg-indigo-100 p-2 font-bold">{user.fullname}</p>
              <h3 className="text-xl font-bold">Age:</h3>

              <p className="my-2 bg-indigo-100 p-2 font-bold">{user.age}</p>
              <h3 className="text-xl font-bold">Sex:</h3>

              <p className="my-2 bg-indigo-100 p-2 font-bold">{user.sex}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-indigo-800 text-lg font-bold mb-6">
                Educational Information
              </h3>
              <h3 className="text-xl font-bold">Degree:</h3>

              <p className="my-2 bg-indigo-100 p-2 font-bold">{user.degree}</p>

              <h3 className="text-xl font-bold">University:</h3>

              <p className="my-2 bg-indigo-100 p-2 font-bold">
                {user.university}
              </p>
              <h3 className="text-xl font-bold">Experience:</h3>

              <p className="my-2 bg-indigo-100 p-2 font-bold">
                {user.experience}
              </p>
              <h3 className="text-xl font-bold">CV:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {user.cv}
                </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-indigo-800 text-lg font-bold mb-6">
                Contact Information
              </h3>

              <h3 className="text-xl font-bold">Email Address:</h3>

              <p className="my-2 bg-indigo-100 p-2 font-bold">
                {user.contactEmail}
              </p>

              <h3 className="text-xl font-bold">Phone Number:</h3>

              <p className="my-2 bg-indigo-100 p-2 font-bold">
                {user.contactPhone}
              </p>
            </div>
            <Link
              to={`/UpdateUser/${user.id}`}
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Edit Information
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

const userLoader = async ({ params }) => {
  const res = await axios.get(`/api/user/${params.id}`);
  return res.data;
};

export { Account as default, userLoader };
