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
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import StoryApi from "../../../../api/story";
// Images
import profilePicture from "assets/images/bruce-mars.jpg";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../auth-context/auth.context";

function Profile() {
  const { user } = useAuth();
  useEffect(() => {
    const id = user._id;
    const req = {
      params: {
        id: id,
      },
    };
    console.log(`this is the req ====>`);
    console.log(req);
    async function getEverything() {
      const stats = await StoryApi.getStats(req);
      console.log(`this is stats =====>`);
      const actualStats = stats.data;
      console.log(actualStats);
      console.log("this is the req beofer the author details");
      console.log(req);
      const details = await StoryApi.authorUserDetails(req);
      console.log(details);
    }
    getEverything();
  }, []);
  return (
    <MKBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        <Grid container item xs={12} justifyContent="center" mx="auto">
          <MKBox mt={{ xs: -16, md: -20 }} textAlign="center">
            <MKAvatar src={profilePicture} alt="Burce Mars" size="xxl" shadow="xl" />
          </MKBox>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={7} mx={{ xs: "auto", sm: 6, md: 1 }}>
              <MKBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                {/* <MKTypography variant="h3">Hamad Alhibshi</MKTypography> */}
              </MKBox>
              <Grid container spacing={3} mb={3} justifyContent="space-around">
                <Grid item>
                  <MKTypography component="span" variant="h3" fontWeight="bold">
                    323&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="h3" color="text">
                    Stories
                  </MKTypography>
                </Grid>
                <Grid item>
                  <MKTypography component="span" variant="h3" fontWeight="bold">
                    323&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="h3" color="text">
                    Chapters
                  </MKTypography>
                </Grid>
              </Grid>
              <MKTypography variant="body1" fontWeight="light" color="text">
                Decisions: If you can&apos;t decide, the answer is no. If two equally difficult
                paths, choose the one more painful in the short term (pain avoidance is creating an
                illusion of equality). Choose the path that leaves you more equanimous. <br />
              </MKTypography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Profile;
