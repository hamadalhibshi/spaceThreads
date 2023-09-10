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

function Information() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={6}>
            <FeaturedStoryCard
              image="https://static.vecteezy.com/system/resources/previews/017/125/698/non_2x/cartoon-astronaut-in-outer-space-free-vector.jpg"
              title="Story of the Month"
              description="Website visitors today demand a frictionless user expericence — especially when using search. Because of the high standards."
              action={{
                type: "internal",
                route: "pages/company/about-us",
                color: "info",
                label: "Explore Authors",
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6} sx={{ ml: "auto", mt: { xs: 3, lg: 0 } }}>
            <FeaturedStoryCardDetails
              image="https://static.vecteezy.com/system/resources/previews/017/125/698/non_2x/cartoon-astronaut-in-outer-space-free-vector.jpg"
              title="The Hero of Ages"
              description="Website visitors today demand a frictionless user expericence — especially when using search. Because of the high standards."
              action={{
                type: "internal",
                route: "pages/company/about-us",
                color: "info",
                label: "Explore Authors",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
