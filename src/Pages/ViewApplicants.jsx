import axios from "axios";
import { useLoaderData, useParams } from "react-router-dom";


const ViewApplicants = () => {
    const job = useLoaderData();
  const { id } = useParams();


  return (
    <div className='container mx-auto py-10 px-6'><br />
      <h1 className='text-3xl mb-6'>Applicants</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                <h1 className='text-3xl font-bold mb-4'>{job.type}</h1>
                <div className='text-gray-500 mb-4'>{job.type}</div>
                <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
                  <p className='text-orange-700'>{job.location}</p>
                </div>
              </div>
         
        
      </div>
    </div>
  );
};

const jobLoader = async ({ params }) => {
    const res = await axios.get(`/api/jobs/${params.id}`);
   return res.data;
  };
export default ViewApplicants;
