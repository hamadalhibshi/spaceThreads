/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
import routes from "routes";

import AuthApi from "../../../api/auth";
import { useAuth } from "../../../auth-context/auth.context";

function SignUpBasic() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [randomImage, setRandomImage] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthApi.Register(formData)
      .then((response) => {
        if (response.data.success) {
          return navigate("/pages/authentication/sign-in");
        }
        return setError(response.data.msg);
      })
      .catch((err) => {
        if (err.response) {
          return setError(err.response.data.msg);
        }
        return setError("There has been an error.");
      });
  };



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
      {user && user.token ? (
        <DefaultNavbar
          routes={routes}
          action={{
            type: "internal",
            route: "/pages/authentication/sign-out",
            label: "logout",
            color: "info",
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
            color: "info",
          }}
          transparent
          light
        />
      )}
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
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
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {user && user.token ? (
              <Card>
                <MKBox textAlign="center" ml={-1}>
                  <MKTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    You are already signed in.
                  </MKTypography>
                </MKBox>
              </Card>
            ) : (
              <Card>
                <MKBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  mx={2}
                  mt={-3}
                  p={2}
                  mb={1}
                  textAlign="center"
                >
                  <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                    Sign Up
                  </MKTypography>
                  <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                    <Grid item xs={2}>
                      <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                        <FacebookIcon color="inherit" />
                      </MKTypography>
                    </Grid>
                    <Grid item xs={2}>
                      <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                        <GitHubIcon color="inherit" />
                      </MKTypography>
                    </Grid>
                    <Grid item xs={2}>
                      <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                        <GoogleIcon color="inherit" />
                      </MKTypography>
                    </Grid>
                  </Grid>
                </MKBox>
                <MKBox pt={4} pb={3} px={3}>
                  <MKBox component="form" role="form">
                    <MKBox mb={2}>
                      <MKInput
                        type="text"
                        name="username"
                        onChange={handleChange}
                        label="Name"
                        fullWidth
                      />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput
                        type="email"
                        name="email"
                        onChange={handleChange}
                        label="Email"
                        fullWidth
                      />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput
                        type="password"
                        name="password"
                        onChange={handleChange}
                        label="Password"
                        fullWidth
                      />
                    </MKBox>
                    <MKBox textAlign="center" ml={-1}>
                      <MKTypography
                        variant="button"
                        fontWeight="regular"
                        color="text"
                        sx={{ cursor: "pointer", color: "red", userSelect: "none", ml: -1 }}
                      >
                        {error}
                      </MKTypography>
                    </MKBox>
                    <MKBox mt={4} mb={1}>
                      <MKButton variant="gradient" onClick={handleSubmit} color="info" fullWidth>
                        sign up
                      </MKButton>
                    </MKBox>
                    <MKBox mt={3} mb={1} textAlign="center">
                      <MKTypography variant="button" color="text">
                        Already have an account?{" "}
                        <MKTypography
                          component={Link}
                          to="/pages/authentication/sign-in"
                          variant="button"
                          color="info"
                          fontWeight="medium"
                          textGradient
                        >
                          Login
                        </MKTypography>
                      </MKTypography>
                    </MKBox>
                  </MKBox>
                </MKBox>
              </Card>
            )}
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default SignUpBasic;
