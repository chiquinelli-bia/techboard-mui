import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
// import { styled } from "@mui/material/styles";

import tecboardLogo from "../../assets/tecboard.sgv";
import bannerImage from "../../assets/banner.png";

// const eventCategories = [
//   {
//     name: "Front-end",
//     events: [
//       {
//         id: 1,
//         name: "Workshop React",
//         theme: "Front-end",
//         date: "20/05/2025",
//         image: "https://placehold.co/236x282",
//       },
//       {
//         id: 2,
//         name: "Conference JS",
//         theme: "Front-end",
//         date: "15/06/2025",
//         image: "https://placehold.co/236x282",
//       },
//       {
//         id: 3,
//         name: "Vue.js Masterclass",
//         theme: "Front-end",
//         date: "10/07/2025",
//         image: "https://placehold.co/236x282",
//       },
//       {
//         id: 4,
//         name: "Angular Workshop",
//         theme: "Front-end",
//         date: "25/07/2025",
//         image: "https://placehold.co/236x282",
//       },
//     ],
//   },
//   {
//     name: "Design",
//     events: [
//       {
//         id: 5,
//         name: "UX/UI Design",
//         theme: "Design",
//         date: "05/08/2025",
//         image: "https://placehold.co/236x282",
//       },
//       {
//         id: 6,
//         name: "Figma Masterclass",
//         theme: "Design",
//         date: "12/08/2025",
//         image: "https://placehold.co/236x282",
//       },
//       {
//         id: 7,
//         name: "Design Thinking",
//         theme: "Design",
//         date: "20/08/2025",
//         image: "https://placehold.co/236x282",
//       },
//       {
//         id: 8,
//         name: "Adobe Creative",
//         theme: "Design",
//         date: "30/08/2025",
//         image: "https://placehold.co/236x282",
//       },
//     ],
//   },
//   {
//     name: "Marketing",
//     events: [
//       {
//         id: 9,
//         name: "Marketing Digital",
//         theme: "Marketing",
//         date: "05/09/2025",
//         image: "https://placehold.co/236x282",
//       },
//       {
//         id: 10,
//         name: "SEO Avançado",
//         theme: "Marketing",
//         date: "15/09/2025",
//         image: "https://placehold.co/236x282",
//       },
//       {
//         id: 11,
//         name: "Social Media",
//         theme: "Marketing",
//         date: "25/09/2025",
//         image: "https://placehold.co/236x282",
//       },
//       {
//         id: 12,
//         name: "Growth Hacking",
//         theme: "Marketing",
//         date: "05/10/2025",
//         image: "https://placehold.co/236x282",
//       },
//     ],
//   },
// ];

// const Chip = styled(Box)(({ theme }) => ({
//   display: "inline-flex",
//   backgroundColor: theme.palette.textSecondary,
//   padding: "8px",
//   borderRadius: "4px",
//   mb: 1,
// }));

export const Board = () => {
  return (
    <Box sx={{ height: "100vh", backgroundColor: "#06151A" }}>
      {/* Header */}
      <AppBar position="static" sx={{ py: 2, backgroundColor: "#06151A" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <img src={tecboardLogo} alt="Logo" style={{ height: "28px" }} />
        </Toolbar>
      </AppBar>
      {/* Seção de Banner */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          height: "600px",
          background: "linear-gradient(180deg, #17D9B1 0%, #06151A 100%)",
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <img src={bannerImage} />
          <Typography
            variant="h1"
            component="h1"
            sx={{
              position: "absolute",
              bottom: "80px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "652px",
              textAlign: "center",
            }}
          >
            Seu hub de eventos de tecnologia
          </Typography>
        </Box>
      </Box>

      <TextField />
      <TextField />
      <TextField />
      <Button></Button>
    </Box>
  );
};
