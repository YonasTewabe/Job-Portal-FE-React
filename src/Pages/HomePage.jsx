import Hero from "../Components/Hero";
// import HomeCard from "../Components/HomeCard";
import JobListings from "../Components/JobListings";
import ViewAllJobs from "../Components/ViewAllJobs";

const HomePage = () => {
  return (
    <>
      <Hero
        Title="Find Your Next Job"
        Subtitle="Look for the job that fits your skills and needs"
      />

     {/* <HomeCard /> */}
     <JobListings isHome={true} />
     <ViewAllJobs />
    </>
  );
};

export default HomePage;
