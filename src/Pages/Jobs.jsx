/* eslint-disable react-refresh/only-export-components */
import JobListings from '../Components/JobListings';
import withAuth from "../withAuth";

const Jobs = () => {
  return (
    <div className=' px-4 py-6'>
    <JobListings />
    </div>
  )
}

export default withAuth (Jobs)