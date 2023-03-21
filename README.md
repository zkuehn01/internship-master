# Internships!

Please kindly consider starring this repo (top right corner) to help it grow and make revisiting it easier for you

## Use the List

1. ## Here is the link to our GitHub Pages [website](https://zkuehn01.github.io/internship-master/) (URL might change so make sure to star this repo)!

## Latest Implementations

2. Within our code we are using USAJobs free API in order to pull internships/jobs into our view to select upon. When clicking on the URL for desired posting, you will then be redirected to the jobs application page.

3. We have implemented a backend server, so that the frontend will be fetching the api data from our backend. Within the code our api data is hidden through a .env file along with the user agent. If wanting to run this on your own project you will need to obtain the api key and input that into the code along with your email associated with the api source. 

4. With USAJOBS API we have also added Handshake API in order to retrieve job listings from multiple sources. In order to use this application you will need to obtain your own api keys through handshake and USAJOBS. 

5. Going back to the frontend, changes to the helper.js file to format the hot table component from csv file format to an excel format using xlsx libraries. 

6. There is also a next and previous button to flip through the pages of job listings. 

7. When using the Handshake api there is a limit to how many listings can be produced on a single page (50). So in order to produce more results, a function has been implimented to produce multiple pages of 50 listings. 

8. Since gh-pages is can only host static websites for users we will be taking a look at EC2-AWS, to host the backend server so the frontend gh-pages application can retrieve the listings from there.

9. To get up to date listings, a function has been added to the backend server to retrieve listings every 24 hours without having to shutdown the server and refreshing it. 
