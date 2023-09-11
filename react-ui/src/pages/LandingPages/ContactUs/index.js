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
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

import { useAuth } from "auth-context/auth.context";
import { useState, useEffect } from "react";

function ContactUs() {
  const { user } = useAuth();
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const imageArray = [
      'https://www.teahub.io/photos/full/85-857724_space-jam-space-background.jpg',
      'https://wallpaper-house.com/data/out/9/wallpaper2you_326448.jpg',
      'https://www.nawpic.com/media/2020/space-nawpic-18.jpg',
      'https://unblast.com/wp-content/uploads/2021/01/Space-Background-Image-3.jpg',
      'https://unblast.com/wp-content/uploads/2021/01/Space-Background-Image-4.jpg',
      'https://a-static.besthdwallpaper.com/astronaut-in-the-colorful-lights-of-planets-in-outer-space-wallpaper-2800x1050-93189_88.jpg',
      'https://www.hdwallpapers.in/download/stars_glare_space_dark_blue_sky_background_4k_hd_space-HD.jpg',
      'https://wallpapers.com/images/featured/space-background-htygkta8z6o3mcx2.jpg',
      'https://removal.ai/wp-content/uploads/2021/05/image11.png',
      'https://wallpaperboat.com/wp-content/uploads/2019/10/free-space-background-11.jpg',
      'https://images.hdqwalls.com/download/planet-moon-space-stars-4k-0c-3840x2400.jpg',
      'https://images.wallpaperscraft.com/image/single/planets_galaxy_stars_146448_3840x2160.jpg',
      'https://wallpaperaccess.com/full/19355.jpg',
      'https://picstatio.com/large/07ee48/fantasy-planet-space-astronaut.jpg'
    ];
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    setRandomImage(imageArray[randomIndex]);
  }, []); 

  
  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%">
        {user && user.token ? (
          <DefaultNavbar
            routes={routes}
            action={{
              type: "internal",
              route: "/pages/authentication/sign-out",
              label: "logout",
              color: "info",
            }}
          />
        ) : (
          <DefaultNavbar
            routes={routes}
            action={{
              type: "external",
              route: "https://appseed.us/product/material-kit/api-server-nodejs/react/",
              label: "download",
              color: "info",
            }}
          />
        )}
      </MKBox>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} lg={6}>
          <MKBox
            display={{ xs: "none", lg: "flex" }}
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            borderRadius="lg"
            ml={2}
            mt={2}
            sx={{
              backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                `${linearGradient(
                  rgba(gradients.dark.main, 0.6),
                  rgba(gradients.dark.state, 0.6)
                )}, url('${randomImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
             }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          md={7}
          lg={6}
          xl={4}
          ml={{ xs: "auto", lg: 6 }}
          mr={{ xs: "auto", lg: 6 }}
        >
          <MKBox
            bgColor="white"
            borderRadius="xl"
            shadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mt={{ xs: 20, sm: 18, md: 20 }}
            mb={{ xs: 20, sm: 18, md: 20 }}
            mx={3}
          >
            <MKBox
              variant="gradient"
              bgColor="info"
              coloredShadow="info"
              borderRadius="lg"
              p={2}
              mx={2}
              mt={-3}
            >
              <MKTypography variant="h3" color="white">
                Contact us
              </MKTypography>
            </MKBox>
            <MKBox p={3}>
              <MKTypography variant="body2" color="text" mb={3}>
                For further questions, including partnership opportunities, please email
                hello@creative-tim.com or contact using our contact form.
              </MKTypography>
              <MKBox width="100%" component="form" method="post" autocomplete="off">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <MKInput
                      variant="standard"
                      label="Full Name"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MKInput
                      type="email"
                      variant="standard"
                      label="Email"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MKInput
                      variant="standard"
                      label="What can we help you?"
                      placeholder="Describe your problem in at least 250 characters"
                      InputLabelProps={{ shrink: true }}
                      multiline
                      fullWidth
                      rows={6}
                    />
                  </Grid>
                </Grid>
                <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                  <MKButton type="submit" variant="gradient" color="info">
                    Send Message
                  </MKButton>
                </Grid>
              </MKBox>
            </MKBox>
          </MKBox>
        </Grid>
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default ContactUs;
