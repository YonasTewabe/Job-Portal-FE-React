import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./Components/Layout";
import JobsPage from "./Pages/JobsPage";
import NotFoundPage from "./Pages/NotFoundPage";
import JobPage, {jobLoader} from "./Pages/JobPage";
import AddJobPage from "./Pages/AddJobPage";
import EditJobPage from "./Pages/EditJobPage";
import ViewReportPage from "./Pages/ViewReportPage";


const App = () => {
//Add new job
  const addJob = async (newJob) => {
    // eslint-disable-next-line no-unused-vars
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob),
    });
    return;
    }
  //Deleting job
  const deleteJob = async (id) => {
    // eslint-disable-next-line no-unused-vars
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE'
    });
    return;
  }


  //updating job
  const updateJob = async (job) => {
    // eslint-disable-next-line no-unused-vars
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job),
    });
    return;
  }


    const router = createBrowserRouter(
      createRoutesFromElements(
      <Route path ='/' element={<Layout />}>
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
  return <RouterProvider router={router} />
};

export default App;