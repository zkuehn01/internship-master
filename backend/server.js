const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose"); // import mongoose package
const app = express();
const port = 5000;
const { format } = require("date-fns");

// define a schema for the job listings collection
const jobSchema = new mongoose.Schema({
  department: String,
  title: String,
  location: String,
  summary: String,
  url: String,
  startDate: Date,
  closeDate: Date,
  education: String,
  requirements: String,
  minSalary: Number,
  maxSalary: Number,
});

// create a mongoose model for the job listings collection
const Job = mongoose.model("Job", jobSchema);

// connect to MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/Internships", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/jobs", async (req, res) => {
  const userAgent = process.env.REACT_APP_USER_AGENT;
  const host = "data.usajobs.gov";
  const apiKey = process.env.REACT_APP_API_KEY;
  const endpoint = `https://${host}/api/search?Page=1&ResultsPerPage=20&Keyword=Internship`;
  const params = [
    {
      Keyword: "Developer",
      LocationName: "United States",
    },
  ];
  try {
    const response = await axios.get(endpoint, {
      params,
      headers: {
        "Authorization-Key": apiKey,
        "User-Agent": userAgent,
      },
    });

    const jobListings = response.data.SearchResult.SearchResultItems;
    const formattedJobListings = jobListings.map((job) => ({
      department: job.MatchedObjectDescriptor.DepartmentName,
      title: job.MatchedObjectDescriptor.PositionTitle,
      location: job.MatchedObjectDescriptor.PositionLocation[0].LocationName,
      summary: job.MatchedObjectDescriptor.UserArea.Details.JobSummary,
      url: job.MatchedObjectDescriptor.PositionURI,
      startDate: format(new Date(job.MatchedObjectDescriptor.PublicationStartDate),'MM/dd/yyyy'),
      closeDate: format(new Date(job.MatchedObjectDescriptor.ApplicationCloseDate),'MM/dd/yyyy'),
      education: job.MatchedObjectDescriptor.UserArea.Details.Education,
      requirements: job.MatchedObjectDescriptor.UserArea.Details.Requirements,
      minSalary: job.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange,
      maxSalary: job.MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange,
    }));

    // insert job listings into the MongoDB database
    await Job.insertMany(formattedJobListings);

    res.status(200).send(formattedJobListings);
  } catch (error) {
    console.error("Failed to retrieve job listings:", error);
    res.status(500).send({ error: "Failed to retrieve job listings" });
  }
});

// setInterval(() => {
//   getJobs();
// }, 3600000 * 24); // call getJobs function every 24 hours (in milliseconds)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
