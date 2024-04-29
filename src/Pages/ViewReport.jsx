/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import Cookies from "js-cookie";


const Donut = () => {
  const [accepted, setaccepted] = useState(null);
  const [rejected, setRejected] = useState(null);
  const jobId = Cookies.get("jobId");


  const [options] = useState({
    labels: ["accepted", "Rejected"],
  });
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/application/all`
      );
      const filteredApplications = response.data.filter(
        (application) => application.jobid === jobId
      );
      const acceptedCount = filteredApplications.filter(
        (application) => application.status === "accepted"
      ).length;
      const rejectedCount = filteredApplications.filter(
        (application) => application.status === "Rejected"
      ).length;

      setaccepted(acceptedCount);
      setRejected(rejectedCount);
    } catch (error) {
      console.error("Error fetching application data:", error);
    }
  };

  fetchData();
}, []);

  return (
    <>
      <br />
      <div className={`bg- p-6 flex rounded-lg shadow-md`}>
        <Chart
          options={options}
          series={[accepted, rejected]}
          type="pie"
          width="380"
        />
      </div>
    </>
  );
};

export default withAuth (Donut);
