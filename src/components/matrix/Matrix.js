import React, { Fragment, useEffect, useState } from "react";
import { HotTable } from "@handsontable/react";
import { colHeaders } from "./Constants";
import { modifyColWidth } from "./helpers/Helpers";
import "./Matrix.css";
import axios from "axios";
import { generalRenderer } from './MatrixRenderers';
import { exportBtnSetup } from "./BtnScripts.js";

function Matrix() {
  const hotTableComponent = React.createRef(null);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(500);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/jobs");
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    };
    fetchJobs();
    if (hotTableComponent && hotTableComponent.current) {
      exportBtnSetup(hotTableComponent);
    }
  }, [hotTableComponent]);
  

  const totalPages = Math.ceil(jobs.length / pageSize);
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const data = jobs.slice(startIndex, endIndex).map((job) => ({
    department: job.department,
    title: job.title,
    location: job.location,
    summary: job.summary,
    url: job.url,
    startDate: job.startDate,
    closeDate: job.closeDate,
    education: job.education,
    requirements: job.requirements,
    minSalary: job.minSalary, // renamed from job.MinRange
    maxSalary: job.maxSalary, // renamed from job.MaxRange
    status: job.status
    
  }));

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

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  return (
    <Fragment>
      <HotTable ref={hotTableComponent} id="hot" settings={settings} />
      <hr />
      <div className="clearfix">
        <div className="btn-group mb-5 float-right">
          <button
            className="btn btn-secondary"
            disabled={page === 0}
            onClick={handlePreviousPage}
          >
            Previous
          </button>
          <div className="page-counter-box">
            Page {page + 1} of {totalPages}
          </div>
          <button
            className="btn btn-secondary"
            disabled={page === totalPages - 1}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
      <div className="btn-group mb-5">
        <button id="export-file" className="btn intext-btn btn-primary">
          Download Data
        </button>
      </div>
    </Fragment>
  );
  
  
}

export default Matrix;
