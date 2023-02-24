import React, { Fragment, useEffect, useState } from "react";
import { HotTable } from "@handsontable/react";
import { colHeaders } from "./Constants";
import { modifyColWidth } from "./helpers/Helpers";
import "./Matrix.css";
import axios from "axios";
import { generalRenderer } from './MatrixRenderers';

function Matrix() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/jobs");
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
  
    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

const data = jobs.map((job) => [
  job.department,
  job.title,
  job.location,
  job.summary,
  job.url,
  job.startDate,
  job.closeDate,
  job.education,
  job.requirements,
  job.minSalary,
  job.maxSalary,
]);

  const settings = {
    licenseKey: "non-commercial-and-evaluation",
    data: data,
    rowHeaders: true,
    manualRowMove: true,
    modifyColWidth: modifyColWidth,
    manualColumnResize: true,
    contextMenu: true,
    colHeaders: colHeaders,
    width: "100%",
    height: 500,
    stretchH: "all",
    columnSorting: true,
    filters: true,
    dropdownMenu: true,
    cells: generalRenderer
  };

  return (
    <Fragment>
      <HotTable ref={data} id="hot" settings={settings} data={data}
/>
      <hr />
      <div className="btn-group mb-5">
        
      </div>
    </Fragment>
  );
}


export default Matrix;
