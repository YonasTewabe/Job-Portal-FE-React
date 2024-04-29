/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import emailjs from "@emailjs/browser";

const ViewApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user_email, setUser_email] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [userJob, setUserJob] = useState("");
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

  const sendSuccessEmail = async (applicant) => {
    const templateParams = {
      user_email: applicant.contactemail,
      job: "some job",
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
      job: "some job",
      status: "Rejected"
    };
    try {
      await emailjs.send("service_3x8jcuo", "template_83v7x64", templateParams, "y83w0Ca7GiWwGGWO4");
      console.log("Rejection email sent!");
    } catch (error) {
      console.error("Error sending rejection email:", error);
    }
  };


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

  const acceptClick = async (applicant) => {
    try {
      await axios.patch(`http://localhost:5000/application/${applicant.id}`, {
        status: "Accepted",
      });
      const updatedApplicants = applicants.map((app) =>
        app.id === applicant.id ? { ...app, status: "Accepted" } : app
      );
      setApplicants(updatedApplicants);

      // Update the user email, job, and status
      setUser_email(applicant.contactemail);
      setUserStatus("Under consideration");
      setUserJob("some job");

      // Send the success email
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

      // Update the user email, job, and status
      setUser_email(applicant.contactemail);
      setUserStatus("Rejected");
      setUserJob("some job");

      // Send the rejection email
      sendRejectEmail(applicant);
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <br />
      <h1 className="text-3xl mb-6 text-indigo-700">Applicants </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {applicants.map((applicant) => (
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
              {applicant.contactphone}
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
