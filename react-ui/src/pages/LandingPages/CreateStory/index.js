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
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Material Kit 2 React components
import MKButton from "components/MKButton";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

import { useAuth } from "auth-context/auth.context";
import { useState } from "react";
import axios from "axios";
import StoryApi from "api/story";

function CreateStory() {
  const { user } = useAuth();

  const [data, setData] = useState({
    title: "",
    genre: "",
    prologue: "",
    authorId: user._id,
  });

  const handleChange = (e) => {
    // Handle form input changes here
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    console.log(data);
  };

  const handleAgeGroupChange = (e) => {
    setData({ ...data, [e.target.getAttribute("name")]: e.target.getAttribute("value") }); // Update selectedAgeGroup with the value attribute of the clicked MenuItem
    closeDropdown(); // Close the menu after selection
    console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data", data);
    StoryApi.createStory(data)
      .then((response) => {
        console.log("Story created successfully", response.data);
      })
      .catch((error) => {
        console.error("Error creating story", error);
      });
  };

  function handleImageUpload(evt) {
    // get the image uploaded in input file, it will be the first element in files arr
    const file = evt.target.files[0];
    console.log(file);

    TransformFileData(file);
  }
  // transfer file/image to base64 string
  function TransformFileData(file) {
    //The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
    // FileReader can only access the contents of files that the user has explicitly selected, either using an HTML <input type="file"> element or by drag and drop
    // filereader is js object
    const reader = new FileReader();

    if (file) {
      // Starts reading the contents of the specified Blob, once finished, the "result" attribute contains a data: URL representing the file's data.
      reader.readAsDataURL(file);
      // Fired when a read has completed, successfully or not.
      reader.onloadend = () => {
        console.log(reader.result);
        setData({ ...data, image: reader.result });
        // setError("");
      };
    } else {
      // no image
      setData({ ...data, image: "" });
      // setError("");
    }
  }

  //DROP DOWN STYLING
  const [dropdown, setDropdown] = useState(null);

  const openDropdown = ({ currentTarget }) => setDropdown(currentTarget);
  const closeDropdown = () => setDropdown(null);

  // Styles
  const iconStyles = {
    ml: 1,
    fontWeight: "bold",
    transition: "transform 200ms ease-in-out",
  };

  const dropdownIconStyles = {
    transform: dropdown ? "rotate(180deg)" : "rotate(0)",
    ...iconStyles,
  };

  return (
    <>
      {user && user.token ? (
        <DefaultNavbar
          routes={routes}
          action={{
            type: "internal",
            route: "/sign-out/",
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
            route: "/sign-in/",
            label: "login",
            color: "default",
          }}
          transparent
          light
        />
      )}
      <MKBox
        minHeight="50vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(https://i.pinimg.com/originals/2c/7a/aa/2c7aaab1a0c06f6ec16a0d67288eded1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container maxWidth="lg">
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
            <MKTypography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Create a Story
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
              Crafting cosmic tales that transport you to the stars
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>

      <Card
        sx={{
          p: 2,
          mx: "auto",
          mt: -8,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
          maxWidth: "80vw",
        }}
      >
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                labelId="genre-label"
                id="genre"
                name="genre"
                defaultValue="fiction"
                onChange={handleChange}
                fullWidth
                sx={{ height: 43, mt: 0.4 }}
              >
                <MenuItem value="action">Thriller</MenuItem>
                <MenuItem value="comedy">Comedy</MenuItem>
                <MenuItem value="drama">Drama</MenuItem>
                <MenuItem value="science-fiction">Science Fiction</MenuItem>
                <MenuItem value="historical-fiction">Historical Fiction</MenuItem>
                <MenuItem value="fantasy">Fantasy</MenuItem>
                <MenuItem value="romance">Romance</MenuItem>
                <MenuItem value="horror">Horror</MenuItem>
                <MenuItem value="fiction">Fiction</MenuItem>
                <MenuItem value="non-fiction">Non-fiction</MenuItem>
              </Select>
            </Grid>

            {/* <Grid item xs={6}>
              <InputLabel id="age-group-label">Age Group</InputLabel>
              <Select
                labelId="age-group-label"
                id="age_group"
                name="age_group"
                onChange={handleChange}
                fullWidth
                sx={{ height: 43, mt: 0.4 }}
              >
                <MenuItem value="0-2">0-2</MenuItem>
                <MenuItem value="3-5">3-5</MenuItem>
                <MenuItem value="6-8">6-8</MenuItem>
                <MenuItem value="9-12">9-12</MenuItem>
                <MenuItem value="13-17">13-17</MenuItem>
                <MenuItem value="18+">18+</MenuItem>
              </Select>
            </Grid> */}
            <Grid item xs={6}>
              <MKButton variant="gradient" color="info" onClick={openDropdown}>
                {data.age_group ? data.age_group : "Age Group"}{" "}
                <Icon sx={dropdownIconStyles}>expand_more</Icon>
              </MKButton>
              <Menu
                anchorEl={dropdown}
                open={Boolean(dropdown)}
                onClose={closeDropdown}
                id="age_group"
                name="age_group"
              >
                <MenuItem value="0-2" name="age_group" onClick={handleAgeGroupChange}>
                  0-2
                </MenuItem>
                <MenuItem value="3-5" name="age_group" onClick={handleAgeGroupChange}>
                  3-5
                </MenuItem>
                <MenuItem value="6-8" name="age_group" onClick={handleAgeGroupChange}>
                  6-8
                </MenuItem>
                <MenuItem value="9-12" name="age_group" onClick={handleAgeGroupChange}>
                  9-12
                </MenuItem>
                <MenuItem value="13-17" name="age_group" onClick={handleAgeGroupChange}>
                  13-17
                </MenuItem>
                <MenuItem value="18+" name="age_group" onClick={handleAgeGroupChange}>
                  18+
                </MenuItem>
              </Menu>
            </Grid>

            <Grid item xs={6}>
              <TextField
                type="file"
                name="image"
                id="image"
                fullWidth
                InputProps={{ inputProps: { accept: "image/*" } }}
                onChange={handleImageUpload}
                sx={{ mt: 1.8 }}
              />
            </Grid>
          </Grid>

          <TextField
            margin="normal"
            required
            fullWidth
            id="prologue"
            name="prologue"
            onChange={handleChange}
            label="Prologue"
            autoComplete="off"
            variant="outlined"
            multiline
            rows={14}
          />
          <input type="hidden" name="authorId" id="authorId" value={data.authorId} />
          <Grid display="flex" justifyContent="center">
            <Button type="submit" variant="contained" sx={{ mt: 3, width: 200, color: "#fff" }}>
              Add Story
            </Button>
          </Grid>
        </Box>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default CreateStory;
