/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

const JobListing = ({job}) => {
 
 const [showFullDescription, setShowFullDescription] = useState(false);

 let description = job.description;

 if (!showFullDescription){
    description = description.substring(0, 150) + '...';
 }
 
    return (
    <div key={job.id} className="bg-white rounded-xl shadow-md relative">
    <div className="p-4">
      <div className="mb-6">
        <div className="text-gray-600 my-2">{job.companyName}</div>
        <h3 className="text-xl font-bold">{job.title}</h3>
      </div>
      <div className="text-indigo-500 mb-2">{job.type} </div>
      
      <div className="mb-5">{description} </div>
      <button onClick={() => setShowFullDescription((prevState)=>!prevState)} className="text-red-500 mb-2 hover:text-indigo-600">
        {showFullDescription? 'Less': 'More'}
      </button>
      <div className="text-indigo-500 mb-2">Deadline: {job.deadline} </div>

      <div className="flex flex-col lg:flex-row justify-between mb-4">
        <Link
          to={`/job/${job.id}`}
          className="h-[36px] bg-red-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          View Job
        </Link>
      </div>
    </div>
  </div>
  )

}
export default JobListing