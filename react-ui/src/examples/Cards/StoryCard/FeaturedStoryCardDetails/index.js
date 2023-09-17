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

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";
import { Grid } from "@mui/material";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

function FeaturedStoryCardDetails({
  title,
  description,
  genre,
  chapters,
  rating,
  status,
  createdOn,
  action,
}) {
  return (
    <Card>
      <MKBox p={3} mt={-1} textAlign="center">
        <MKTypography display="flex" variant="h6" textTransform="capitalize" fontWeight="bold">
          Featured Story
        </MKTypography>
        <MKTypography display="inline" variant="h3" textTransform="capitalize" fontWeight="regular">
          {title}
        </MKTypography>
        <MKTypography variant="h5" color={genre.color} mb={1}>
          {genre.label}
        </MKTypography>
        <MKBox mt={1} mb={3}>
          <MKTypography variant="body2" component="p" color="text">
            {description}
          </MKTypography>
        </MKBox>
        <MKTypography variant="body2" color="text">
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <span>Chapters: {chapters}</span>
            </Grid>
            <Grid item xs={6}>
              <span>Rating: {rating}</span>
            </Grid>
            <Grid item xs={6}>
              <span>Status: {status}</span>
            </Grid>
            <Grid item xs={6}>
              <span>{createdOn}</span>
            </Grid>
          </Grid>
        </MKTypography>
        {action.type === "external" ? (
          <MKButton
            component={MuiLink}
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="gradient"
            size="small"
            color={action.color ? action.color : "dark"}
          >
            {action.label}
          </MKButton>
        ) : (
          <MKButton
            component={Link}
            to={action.route}
            variant="gradient"
            size="small"
            color={action.color ? action.color : "dark"}
          >
            {action.label}
          </MKButton>
        )}
      </MKBox>
    </Card>
  );
}

// Typechecking props for the CenteredBlogCard
FeaturedStoryCardDetails.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  genre: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
    label: PropTypes.string.isRequired,
  }).isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedStoryCardDetails;
