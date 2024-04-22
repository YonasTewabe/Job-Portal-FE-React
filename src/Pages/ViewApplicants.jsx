import axios from "axios";
import { useLoaderData } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
const ViewApplicants = () => {
  const user = useLoaderData();

  return (
    <div className="container mx-auto py-10 px-6">
      <br />
      <h1 className="text-3xl mb-6 text-indigo-700">Applicants for </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
          <h3 className="text-xl font-bold">Full Name:</h3>
          <p className="my-2 bg-indigo-100 p-2 font-bold">{user.fullname}</p>

          <h3 className="text-xl font-bold">Education:</h3>
          <p className="my-2 bg-indigo-100 p-2 font-bold">{user.degree}</p>

          <h3 className="text-xl font-bold">Experience:</h3>
          <p className="my-2 bg-indigo-100 p-2 font-bold">{user.experience}</p>

          <div className="flex justify-center items-center mt-4">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2">
              Accept
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-2">
              Reject
            </button>
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const userLoader = async ({ params }) => {
  const res = await axios.get(`/api/profile/${params.id}`);
  return res.data;
};
export { ViewApplicants as default, userLoader };
