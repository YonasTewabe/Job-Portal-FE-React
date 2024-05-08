/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import Cookies from "js-cookie";


const Donut = () => {
  const [underConsideration, setConsideration] = useState(null);
  const [rejected, setRejected] = useState(null);
  const [pending, setPending] = useState(null);
  const [interviewScheduled, setInterview] = useState(null);
  const jobId = Cookies.get("jobId");


  const [options] = useState({
    
    labels: ["Under Consideration", "Interview Scheduled","Pending", "Rejected"],
  });
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/application/all`
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
      const pendingCount = filteredApplications.filter(
        (application) => application.status === "Pending"
      ).length;      
      const interviewCount = filteredApplications.filter(
        (application) => application.status === "Interview Scheduled"
      ).length;

      setConsideration(considerationCount);
      setRejected(rejectedCount);
      setPending(pendingCount);
      setInterview(interviewCount);
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
          series={[underConsideration, interviewScheduled, pending, rejected]}
          type="pie"
          width="380"
        />
    </>
  );
};

export default withAuth (Donut);
