import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

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
function StoriesRead() {
  const { user } = useAuth();
  const [fontSize, setFontSize] = useState(16); // Initial font size

  const increaseFontSize = () => {
    // Increase the font size by 2 pixels
    setFontSize(fontSize + 2);
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
            <IconButton onClick={increaseFontSize}>
              <TextDecreaseIcon />
            </IconButton>

            <IconButton onClick={increaseFontSize}>
              <DarkModeIcon />
            </IconButton>
          </Grid>
        </MKTypography>
        <Divider sx={{ bgcolor: "secondary.dark" }} />
        <MKTypography
          variant="body1"
          color="black"
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
          variant="body1"
          color="black"
          alignItems="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          opacity={0.8}
          mt={1}
          mb={3}
        >
          <p>
            Zorian’s eyes abruptly shot open as a sharp pain erupted from his stomach. His whole
            body convulsed, buckling against the object that fell on him, and suddenly he was wide
            awake, not a trace of drowsiness in his mind. “Good morning, brother!” an annoyingly
            cheerful voice sounded right on top of him. “Morning, morning, MORNING!!!” Zorian glared
            at his little sister, but she just smiled back at him cheekily, still sprawled across
            his stomach. She was humming to herself in obvious satisfaction, kicking her feet
            playfully in the air as she studied the giant world map Zorian had tacked to the wall
            next to his bed. Or rather, pretended to study – Zorian could see her watching him
            intently out of the corner of her eyes for a reaction. This was what he got for not
            arcane-locking the door and setting up a basic alarm perimeter around his bed. “Get
            off,” he told her in the calmest voice he could muster. “Mom said to wake you up,” she
            said matter-of-factly, not budging from her spot. “Not like this, she didn’t,” Zorian
            grumbled, swallowing his irritation and patiently waiting till she dropped her guard.
            Predictably, Kirielle grew visibly agitated after only a few moments of this pretend
            disinterest. Just before she could blow up, Zorian quickly grasped her legs and chest
            and flipped her over the edge of the bed. She fell to the floor with a thud and an
            indignant yelp, and Zorian quickly jumped to his feet to better respond to any violence
            she might decide to retaliate with. He glanced down on her and sniffed disdainfully.
            “I’ll be sure to remember this the next time I’m asked to wake you up.” “Fat chance of
            that,” she retorted defiantly. “You always sleep longer than I do.” Zorian simply sighed
            in defeat. Damn the little imp, but she was right about that. “So…” she began excitedly,
            jumping to her feet, “are you excited?” Zorian watched her for a moment as she bounced
            around his room like a monkey on caffeine. Sometimes he wished he had some of that
            boundless energy of hers. But only some. “About what?” Zorian asked innocently, feigning
            ignorance. He knew what she meant, of course, but constantly asking obvious questions
            was the fastest way of frustrating his little sister into dropping a conversation he’d
            rather not have. “Going back to academy!” she whined, clearly aware of what he was
            doing. He needed to learn some new tricks. “Learning magic. Can you show me some magic?”
            Zorian let out a long-suffering sigh. Kirielle had always treated him as something of a
            playmate of hers, despite him doing his best not to encourage her, but usually she
            remained within certain unspoken boundaries. She was downright impossible this year,
            though, and Mother was wholly unsympathetic to his pleas to rein her in. All he did was
            read all day long, she said, so it wasn’t as if he was doing anything important…
            Thankfully the summer break was over and he could finally get away from them all. “Kiri,
            I have to pack. Why don’t you go pester Fortov for a change?” She scowled at him
            unhappily for a second and then perked up, as if remembering something, and quickly ran
            out of the room. Zorian’s eyes widened when he realized what she was up to a second too
            late. “No!” he yelled as he ran after her, only to have the bathroom door slammed into
            his face. He pounded on the door in frustration. “Damn it, Kiri! You had all the time in
            the world to go to the bathroom before I woke up!” “Sucks to be you,” was her only
            answer. After hurling a few choice curses at the door, Zorian stomped off back to his
            room to get dressed. She would be inside for ages, he was sure, if only to spite him.
            Quickly changing out of his pajamas and putting on his glasses, Zorian took a moment to
            look around his room. He was pleased to note Kirielle hadn’t rummaged through his stuff
            before waking him up. She had a very fuzzy notion of (other people’s) privacy. It didn’t
            take Zorian long to pack – he had never really unpacked, to be honest, and would have
            gone back to Cyoria a week ago if he thought Mother would have allowed it. He was just
            packing his school supplies when he realized with irritation that some of his textbooks
            were missing. He could try a locator spell, but he was pretty sure he knew where they
            had ended up – Kirielle had a habit of taking them to her room, no matter how many times
            Zorian told her to keep her sticky little fingers away from them. Working on a hunch, he
            double-checked his writing supplies and, sure enough, found they had been greatly
            depleted. It always happened – every time he came home, Kirielle would raid his school
            supplies. Putting aside the ethical problems inherent in breaking into your brother’s
            room in order to steal his things, what on earth was she doing with all those pencils
            and erasers? This time he specifically bought extras with his sister in mind, but it
            still wasn’t enough - he couldn’t find a single eraser in his drawer, and he bought a
            whole packet of them before coming home. Why Kirielle couldn’t simply ask Mother to buy
            her some books and pens of her own was never really clear to Zorian. She was the
            youngest, and the only daughter, so Mother was always happy to spoil her - the dolls she
            talked Mother into buying her were five times more expensive than a couple of books and
            a stack of pencils. In any case, while Zorian had no delusions about ever seeing his
            writing supplies again, he really needed those textbooks. With that in mind, he marched
            off to his sister’s room, ignoring the ‘Keep out!’ warning on the door, and quickly
            found his missing books in their usual location – cunningly hidden under the bed, behind
            several conveniently placed stuffed animals. His packing done, he went downstairs to eat
            something and see what Mother wanted from him. Though his family thought he simply liked
            to sleep in, Zorian actually had a reason for being a late riser. It meant he could eat
            his food in peace, as everyone else had already had their breakfast by then. Few things
            annoyed him more than someone trying to strike up a conversation while he was eating,
            and that was precisely the time when the rest of his family was most talkative.
            Unfortunately, Mother wasn’t willing to wait for him today, and immediately descended
            upon him when she saw him coming down. He didn’t even finish his descent down the stairs
            and she had already found something about him she didn’t like. “You don’t really intend
            to go out looking like that, do you?” she asked. “What’s wrong with this?” asked Zorian.
            He was wearing a plain brown outfit, little different from the ones other boys wore when
            they were going into the city. It seemed just fine to him. “You can’t go out looking
            like that,” his mother said with a long-suffering sigh. “What do you think people will
            say when they see you wearing that?” “Nothing?” Zorian tried. “Zorian, don’t be so
            difficult,” she snapped at him. “Our family is one of the pillars of this town. We’re
            under scrutiny every time we leave the house. I know you don’t care about such things,
            but appearances are important to a lot of people. You need to realize you’re not an
            island, and you can’t decide things as if you were alone in the world. You are a member
            of this family, and your actions inevitably reflect on our reputation. I will not let
            you embarrass me by looking like a common factory worker. Go back to your room and put
            on some proper attire.” Zorian restrained himself from rolling his eyes just long enough
            to turn his back on her. Maybe her guilt trip would have been more effective if this was
            the first time she tried it on him. Still, it wasn’t worth the argument, so he changed
            into a pricier set of clothes. It was totally excessive, considering he’d be spending
            the whole day in the train, but his mother nodded approvingly when she saw him coming
            down the stairs. She had him turn and pose like a show animal for a while before
            pronouncing him ‘fairly decent’. He went to the kitchen and, to his annoyance, Mother
            followed after him. No eating in peace today, it seemed. Father was thankfully on one of
            his 'business trips', so he wouldn't have to deal with him today. He entered the kitchen
            and frowned when he saw a bowl of porridge already waiting for him on the table. Usually
            he made his own breakfast, and he liked it that way, but he knew his mother never
            accepted that. This was her idea of a peace gesture, which meant she was going to ask
            something of him he wouldn’t like. “I figured I’d prepare something for you today, and I
            know you’ve always liked porridge,” she said. Zorian refrained from mentioning he hadn’t
            liked it since he was about eight. “You slept longer than I thought you would, though.
            It's gone cold while I've waited for you.” Zorian rolled his eyes and cast a slightly
            modified ‘heat water’ spell on the porridge, which was instantly returned to a pleasant
            temperature. He ate his breakfast in silence while Mother talked to him at length about
            a crop-related dispute one of their suppliers was involved in, dancing around whatever
            topic she wanted to broach. He effortlessly tuned her out. It was practically a survival
            skill for every child in the Kazinski family, as both mother and father were prone to
            protracted lectures on every subject imaginable, but doubly so for Zorian, who was the
            black sheep of the family and thus subjected to such monologues more frequently than the
            rest. Thankfully, his mother thought nothing of his silence, because Zorian was always
            as silent as possible around his family – he had learned many years ago that this was
            the easiest way of getting along with them. “Mother,” he interrupted her, “I just woke
            up via Kiri jumping on me, I haven’t had a chance to go to the bathroom and now you’re
            pestering me while I’m eating. Either get to the point or wait a couple of minutes while
            I finish breakfast.” “She did it again?” his mother asked, amusement obvious in her
            voice. Zorian rubbed his eyes, not saying anything, before surreptitiously pocketing an
            apple from the bowl on the table while his mother wasn’t looking. There were a lot of
            annoying things Kirielle did again and again, but complaining about it to Mother was a
            waste of time. No one in this family was on his side. “Oh, don’t be like that,” his
            mother said, noticing his less-than-pleased reaction. “She’s just bored and playing with
            you. You take things way too seriously, just like your father.” “I am nothing like my
            father!” Zorian insisted, raising his voice and glaring at her. This was why he hated
            eating with other people. He returned to his breakfast with renewed vigor, eager to
            finish this as soon as possible.
          </p>
        </MKTypography>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default StoriesRead;
