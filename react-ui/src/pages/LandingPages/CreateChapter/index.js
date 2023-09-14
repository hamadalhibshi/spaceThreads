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
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

import { useAuth } from "auth-context/auth.context";
import { useState } from "react";
import axios from 'axios'
import ChapterApi from "api/chapter";
import { useParams } from "react-router-dom";


function CreateStory() {
  const { user } = useAuth();

  const id = useParams();

  const [data, setData] = useState({
    title: '',
    content: '',
    storyId: id.id,
    userId: user._id,
    status:'Pending'
  });

  console.log(user._id)

  const handleChange = (e) => {
    // Handle form input changes here
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    console.log(data)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('data', data)
    ChapterApi.createChapter(data)
      .then((response) => {
        console.log('Chapter created successfully', response.data);
      })
      .catch((error) => {
        console.error('Error creating chapter', error);
      });
  };

  return (
    <>
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
            <Grid item xs={12}>
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

            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="content"
                name="content"
                onChange={handleChange}
                label="Content"
                autoComplete="off"
                variant="outlined"
                multiline
                rows={14}
              />
            </Grid>
            <Grid item xs={6}>
            </Grid>
          </Grid>
          <input
            type='hidden'
            name="authorId"
            id="authorId"
            value={data.authorId}
          />
          <Grid display='flex' justifyContent='center'>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, width: 200, color: '#fff' }}
            >
              Add Chapter
            </Button>
          </Grid>
        </Box>
      </Card>
    </>
  );
}

export default CreateStory;
