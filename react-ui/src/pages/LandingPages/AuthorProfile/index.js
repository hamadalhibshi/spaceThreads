import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import bgImage from "assets/images/city-profile.jpg";
import CardContent from "@mui/material/CardContent";
import { useAuth } from "auth-context/auth.context";

function AuthorProfile() {
  const { user } = useAuth();


  return (
    <>
      {user && user.token ? (
        <DefaultNavbar
          routes={routes}
          action={{
            type: "internal",
            route: "/pages/authentication/sign-out",
            label: "logout",
            color: "default",
          }}
          transparent
          light
        />
      ) : (
        <DefaultNavbar
          routes={routes}
          action={{
            type: "external",
            route: "https://appseed.us/product/material-kit/api-server-nodejs/react/",
            label: "download",
            color: "default",
          }}
          transparent
          light
        />
      )}
       <MKBox
        minHeight="60vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "center" }}
          >
            <MKTypography variant="h1" color="white">
              Author Name
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={12} md={6}>
              {/* Image */}
              <img
                src="https://www.victorwinners.com/wp-content/uploads/2022/11/Practical-steps-to-grow-your-audience-as-an-author.jpg"
                alt="Author Image"
                style={{ maxWidth: "100%", borderRadius: '20px' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Text */}
              <MKTypography variant="body1">
                This is the text content next to the image.
                You can replace this with your actual content.
              </MKTypography>
              <MKTypography variant="body1">
                This is the text content next to the image.
                You can replace this with your actual content.
              </MKTypography>
              <MKTypography variant="body1">
                This is the text content next to the image.
                You can replace this with your actual content.
              </MKTypography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default AuthorProfile;
