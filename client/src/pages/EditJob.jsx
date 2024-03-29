import React from 'react';
import FormRow from '../components/FormRow';
import FormRowSelect from '../components/FormRowSelect';
import { useLoaderData } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from "styled-components";
import axios from "axios";

//access data on a specific job - get request
export const loader = async ({params}) => {
  //console.log(params);  //id as an object (same thing with const params = useParams())
  try {
    const {data} = await axios.get(`/api/v1/jobs/${params.id}`);
    return {data};
  } catch (error) {
    toast.error(
      `Error: ${error.response.data.message || error.response.statusText}`);
    return redirect("/dashboard/all-jobs");
  }
}

//adit job - patch request
export const action = async ({request, params}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await axios.patch(`/api/v1/jobs/${params.id}`, data);
    toast.success("Job edited successfully.");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    //toast.error("It is an error");
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function EditJob() {
  const { data } = useLoaderData();
  const job = data.job;
  console.log(job);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title" style={{marginBottom: "1.5rem"}}>Edit Job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            defaultValue={job.position}
          ></FormRow>
          <FormRow
            type="text"
            name="company"
            defaultValue={job.company}
          ></FormRow>
          <FormRow
            type="text"
            name="jobLocation"
            defaultValue={job.jobLocation}
            labelText="Job Location"
          ></FormRow>
          <FormRowSelect
            name="jobStatus"
            labelText="Job Status"
            list={Object.values(JOB_STATUS)}
            defaultValue={job.jobStatus}
          ></FormRowSelect>
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            list={Object.values(JOB_TYPE)}
            defaultValue={job.jobType}
          ></FormRowSelect>
          <button type="submit" className="btn btn-block form-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  .form-title {
    margin-bottom: 2rem;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 1rem;
  }
  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default EditJob;
