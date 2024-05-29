import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const handleLoggedOut = () => {
    localStorage.removeItem("token");
    navigate("/signIn");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GQL Tasks
          </Typography>
          <Button color="inherit" onClick={handleLoggedOut}>
            Logged Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
