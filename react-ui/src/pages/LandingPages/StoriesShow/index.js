import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
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
import { Icon } from "@mui/material";
function StoriesShow() {
  const { user } = useAuth();
  const rows = [
    { chapterNo: 1, title: "John Doe", author: "John Doe", mergedOn: "11/22/63" },
    { chapterNo: 2, title: "Jane Smith", author: "John Doe", mergedOn: "19/11/20" },
    { chapterNo: 3, title: "Bob Johnson", author: "John Doe", mergedOn: "07/9/19" },
    { chapterNo: 4, title: "John Doe", author: "John Doe", mergedOn: "11/22/63" },
    { chapterNo: 5, title: "Jane Smith", author: "John Doe", mergedOn: "19/11/20" },
    { chapterNo: 6, title: "Bob Johnson", author: "John Doe", mergedOn: "07/9/19" },
    // Add more rows as needed
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  // Sample data for the table

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
            <MKButton
              color="default"
              sx={{ color: ({ palette: { dark } }) => dark.main }}
              href="/stories/show/read"
            >
              Start Reading
            </MKButton>
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
          <Grid container item xs={12} lg={8} justifyContent="space-around">
            <MKTypography variant="h4" component="span" display="flex" alignItems="center">
              <Icon>
                <BookIcon />
              </Icon>
              <span>Genre</span>
            </MKTypography>
            <MKTypography variant="h4" component="span" display="flex" alignItems="center">
              <Icon>
                <BookIcon />
              </Icon>
              <span>Completed</span>
            </MKTypography>
            <MKTypography variant="h4" component="span" display="flex" alignItems="center">
              <Icon>
                <BookIcon />
              </Icon>
              <span>Rating</span>
            </MKTypography>
            <MKTypography variant="h4" component="span" display="flex" alignItems="center">
              <Icon>
                <BookIcon />
              </Icon>
              <span>Created On</span>
            </MKTypography>
          </Grid>
        </MKTypography>
        <MKTypography
          display="flex"
          justifyContent="space-around"
          variant="h6"
          textTransform="capitalize"
          fontWeight="bold"
        >
          <MKTypography
            variant="h4"
            sx={{ mb: 5 }}
            component="span"
            display="flex"
            alignItems="center"
          >
            <Icon>
              <BookIcon />
            </Icon>
            <span>Table of Contents</span>
          </MKTypography>
        </MKTypography>
        <Paper>
          <TableContainer>
            <Table>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                  align="center"
                >
                  Chapter
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                  align="center"
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                  align="center"
                >
                  Author
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                  align="center"
                >
                  Merged On
                </TableCell>
              </TableRow>

              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row) => (
                  <TableRow key={row.chapterNo}>
                    <TableCell align="center">{row.chapterNo}</TableCell>
                    <TableCell align="center">
                      <Link to={`/stories/${row.title}/${row.chapterNo}`}>{row.title}</Link>
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/authors/${row.author}`}>{row.author}</Link>
                    </TableCell>
                    <TableCell align="center">{row.mergedOn}</TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={4} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default StoriesShow;
