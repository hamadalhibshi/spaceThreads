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
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import HorizontalTeamCard from "examples/Cards/TeamCards/HorizontalTeamCard";
import StoryCard from "examples/Cards/StoryCard";
// Images
import team1 from "assets/images/team-5.jpg";
import team2 from "assets/images/bruce-mars.jpg";
import team3 from "assets/images/ivana-squares.jpg";
import team4 from "assets/images/ivana-square.jpg";

function Team() {
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
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <StoryCard
                image={team1}
                name="Danganronpa"
                position={{ color: "info", label: "Crime | Thriller" }}
                chapters="20"
                status="Completed"
                createdOn="9/7/1500"
                rating="5"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <StoryCard
                image={team2}
                name="Solo Leveling"
                position={{ color: "info", label: "Progression" }}
                chapters="20"
                status="Ongoing"
                createdOn="9/7/2000"
                rating="5"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <StoryCard
                image={team3}
                name="Stormlight Archive"
                position={{ color: "info", label: "Fantasy | Coming of Age" }}
                chapters="20"
                status="Ongoing"
                createdOn="12/12/2012"
                rating="5"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <StoryCard
                image={team4}
                name="The Wheel of Time"
                position={{ color: "info", label: "Fantasy | Politics" }}
                chapters="20"
                status="Ongoing"
                createdOn="11/22/63"
                rating="5"
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;
