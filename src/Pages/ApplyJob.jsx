import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../Components/Spinner";

const ApplyJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const applyClick = () =>{
    
  }

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`/api/jobs/${id}`);
        setJob(res.data);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Couldn&apos;t find the requested job
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          > Back to Job Listings
          </Link>
        </div>
      </div>
    );
  }
  

  const isDeadlinePassed = new Date(job.deadline) < new Date();
  const isDeadlineToday = new Date(job.deadline).getDate() === new Date().getDate();


  return (
    <>
      <section>
        <br /> <br />
        <div className='container m-auto py-6 px-6'>
          <Link
            to='/jobs'
            className='text-indigo-500 hover:text-indigo-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className='bg-indigo-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-6'>
            <main>
              <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                <h1 className='text-3xl font-bold mb-4'>{job.title}</h1>
                <div className='text-gray-500 text-2xl mb-4'>{job.type}</div>
                <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
                  <FaMapMarker className='text-orange-700 mr-1' />
                  <p className='text-orange-700'>{job.location}</p>
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-xl'> Job Description:</h3>
                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.description}
                </p>

                <h3 className='text-xl'> Job Requirement:</h3>
                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.requirement}
                </p>

                <h3 className='text-xl'> Salary:</h3>
                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.salary}
                </p>

                <h3 className='text-xl'> Deadline:</h3>
                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.deadline}
                </p>
              </div>
            </main>

            <aside>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-bold mb-6'>Company Info</h3>

                <h3 className='text-xl'>Company Name:</h3>
                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.companyName}
                </p>

                <h3 className='text-xl'> Company Description:</h3>
                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.companyDescription}
                </p>

                <hr className='my-4' />

                <h3 className='text-xl'>Contact Email:</h3>

                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.contactEmail}
                </p>

                <h3 className='text-xl'>Contact Phone:</h3>

                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.contactPhone}
                </p>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-xl font-bold mb-6'>Apply Job</h3>
                {!isDeadlinePassed || isDeadlineToday ? (
                  <button 
                  onClick={applyClick}
                    className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                  >
                    Apply Job
                  </button>
                ) : (
                  <button
                    className='bg-red-500 text-white font-bold py-2 px-4 rounded-full w-full cursor-not-allowed opacity-50 mt-4 block'
                    disabled
                  >
                    Deadline Passed
                  </button>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default ApplyJob;
