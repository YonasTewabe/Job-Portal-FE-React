import { useState } from "react";
import Chart from "react-apexcharts";

const Donut = () => {
  const [options] = useState({
    labels: ["Accepted", "Rejected"],
  });
  const [series] = useState([144, 55]);

  return (
    <>
      <br />
      <div className={`bg- p-6 flex rounded-lg shadow-md`}>
        <Chart options={options} series={series} type="pie" width="380" />
      </div>
    </>
  );
};

export default Donut;
