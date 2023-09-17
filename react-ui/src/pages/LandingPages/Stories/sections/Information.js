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

// Material Kit 2 React examples
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import CenteredBlogCard from "examples/Cards/BlogCards/CenteredBlogCard";
import FeaturedStoryCard from "examples/Cards/StoryCard/FeaturedStoryCard";
import FeaturedStoryCardDetails from "examples/Cards/StoryCard/FeaturedStoryCardDetails";
import CircularProgress from "@mui/material/CircularProgress"; // Add the CircularProgress component

function Information() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  useEffect(() => {
    StoryApi.getTopRatedStories()
      .then((response) => {
        setData(response.data);
        setLoading(false);
        console.log("Top Rated Data received successfully:", response.data);
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
    <MKBox component="section" py={12}>
      <Container>
        <Grid container spacing={3} alignItems="center">
          {loading ? ( // Render the loading animation if loading is true
            <CircularProgress />
          ) : (
            <>
              <Grid item xs={12} lg={6}>
                <FeaturedStoryCard
                  image={data[0]?.image.replace("image/upload/", "")}
                  description="Website visitors today demand a frictionless user expericence — especially when using search. Because of the high standards."
                  action={{
                    type: "internal",
                    route: `/storyDetails/${data[0]?.id}`,
                    color: "info",
                    label: "Explore Authors",
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6} sx={{ ml: "auto", mt: { xs: 3, lg: 0 } }}>
                <FeaturedStoryCardDetails
                  image="https://static.vecteezy.com/system/resources/previews/017/125/698/non_2x/cartoon-astronaut-in-outer-space-free-vector.jpg"
                  title={data[0]?.title}
                  description="The Lord Ruler is dead, and chaos is chaosing everywhere in the realm."
                  genre={{ color: "info", label: data[0]?.genre }}
                  chapters="20"
                  status={data[0]?.status}
                  createdOn={data[0] ? formatTimestamp(data[0]?.timestamp) : "Date"}
                  rating={data[0]?.rating}
                  action={{
                    type: "internal",
                    route: `/storyDetails/${data[0]?.id}/`,
                    color: "info",
                    label: "Read Story",
                  }}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
