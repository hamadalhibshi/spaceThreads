import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import bgImage from "assets/images/city-profile.jpg";
import { useAuth } from "auth-context/auth.context";
import { useState, useEffect } from 'react';
import ChapterApi from 'api/chapter';


export default function CollapsibleTable() {
  const { user } = useAuth();

  const [data, setData] = useState([]);
  const [openRow, setOpenRow] = useState(null); // Track which row is open

  console.log(data)

  useEffect(() => {
    ChapterApi.getChapter()
      .then((response) => {
        setData(response.data);
        console.log('Data received successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleRowToggle = (index) => {
    // Toggle the open state of the clicked row
    setOpenRow((prevOpenRow) => (prevOpenRow === index ? null : index));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

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
              Approve Chapters
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableRow>
            <TableCell />
            <TableCell sx={{ fontWeight: 'bold' }}>Story Title</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">Chapters</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">Genre</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">Age Group</TableCell>
          </TableRow>
          <TableBody>
            {data && data?.map((story, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleRowToggle(index)}
                    >
                      {openRow === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{story.title}</TableCell>
                  <TableCell />
                  <TableCell align="right">{story.genre}</TableCell>
                  <TableCell align="right">{story.age_group}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>
                    <Collapse in={openRow === index} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant='h2' onClick={() => handleModalToggle(index)}>hello</Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={isModalOpen} onClose={handleModalToggle}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
        }}>
          <Typography variant='h1'>Chapter Title</Typography>
          <Typography variant='body1'> This is the content of the modal.  This is the content of the modal.  This is the content of the modal.  This is the content of the modal.  This is the content of the modal.  </Typography>
          <Container sx={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Button variant="contained" color="primary" onClick={handleModalToggle}
              sx={{
                marginRight: 4,
                color: '#fff',
                backgroundColor: 'green',
                '&:hover': {
                  backgroundColor: 'green',
                },
              }}
            >
              Approve
            </Button>
            <Button variant="contained" color="primary" onClick={handleModalToggle}
              sx={{
                marginRight: 4,
                color: '#fff',
                backgroundColor: 'red',
                '&:hover': {
                  backgroundColor: 'red',
                },
              }}
            >
              Reject
            </Button>
            <Button variant="outlined" color="primary" onClick={handleModalToggle}
              sx={{
                marginRight: 4,
                color: '#121212',
              }}>
              Cancel
            </Button>
          </Container>
        </div>
      </Modal>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}
