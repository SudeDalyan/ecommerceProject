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
import router from "next/router";

const pages = ["Products"];

function Navbar() {
  return (
    <AppBar sx={{ bgcolor: "#E0C2FF"}}>
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
            onClick={() => {
              router.push("/");
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
                href="/"
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box
            sx={{ flexGrow: 0 }}
            onClick={() => {
              router.push("/cart");
            }}
          >
            <Tooltip title="Shopping Cart">
              <IconButton sx={{ p: 0 }}>
                <Badge color="error">
                  <ShoppingBagOutlinedIcon style={{ color: "white" }} />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
