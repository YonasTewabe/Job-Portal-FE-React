/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import emailjs from "@emailjs/browser";
import Donut from './ViewReport'

const ViewApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user_email, setUser_email] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [userJob, setUserJob] = useState("");
  const [sortCriterion, setSortCriterion] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
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
  }, [jobId]);

  const renderCV = (cv) => {
    if (cv) {
      return (
        <div>
          <button
            onClick={() =>
              window.open(`http://localhost:5000/uploads/${cv}`, "_blank")
            }
            className="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-2 rounded-full focus:outline-none focus:shadow-outline"
          >
            Download CV
          </button>
        </div>
      );
    } else {
      return <p>No CV uploaded</p>;
    }
  };

  const customSort = (applicants, criterion, isAscending) => {
    const modifier = isAscending ? 1 : -1;
    switch (criterion) {
      case 'name':
        return [...applicants].sort((a, b) => modifier * a.fullname.localeCompare(b.fullname));
      case 'applicationDate':
        return [...applicants].sort((a, b) => modifier * (new Date(a.applicationdate) - new Date(b.applicationdate)));
      case 'status':
        return [...applicants].sort((a, b) => modifier * a.status.localeCompare(b.status));
      case 'education':
        return [...applicants].sort((a, b) => modifier * a.degree.localeCompare(b.degree));
      case 'experience':
        return [...applicants].sort((a, b) => modifier * (a.experience - b.experience));
      default:
        return applicants;
    }
  };

  const handleSortChange = (criterion) => {
    if (sortCriterion === criterion) {
      setSortAscending(!sortAscending);
    } else {
      setSortCriterion(criterion);
      setSortAscending(true);
    }
  };

  let sortedApplicants = [...applicants];
  if (sortCriterion) {
    sortedApplicants = customSort(sortedApplicants, sortCriterion, sortAscending);
  }

  const sendSuccessEmail = async (applicant) => {
    const templateParams = {
      user_email: applicant.contactemail,
      job: applicant.jobtitle,
      status: "Under consideration"
    };
    try {
      await emailjs.send("service_3x8jcuo", "template_83v7x64", templateParams, "y83w0Ca7GiWwGGWO4");
      console.log("Success email sent!");
    } catch (error) {
      console.error("Error sending success email:", error);
    }
  };

  const sendRejectEmail = async (applicant) => {
    const templateParams = {
      user_email: applicant.contactemail,
      job: applicant.jobtitle,
      status: "Rejected"
    };
    try {
      await emailjs.send("service_3x8jcuo", "template_83v7x64", templateParams, "y83w0Ca7GiWwGGWO4");
      console.log("Rejection email sent!");
    } catch (error) {
      console.error("Error sending rejection email:", error);
    }
  };

  const acceptClick = async (applicant) => {
    try {
      await axios.patch(`http://localhost:5000/application/${applicant.id}`, {
        status: "Under Consideration",
      });
      const updatedApplicants = applicants.map((app) =>
        app.id === applicant.id ? { ...app, status: "Under Consideration" } : app
      );
      setApplicants(updatedApplicants);

      setUser_email(applicant.contactemail);
      setUserStatus("Under consideration");
      setUserJob(applicant.jobtitle);

      sendSuccessEmail(applicant);
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  const rejectClick = async (applicant) => {
    try {
      await axios.patch(`http://localhost:5000/application/${applicant.id}`, {
        status: "Rejected",
      });
      const updatedApplicants = applicants.map((app) =>
        app.id === applicant.id ? { ...app, status: "Rejected" } : app
      );
      setApplicants(updatedApplicants);

      setUser_email(applicant.contactemail);
      setUserStatus("Rejected");
      setUserJob(applicant.jobtitle);

      sendRejectEmail(applicant);
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto bg-indigo-100 py-10 px-6">
      <br />
      <h1 className="text-3xl mb-6 text-indigo-700">Applicants  </h1>
      <div className="flex justify-end mb-4">
        <select
          id="sortCriterion"
          className="p-2 border rounded"
          value={sortCriterion}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="" disabled> Sort Applicants</option>
          <option value="name">Applicant Name</option>
          <option value="applicationDate">Application Date</option>
          <option value="education">Education</option>
          <option value="experience">Experience</option>
          <option value="status">Status</option>
        </select>
        <select
          id="sortOrder"
          className="p-2 border rounded"
          value={sortAscending ? "asc" : "desc"}
          onChange={() => setSortAscending((prev) => !prev)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {sortedApplicants.map((applicant) => (
          <div
            key={applicant.id}
            className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <h3 className="text-xl font-bold">Name:</h3>
            <p className="my-2 bg-indigo-100 p-2 font-bold">
              {applicant.fullname}
            </p>
            <h3 className="text-xl font-bold">Education:</h3>
            <p className="my-2 bg-indigo-100 p-2 font-bold">
              {applicant.degree}
            </p>

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
              {applicant.userphone}
            </p>

            <h3 className="text-xl font-bold">CV:</h3>
              {renderCV(applicant.cv)}

            <h3 className="text-xl font-bold">Applied On:</h3>
            <p className="my-2 bg-indigo-100 p-2 font-bold">
              {applicant.applicationdate}
            </p>
            <div className="flex justify-center items-center mt-4">
              {applicant.status === "Pending" ? (
                <>
                  <button
                    type="button"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                    onClick={() => acceptClick(applicant)}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                    onClick={() => rejectClick(applicant)}
                  >
                    Reject
                  </button>
                </>
              ) : (
                <p className="text-xl font-bold">Status: {applicant.status}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-3xl mb-6 text-indigo-700">Summary</h1>
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <Donut />
      </div>
    </div>
  );
};

export default ViewApplicants;
