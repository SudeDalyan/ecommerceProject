import { useEffect, useState } from "react";
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

const pages = ["Products"];

const Navbar = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const storedCartItems = localStorage.getItem("cart");
      if (storedCartItems) {
        const parsedCartItems = JSON.parse(storedCartItems);
        setCartItemCount(parsedCartItems.length);
      }
    }, 200);
    return () => clearInterval(timer);
  }, []);

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
            <img
              src={"https://i.ibb.co/mvF7MvL/logo.png"}
              alt="Logo"
              width="75"
            />
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
              <Link href="../cart">
                <IconButton sx={{ p: 0 }}>
                  <Badge badgeContent={cartItemCount} color="error">
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
};
export default Navbar;
