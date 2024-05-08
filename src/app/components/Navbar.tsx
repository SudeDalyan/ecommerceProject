import * as React from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Link from "next/link";
import router from "next/navigation";

const pages = ["Products"];

function Navbar() {
  return (
    <AppBar sx={{ bgcolor: "#E0C2FF" }}>
      <Container>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 500,
              color: "inherit",
              textDecoration: "none",
            }}
            style={{ cursor: "pointer" }}
          >
            Logo
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {pages.map((page) => (
              <Link
                key={page}
                style={{ textDecoration: "none", color: "#fff" }}
                href="../"
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Shopping Cart">
              <Link href={"../cart"}>
                <IconButton sx={{ p: 0 }}>
                  <Badge color="error">
                    <ShoppingBagOutlinedIcon
                      style={{ color: "white" }}
                      fontSize="large"
                    />
                  </Badge>
                </IconButton>
              </Link>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
