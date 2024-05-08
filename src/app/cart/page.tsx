"use client";
import React, { useState, useEffect } from "react";
import styles from "../page.module.css";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import {
  Box,
  Typography,
  Container,
  Divider,
  Grid,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      setCartItems(parsedCartItems);

      // Tüm fiyatları topla
      const totalPrice = parsedCartItems.reduce((accumulator: any, currentItem: { price: any; }) => {
        return accumulator + currentItem.price;
      }, 0);
      setTotalPrice(totalPrice);
    }
  }, []);

  const handleRemoveClick = (productId: any) => {
    return () => {
      const updatedProducts = cartItems.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedProducts));
      setCartItems(updatedProducts);

      // Tüm fiyatları topla
      const totalPrice = updatedProducts.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price;
      }, 0);
      setTotalPrice(totalPrice);
    };
  };

  return (
    <>
      <Navbar />
      <Container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 5,
          paddingTop: 15,
        }}
      >
        {cartItems.length === 0 ? (
          <>
            <Typography
              style={{
                color: "#E0C2FF",
              }}
              variant="h5"
            >
              There are no items in your cart.
            </Typography>
            <Link href="./" style={{ textDecoration: "none" }}>
              <Typography
                style={{
                  fontFamily: "Rumeur",
                }}
                color="secondary"
                variant="h1"
              >
                Look at Our Products !
              </Typography>
            </Link>
          </>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={9}>
                {cartItems.map((item) => (
                  <Box key={item.id}>
                    <Divider />
                    <Grid container alignItems="center" spacing={2} p={2}>
                      <Grid item xs={12} sm={3}>
                        <img
                          src={item.image}
                          alt={item.title}
                          width={100}
                          height={100}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6">{item.title}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={3} container alignItems="flex-end" justifyContent="flex-end">
                        <Typography variant="h6" mr={3}>
                          ${item.price.toFixed(2)}
                        </Typography>
                        <IconButton
                          aria-label="remove"
                          color="error"
                          onClick={handleRemoveClick(item.id)}
                        >
                          <DeleteOutlineOutlined />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
                <Divider />
              </Grid>
              <Grid item xs={12} md={3}>
                <Card className={styles.mainCard}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Total Amount
                    </Typography>
                    <Typography variant="button" color="text.secondary">
                      ${totalPrice.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
                <Link href="../login" style={{ textDecoration: "none" }}>
                  <Box
                    sx={{
                      height: 50,
                      bgcolor: "lavender",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="button"
                      color="text.secondary"
                      fontSize={16}
                    >
                      Checkout
                    </Typography>
                  </Box>
                </Link>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </>
  );
};

export default CartPage;
