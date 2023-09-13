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
import FeaturedAuthor from "./FeaturedAuthor";
import FeaturedAuthorDetails from "./FeaturedAuthorDetails";
import { Typography } from "@mui/material";

function Information() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Typography variant="h3" sx={{mb:3}}>Author of the Month</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} lg={4} sx={{ ml: 0 }}>
            <FeaturedAuthor
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
          <Grid item xs={12} lg={8} sx={{ ml: "auto", mt: { xs: 3, lg: 0 } }}>
            <FeaturedAuthorDetails
              image="https://static.vecteezy.com/system/resources/previews/017/125/698/non_2x/cartoon-astronaut-in-outer-space-free-vector.jpg"
              title="The Hero of Ages"
              genre={{ color: "info", label: "Fantasy | Politics" }}
              chapters="20"
              status="Ongoing"
              stories='10'
              createdOn="11/22/36"
              action={{
                type: "internal",
                route: "pages/company/about-us",
                color: "info",
                label: "Visit",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
