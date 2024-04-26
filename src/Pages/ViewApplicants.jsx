import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ViewApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name"); // Default sort by name
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order ascending
  const jobId = Cookies.get("jobId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/application/all`
        );
        const filteredApplicants = response.data.filter(
          (application) => application.jobid === jobId
        );
        setApplicants(filteredApplicants);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applicants:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [jobId]); // Fetch data whenever jobId changes

  const renderCV = (cv) => {
    if (cv) {
      return (
        <div>
          <button
            onClick={() => window.open(`http://localhost:5000/uploads/${cv}`, '_blank')}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-2 rounded-full focus:outline-none focus:shadow-outline"
          >
            Download CV
          </button>
        </div>
      );
    } else {
      return <p>No CV uploaded</p>;
    }
  }

    const acceptClick = async (applicantId) => {
      try {
        await axios.patch(`http://localhost:5000/application/${applicantId}`, {
          status: "Accepted",
        });
        const updatedApplicants = applicants.map((applicant) =>
          applicant.id === applicantId ? { ...applicant, status: "Accepted" } : applicant
        );
        setApplicants(updatedApplicants);
      } catch (error) {
        console.error("Error accepting application:", error);
      }
    };
  
    const rejectClick = async (applicantId) => {
      try {
        await axios.patch(`http://localhost:5000/application/${applicantId}`, {
          status: "Rejected",
        });
        const updatedApplicants = applicants.map((applicant) =>
          applicant.id === applicantId ? { ...applicant, status: "Rejected" } : applicant
        );
        setApplicants(updatedApplicants);
      } catch (error) {
        console.error("Error rejecting application:", error);
      }
  };

  const sortApplicants = (field) => {
    if (field === sortBy) {
      // If the same field is clicked, toggle the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a new field is clicked, set it as the sort field and default to ascending order
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Apply sorting to sortedApplicants
  const sortedApplicants = [...applicants];
  sortedApplicants.sort((a, b) => {
    let comparison = 0;
    if (a[sortBy] < b[sortBy]) {
      comparison = -1;
    } else if (a[sortBy] > b[sortBy]) {
      comparison = 1;
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <br />
      <h1 className="text-3xl mb-6 text-indigo-700">
        Applicants {" "}
      </h1>
      <div className="flex justify-end mb-4">
        <label htmlFor="sort" className="mr-2">Sort by:</label>
        <select
          id="sort"
          className="bg-white border border-gray-300 rounded-md px-3 py-1 focus:outline-none"
          value={sortBy}
          onChange={(e) => sortApplicants(e.target.value)}
        >
          <option value="fullname">Name</option>
          <option value="education">Education</option>
          <option value="experience">Experience</option>
          <option value="applicationdate">Date Applied</option>
          <option value="status">Status</option>
        </select>
        <select
          id="order"
          className="bg-white border border-gray-300 rounded-md px-3 py-1 focus:outline-none"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="grid grid-cols-1 bg-red-100 md:grid-cols-3 gap-2">
        {sortedApplicants.map((applicant) => (
          <div key={applicant.id} className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <h3 className="text-xl font-bold">Name:</h3>
            <p className="my-2 bg-indigo-100 p-2 font-bold">
              {applicant.fullname}
            </p>
            <h3 className="text-xl font-bold">Education:</h3>
            <p className="my-2 bg-indigo-100 p-2 font-bold">{applicant.degree}</p>
            <h3 className="text-xl font-bold">University:</h3>
            <p className="my-2 bg-indigo-100 p-2 font-bold">
              {applicant.university}
            </p>
            <h3 className="text-xl font-bold">Experience:</h3>
            <p className="my-2 bg-indigo-100 p-2 font-bold">
              {applicant.experience}
            </p>
            <h3 className="text-xl font-bold">Email Address:</h3>
            <p className="my-2 bg-indigo-100 p-2 font-bold">
              {applicant.contactemail}
            </p>
            <h3 className="text-xl font-bold">Phone Number:</h3>
            <p className="my-2 bg-indigo-100 p-2 font-bold">
             +251  {applicant.contactphone}
            </p>
            <h3 className="text-xl font-bold">CV:</h3>
            <p className="my-2 bg-indigo-100 p-2 font-bold">
              {renderCV(applicant.cv)}
            </p>
            <h3 className="text-xl font-bold">Applied On:</h3>
            <p className="my-2 bg-indigo-100 p-2 font-bold">
              {applicant.applicationdate}
            </p>
            <div className="flex justify-center items-center mt-4">
              {applicant.status === "Pending" ? (
                <>
                  <button
                    className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                    onClick={() => acceptClick(applicant.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                    onClick={() => rejectClick(applicant.id)}
                  >
                    Reject
                  </button>
                </>
              ) : (
                <p className="text-xl font-bold">{applicant.status}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewApplicants;
