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

// Material Kit 2 React examples
import HorizontalTeamCard from "examples/Cards/TeamCards/HorizontalTeamCard";
import StoryCard from "examples/Cards/StoryCard";
import CircularProgress from "@mui/material/CircularProgress"; // Add the CircularProgress component
// Images
import team1 from "assets/images/team-5.jpg";
import team2 from "assets/images/bruce-mars.jpg";
import team3 from "assets/images/ivana-squares.jpg";
import team4 from "assets/images/ivana-square.jpg";

function Team() {
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
    <MKBox
      component="section"
      variant="gradient"
      bgColor="dark"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="white">
              Featured Stories
            </MKTypography>
            <MKTypography variant="body2" color="white" opacity={0.8}>
              Traverse Across the Cosmos
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {loading ? ( // Render the loading animation if loading is true
            <CircularProgress />
          ) : (
            data?.slice(1).map((story, index) => {
              return (
                <Grid item xs={12} lg={6} key={index}>
                  <MKBox mb={1}>
                    <StoryCard
                      image={story?.image.replace("image/upload/", "")}
                      name={story?.title}
                      position={{ color: "info", label: story?.genre }}
                      chapters="20"
                      status={story?.status}
                      createdOn={story ? formatTimestamp(story?.timestamp) : "Date"}
                      rating={story?.rating}
                    />
                  </MKBox>
                </Grid>
              );
            })
          )}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;
