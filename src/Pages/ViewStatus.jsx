const ViewStatus = () => {
  // Sample data for demonstration
  const appliedJobs = [
     ];

  return (
    <>
      <br />
      <div className="bg-indigo-100 py-10">
        <div className="w-full bg-white shadow-md rounded">
          <h1 className="text-indigo-700 text-3xl items-center text-center">Applied Jobs</h1>
          <div className="container mx-auto py-10 px-6">
            <table className="border-collapse border border-gray-800 w-full">
              <thead>
                <tr>
                  <th className="border border-gray-800 px-4 py-2">Company Name</th>
                  <th className="border border-gray-800 px-4 py-2">Job Title</th>
                  <th className="border border-gray-800 px-4 py-2">Application Date</th>
                  <th className="border border-gray-800 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {appliedJobs.map((job, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-indigo-100" : ""}>
                    <td className="border border-gray-800 px-4 py-2">{job.companyName}</td>
                    <td className="border border-gray-800 px-4 py-2">{job.jobTitle}</td>
                    <td className="border border-gray-800 px-4 py-2">{job.applicationDate}</td>
                    <td className={`border border-gray-800 px-4 py-2 ${job.status === "Pending" ? "text-yellow-600" : (job.status === "Approved" ? "text-green-600" : "text-red-600")}`}>{job.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewStatus;
