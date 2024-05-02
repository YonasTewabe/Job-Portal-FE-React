/* eslint-disable react-refresh/only-export-components */
import axios from "../axiosInterceptor";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import withAuth from "../withAuth";
import Spinner from "../Components/Spinner";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ViewStatus = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["userId"]);
  const myRole = localStorage.getItem('role');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/application/all`
        );
        const filteredApplications = response.data.filter(
          (application) => application.userid === cookies.userId
        );
        
        setApplications(filteredApplications);
      } catch (error) {
        console.error("Error fetching application data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cookies.userId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
            <br />
      {myRole === 'user' ? (
        <div className="bg-indigo-100 py-10">
          <div className="w-full bg-white shadow-md rounded">
            <h1 className="text-indigo-700 text-3xl items-center text-center">
              Applied Jobs
            </h1>
            <div className="container mx-auto py-10 px-6">
              <table className="border-collapse border border-gray-800 w-full">
                <thead>
                  <tr>
                    <th className="border border-gray-800 px-4 py-2">
                      Company Name
                    </th>
                    <th className="border border-gray-800 px-4 py-2">
                      Job Title
                    </th>
                    <th className="border border-gray-800 px-4 py-2">
                      Application Date
                    </th>
                    <th className="border border-gray-800 px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-indigo-100" : ""}
                    >
                      <td className="border border-gray-800 px-4 py-2">
                        {application.companyname}
                      </td>
                      <td className="border border-gray-800 px-4 py-2">
                        {application.jobtitle}
                      </td>
                      <td className="border border-gray-800 px-4 py-2">
                        {application.applicationdate}
                      </td>
      
                      <td
                        className={`border border-gray-800 px-4 py-2 ${
                          application.status === "Pending"
                            ? "text-yellow-600"
                            : application.status === "Under Review"
                            ? "text-blue-600"
                            : application.status === "Interview Scheduled"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                        
                      >
                        {application.status} {application.interviewDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
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

export default withAuth(ViewStatus);
