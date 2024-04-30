/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import Cookies from "js-cookie";


const Donut = () => {
  const [underConsideration, setConsideration] = useState(null);
  const [rejected, setRejected] = useState(null);
  const jobId = Cookies.get("jobId");


  const [options] = useState({
    labels: ["Under Consideration", "Rejected"],
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
      const considerationCount = filteredApplications.filter(
        (application) => application.status === "Under Consideration"
      ).length;
      const rejectedCount = filteredApplications.filter(
        (application) => application.status === "Rejected"
      ).length;

      setConsideration(considerationCount);
      setRejected(rejectedCount);
    } catch (error) {
      console.error("Error fetching application data:", error);
    }
  };

  fetchData();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <>
      <br />
        <Chart
          options={options}
          series={[underConsideration, rejected]}
          type="pie"
          width="380"
        />
    </>
  );
};

export default withAuth (Donut);
