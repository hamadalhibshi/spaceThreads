/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import StoryApi from "api/story";
import { useState, useEffect } from "react";
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React components
import TransparentBlogCard from "examples/Cards/BlogCards/TransparentBlogCard";
import BackgroundBlogCard from "examples/Cards/BlogCards/BackgroundBlogCard";

// Images
import SingleStoryCard from "examples/Cards/StoryCard/SingleStoryCard";
import CircularProgress from "@mui/material/CircularProgress"; // Add the CircularProgress component

function Places() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    StoryApi.getStory()
      .then((response) => {
        setData(response.data);
        setLoading(false); // Set loading to false when data is received
        console.log("Data received successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to format timestamp
  const formatTimestamp = (timestamp) => {
    const parts = timestamp.split("T"); // Split at the "T" character
    if (parts.length > 0) {
      return parts[0]; // Keep the part before "T"
    }
    return timestamp; // Return the original timestamp if "T" is not found
  };

  return (
    <MKBox component="section" py={2}>
      <Container>
        <Grid container item xs={12} lg={6}>
          <MKTypography variant="h3" mb={6}>
            Read the latest stories
          </MKTypography>
        </Grid>
        {loading ? ( // Render the loading animation if loading is true
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {data &&
              data?.map((story, index) => {
                const imageUrl = story.image.replace("image/upload/", "");

                return (
                  <Grid item xs={12} sm={6} lg={3} key={index}>
                    <SingleStoryCard
                      image={imageUrl}
                      title={story.title}
                      genre={{ color: "info", label: `${story.genre}` }}
                      chapters="20"
                      status={story.status}
                      createdOn={formatTimestamp(story.timestamp)}
                      rating={story.rating}
                      action={{
                        type: "internal",
                        route: `/storyDetails/${story.id}`,
                        color: "info",
                        label: "read story",
                      }}
                    />
                  </Grid>
                );
              })}
          </Grid>
        )}
      </Container>
    </MKBox>
  );
}

export default Places;
