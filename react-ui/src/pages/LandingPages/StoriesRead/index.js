import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import StoryApi from "api/story";
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
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";

function StoriesRead() {
  let { id } = useParams();
  const [data, setData] = useState({});
  const [chapterNo, setChapterNo] = useState(0)

  const handleNextChapter = () => {
    console.log("Next Chapter Clicked, NO: " + chapterNo)
    console.log(data.chapters.length)
    if (chapterNo < data.chapters.length - 1) {
      setChapterNo(prevState => prevState + 1)
    }

  }
  const handlePreviousChapter = () => {
    console.log("Previous Chapter Clicked, NO: " + chapterNo)
    if (chapterNo > 0) {
      setChapterNo(prevState => prevState - 1)
    }

  }
  useEffect(() => {
    StoryApi.getOneStory(id)
      .then((response) => {
        setData(response.data);
        console.log("Data received successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

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

  let { user } = useAuth();

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
  // const CommentContainer = styled(Paper)`
  //   && {
  //     margin-bottom: 16px;
  //   }
  // `;

  const CommentText = styled("div")`
    padding-left: ${({ isReply }) => (isReply ? "32px" : "0")};
  `;

  const [comment, setComment] = useState([]);
  useEffect(() => {
    id = parseInt(id);
    const req = {
      storyId: id,
      chapterId: 0,
    };
    console.log("this is the req ====>");
    console.log(req);
    async function listStuff() {
      allComments = await StoryApi.listComment(req);
      console.log("these are the comments ===>");
      console.log(allComments);
    }
    listStuff();
  }, [comment]);
  async function addComment() {
    try {
      const userId = user._id;
      console.log(`this is the user id =====> ${userId}`);
      const req = {
        userId: userId,
        content: comment,
        storyId: id,
        chapterId: 0,
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
            {data && data.story && (
              <div>
                <MKTypography
                  variant="h1"
                  color="white"
                  sx={({ breakpoints, typography: { size } }) => ({
                    [breakpoints.down("md")]: {
                      fontSize: size["3xl"],
                    },
                  })}
                >
                  {data.story.title}
                </MKTypography>
                <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
                  {`by ${data.story.author}`}
                </MKTypography>
              </div>
            )}
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
            <MKButton variant="gradient" size="small" color={"dark"} onClick={handlePreviousChapter}>
              Previous Chapter
            </MKButton>
            <MKButton variant="gradient" size="small" color={"dark"} onClick={handleNextChapter}>
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
        {data && data.story && data.chapters && (
          <>
            <MKTypography
              fontSize={fontSize}
              fontFamily={selectedFont}
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
              <span> *Chapter No* {data.chapters[chapterNo].id}</span>
              <span> *Chapter Title* {data.chapters[chapterNo].title}</span>
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
              {data.chapters[chapterNo].content}
            </MKTypography>
          </>
        )}
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
            <MKButton variant="gradient" size="small" color={"dark"} onClick={handlePreviousChapter}>
              Previous Chapter
            </MKButton>
            {data && data.story && (
              <>
                <MKButton
                  component={Link}
                  to={`/storyDetails/${data?.story.id}`}
                  variant="gradient"
                  size="small"
                  color={"dark"}
                >
                  Chapters Index
                </MKButton>
              </>
            )}
            <MKButton variant="gradient" size="small" color={"dark"} onClick={handleNextChapter}>
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
