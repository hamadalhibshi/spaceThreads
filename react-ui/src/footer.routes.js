// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/logo-ct-dark.png";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "SpaceThreads",
    image: logoCT,
    route: "/",
  },
  socials: [
    {
      icon: <GitHubIcon />,
      link: "https://git.generalassemb.ly/astronauts-team/space-threads",
    },
  ],
  menus: [
    {
      name: "home",
      items: [
        { name: "about us", href: "/about-us" },
        { name: "contact us", href: "/contact-us" },
      ],
    },
    {
      name: "story",
      items: [
        { name: "view stories", href: "/stories" },
        { name: "write stories", href: "/createStory" },
        { name: "dashboard", href: "/dashboard" },
      ],
    },
    {
      name: "Account",
      items: [{ name: "Profile", href: "/profile" }],
    },
    {
      name: "Authors",
      items: [{ name: "View Authors", href: "/authors" }],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} SpaceThreads by{" "}
      <MKTypography
        component="a"
        href="https://www.creative-tim.com"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        SEI-05 Boiz
      </MKTypography>
      .
    </MKTypography>
  ),
};
