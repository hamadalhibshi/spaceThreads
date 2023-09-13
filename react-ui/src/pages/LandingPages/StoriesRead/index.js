import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import StoryApi from "../../../api/story";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import bgImage from "assets/images/city-profile.jpg";
import { useAuth } from "auth-context/auth.context";
import { Link } from "react-router-dom";
import BookIcon from "@mui/icons-material/Book";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import { Divider, Icon, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { FormControl, InputLabel, Select, MenuItem, styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Paper, Typography } from "@mui/material";

function StoriesRead() {
  const popularFontFamilies = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Palatino",
    "Garamond",
    "Comic Sans MS",
    "Trebuchet MS",
  ];

  const StyledFormControl = styled(FormControl)(({ theme }) => ({
    margin: theme.spacing(1),
    minWidth: 200,
  }));

  const StyledSelect = styled(Select)(({ theme }) => ({
    padding: theme.spacing(1.5),
  }));

  const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    fontSize: "1rem",
  }));

  const { user } = useAuth();

  const [fontSize, setFontSize] = useState(13.5); // Initial font size
  const [lightMode, setLightMode] = useState(false);
  const [bgColor, setBgColor] = useState("white");
  const [fontColor, setFontColor] = useState("black");
  const increaseFontSize = () => {
    // Increase the font size by 2 pixels
    if (fontSize < 22) {
      setFontSize(fontSize + 2);
      console.log("Font size Increased to " + fontSize);
    }
  };

  const decreaseFontSize = () => {
    // Increase the font size by 2 pixels
    if (fontSize > 10) {
      setFontSize(fontSize - 2);
      console.log("Font size decreased to " + fontSize);
    }
  };

  const toggleLight = () => {
    setLightMode(!lightMode);
    if (lightMode) {
      setBgColor("white");
      setFontColor("black");
    } else {
      setBgColor("#121212");
      setFontColor("white");
    }
  };

  const [selectedFont, setSelectedFont] = useState("");

  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
    console.log(selectedFont);
  };

  // Styled components
  const CommentContainer = styled(Paper)`
    && {
      margin-bottom: 16px;
    }
  `;

  const CommentText = styled("div")`
    padding-left: ${({ isReply }) => (isReply ? "32px" : "0")};
  `;

  const [comment, setComment] = useState([]);
  async function addComment() {
    try {
      const userId = user._id;
      console.log(`this is the user id =====> ${userId}`);
      const req = {
        userId,
        content: comment,
      };

      await StoryApi.createComment(req);

      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }
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
            <MKTypography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              *Story Title*
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
              *by author*
            </MKTypography>
            <MKTypography
              variant="h3"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              *1. Chapter Title*
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
        <MKTypography
          variant="h4"
          sx={{ mb: 5 }}
          component="span"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid container item xs={12} lg={8} justifyContent="space-between">
            <MKButton component={Link} to={"/home"} variant="gradient" size="small" color={"dark"}>
              Previous Chapter
            </MKButton>
            <MKButton component={Link} to={"/home"} variant="gradient" size="small" color={"dark"}>
              Next Chapter
            </MKButton>
          </Grid>
        </MKTypography>
        <Divider sx={{ bgcolor: "secondary.dark" }} />
        <MKTypography
          variant="h4"
          sx={{ mb: 5 }}
          component="span"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid container item xs={12} lg={8} justifyContent="space-between">
            <IconButton onClick={increaseFontSize}>
              <TextIncreaseIcon />
            </IconButton>
            <IconButton onClick={decreaseFontSize}>
              <TextDecreaseIcon />
            </IconButton>
            <StyledFormControl variant="outlined">
              <InputLabel>Select Font Family</InputLabel>
              <StyledSelect
                value={selectedFont}
                onChange={handleFontChange}
                label="Select Font Family"
              >
                {popularFontFamilies.map((font, index) => (
                  <StyledMenuItem key={index} value={font}>
                    {font}
                  </StyledMenuItem>
                ))}
              </StyledSelect>
            </StyledFormControl>

            <IconButton onClick={toggleLight}>
              {lightMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Grid>
        </MKTypography>
        <Divider sx={{ bgcolor: "secondary.dark" }} />
      </Card>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
          bgcolor: bgColor,
        }}
      >
        <MKTypography
          variant="body1"
          color={fontColor}
          alignItems="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          opacity={0.8}
          mt={1}
          mb={3}
        >
          <span> *Chapter No*</span>
          <span> *Chapter Title*</span>
        </MKTypography>
        <MKTypography
          fontSize={fontSize}
          fontFamily={selectedFont}
          color={fontColor}
          alignItems="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          lineHeight={1.5}
          textAlign="justify"
          textJustify="inter-word"
          opacity={0.8}
          mt={1}
          mb={5}
        >
          Zorian’s eyes abruptly shot open as a sharp pain erupted from his stomach. His whole body
          convulsed, buckling against the object that fell on him, and suddenly he was wide awake,
          not a trace of drowsiness in his mind. “Good morning, brother!” an annoyingly cheerful
          voice sounded right on top of him. “Morning, morning, MORNING!!!” Zorian glared at his
          little sister, but she just smiled back at him cheekily, still sprawled across his
          stomach. She was humming to herself in obvious satisfaction, kicking her feet playfully in
          the air as she studied the giant world map Zorian had tacked to the wall next to his bed.
          Or rather, pretended to study – Zorian could see her watching him intently out of the
          corner of her eyes for a reaction. This was what he got for not arcane-locking the door
          and setting up a basic alarm perimeter around his bed. “Get off,” he told her in the
          calmest voice he could muster. “Mom said to wake you up,” she said matter-of-factly, not
          budging from her spot. “Not like this, she didn’t,” Zorian grumbled, swallowing his
          irritation and patiently waiting till she dropped her guard. Predictably, Kirielle grew
          visibly agitated after only a few moments of this pretend disinterest. Zorian’s eyes
          abruptly shot open as a sharp pain erupted from his stomach. His whole body convulsed,
          buckling against the object that fell on him, and suddenly he was wide awake, not a trace
          of drowsiness in his mind. “Good morning, brother!” an annoyingly cheerful voice sounded
          right on top of him. “Morning, morning, MORNING!!!” Zorian glared at his little sister,
          but she just smiled back at him cheekily, still sprawled across his stomach. She was
          humming to herself in obvious satisfaction, kicking her feet playfully in the air as she
          studied the giant world map Zorian had tacked to the wall next to his bed. Or rather,
          pretended to study – Zorian could see her watching him intently out of the corner of her
          eyes for a reaction. This was what he got for not arcane-locking the door and setting up a
          basic alarm perimeter around his bed. “Get off,” he told her in the calmest voice he could
          muster. “Mom said to wake you up,” she said matter-of-factly, not budging from her spot.
          “Not like this, she didn’t,” Zorian grumbled, swallowing his irritation and patiently
          waiting till she dropped her guard. Predictably, Kirielle grew visibly agitated after only
          a few moments of this pretend disinterest.
        </MKTypography>
      </Card>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Divider sx={{ bgcolor: "secondary.dark" }} />
        <MKTypography
          variant="h4"
          sx={{ mb: 5 }}
          component="span"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid container item xs={12} lg={8} justifyContent="space-between">
            <MKButton component={Link} to={"/home"} variant="gradient" size="small" color={"dark"}>
              Previous Chapter
            </MKButton>
            <MKButton
              component={Link}
              to={"/stories/show"}
              variant="gradient"
              size="small"
              color={"dark"}
            >
              Chapters Index
            </MKButton>
            <MKButton component={Link} to={"/home"} variant="gradient" size="small" color={"dark"}>
              Next Chapter
            </MKButton>
          </Grid>
        </MKTypography>
        <Divider sx={{ bgcolor: "secondary.dark" }} />
        <MKTypography variant="h4" sx={{ mb: 5 }} component="span" alignItems="left">
          Comments (*Comments number*)
        </MKTypography>

        <Grid container item justifyContent="center" alignItems="center">
          <Grid item xs={12} lg={8}>
            <TextField
              margin="normal"
              fullWidth
              id="prologue"
              name="content"
              label="Write a Comment"
              autoComplete="off"
              variant="outlined"
              multiline
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <MKButton
              component={Link}
              to={"/home"}
              variant="gradient"
              size="small"
              color={"dark"}
              onClick={addComment}
            >
              Add Comment
            </MKButton>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={8}>
          {/* Comment 1 */}

          <MKTypography sx={{ mt: 4 }} variant="h6">
            Commentor Name
          </MKTypography>
          <CommentText>
            <MKTypography variant="body1">This is the comment text for Comment 1.</MKTypography>
          </CommentText>
          <MKButton
            component={Link}
            to={"/home"}
            variant="gradient"
            size="small"
            color={"dark"}
            sx={{ marginLeft: "auto", justifyContent: "space-between" }}
          >
            Reply
          </MKButton>
          {/* Reply to Comment 1 */}
          <Grid item xs={12} lg={8} sx={{ ml: 8, mt: 2 }}>
            <MKTypography variant="h6">Replier Name</MKTypography>
            <CommentText>
              <MKTypography variant="body1">This is the reply to Comment 1.</MKTypography>
            </CommentText>
          </Grid>
        </Grid>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default StoriesRead;
