import React from 'react';
import SearchContainer from "../components/SearchContainer";
import JobsContainer from "../components/JobsContainer";
import { useLoaderData } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

  export const loader = async ({request}) => {
    console.log(request.url);
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries()]);
      console.log(params);
  try {
    const {data} = await axios.get("/api/v1/jobs", {
      params
    });
    return {data};
  } catch (error) {
    toast.error(
      `Error: ${error.response.data.message || error.response.statusText}`);
    return error;
  }
}

const AllJobsContext=React.createContext();

function AllJobs() {
  const {data}=useLoaderData();
  console.log({data});

  return (
    <AllJobsContext.Provider value={{data}}>
      <SearchContainer></SearchContainer>
      <JobsContainer></JobsContainer>
    </AllJobsContext.Provider>
  );
}

export const useAllJobsContext = () => {
  return React.useContext(AllJobsContext);
}

export default AllJobs;


