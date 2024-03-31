import { useParams, useLoaderData, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
// import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components, react/prop-types
const JobPage = ({ deleteJob }) => {
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const navigate = useNavigate();
  const job = useLoaderData();
  function refreshPage() {
    window.location.reload(false);
  }
  const onDeleteClick = (jobId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
       await deleteJob(jobId),
        refreshPage()
      }
    });
   
    navigate("/jobs");
    
  };

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
                <div className='text-gray-500 mb-4'>{job.type}</div>
                <h1 className='text-3xl font-bold mb-4'>{job.title}</h1>
                <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
                  <FaMapMarker className='text-orange-700 mr-1' />
                  <p className='text-orange-700'>{job.location}</p>
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-indigo-800 text-lg font-bold mb-6'>
                  Job Description
                </h3>

                <p className='mb-4'>{job.description}</p>

                <h3 className='text-indigo-800 text-lg font-bold mb-6'>
                  Job Requirements
                </h3>

                <p className='mb-4'>{job.requirement}</p>

                <h3 className='text-indigo-800 text-lg font-bold mb-2'>
                  Salary
                </h3>

                <p className='mb-4'>{job.salary}</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-bold mb-6'>Company Info</h3>

                <h2 className='text-2xl'>{job.company.name}</h2>

                <p className='my-2'>{job.company.description}</p>

                <hr className='my-4' />

                <h3 className='text-xl'>Contact Email:</h3>

                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.company.contactEmail}
                </p>

                <h3 className='text-xl'>Contact Phone:</h3>

                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {' '}
                  {job.company.contactPhone}
                </p>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-xl font-bold mb-6'>Manage Job</h3>
                <Link
                  to={`/edit-job/${job.id}`}
                  className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => onDeleteClick(job.id)}
                  className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const jobLoader = async ({ params }) => {
  const res = await axios.get(`/api/jobs/${params.id}`);
 return res.data;
};

export { JobPage as default, jobLoader };
