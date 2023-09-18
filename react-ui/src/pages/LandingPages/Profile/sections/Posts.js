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

// Material Kit 2 React components
import TransparentBlogCard from "examples/Cards/BlogCards/TransparentBlogCard";
import BackgroundBlogCard from "examples/Cards/BlogCards/BackgroundBlogCard";

// Images
import post1 from "assets/images/examples/testimonial-6-2.jpg";
import post2 from "assets/images/examples/testimonial-6-3.jpg";
import post3 from "assets/images/examples/blog-9-4.jpg";
import post4 from "assets/images/examples/blog2.jpg";

import { useEffect, useState } from "react";
import { useAuth } from "../../../../auth-context/auth.context";
import StoryApi from "../../../../api/story";



function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  const truncatedText = text.substr(0, maxLength);
  return `${truncatedText.trim()}...`;
}


function Posts() {
  const { user } = useAuth();
  const [data, setData] = useState();

  useEffect(() => {
    const id = user._id;
    const req = {
      params: {
        id: id,
      },
    };
    console.log(`this is the req in posts====>`);
    console.log(req);

    async function getEverything() {
      const stats = await StoryApi.getStats(req);
      console.log(`this is stats =====>`);
      const actualStats = stats.data;
      console.log(actualStats);
      console.log("this is the req before the author details");
      console.log(req);
      const details = await StoryApi.authorUserDetails(req);
      console.log(`these are the details ====>`)
      console.log(details);
      setData(details)
    }
    getEverything();
  }, []);

  return (
    <MKBox component="section" py={2}>
      <Container>
        <Grid container item xs={12} lg={6}>
          <MKTypography variant="h3" mb={6}>
            Latest Chapters
          </MKTypography>
        </Grid>
        <Grid container spacing={3}>
          {data &&
            data.data.stories_with_reviews.map((item, index) => {
              const imageUrl = item.story.image.replace("image/upload/", "");
              const truncatedDescription = truncateText(item.story.prologue, 100);
              return (
                <Grid item xs={12} sm={6} lg={3} key={index}>
                  <TransparentBlogCard
                    image={imageUrl}
                    title={item.story.title}
                    description={truncatedDescription}
                    action={{
                      type: "internal",
                      route: "/pages/blogs/author",
                      color: "info",
                      label: "read more",
                    }}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Posts;
