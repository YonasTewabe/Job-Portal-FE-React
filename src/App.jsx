import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./Components/Layout";
import JobsPage from "./Pages/JobsPage";
import NotFoundPage from "./Pages/NotFoundPage";
import JobPage, { jobLoader } from "./Pages/JobPage";
import AddJobPage from "./Pages/AddJobPage";
import EditJobPage from "./Pages/EditJobPage";
import ViewReportPage from "./Pages/ViewReportPage";
import axios from "axios";

const App = () => {
  // Add new job
  const addJob = async (newJob) => {
    await axios.post('/api/jobs', newJob);
  };

  // Deleting job
  const deleteJob = async (id) => {
    await axios.delete(`/api/jobs/${id}`);
  };

  // Updating job
  const updateJob = async (job) => {
    await axios.put(`/api/jobs/${job.id}`, job);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/report' element={<ViewReportPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path='/edit-job/:id' element={<EditJobPage updatedJobSubmit={updateJob} />} loader={jobLoader} />
        <Route path='/job/:id' element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
