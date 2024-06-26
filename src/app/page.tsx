"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { useRouter } from "next/navigation";
import Loader from "./components/Loader";
import { fetchProducts } from "./service";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Sepete ürün eklemek
  const addToCart = (product: undefined) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

  const limitDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <main className={styles.main}>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingX: 5,
          paddingY: 15,
        }}
      >
        <Grid container spacing={3}>
          {products.map((product: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ maxHeight: 600 }}>
                <div className={styles.cardMediaContainer}>
                  <CardMedia
                    component="img"
                    alt={product.title}
                    height="350"
                    image={product.image}
                    onClick={() => router.push(`./product/${product?.id}`)}
                    className={styles.cardMedia}
                  />
                  <div className={styles.magnifierIcon}>
                    <ImageSearchIcon
                      fontSize="large"
                      onClick={() => router.push(`./product/${product?.id}`)}
                    />
                  </div>
                </div>
                <CardContent sx={{ padding: 1, paddingBottom: 0 }}>
                  <Typography variant="h6" component="div" gutterBottom noWrap>
                    {product.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    color="text.secondary"
                  >
                    {limitDescription(product.description, 85)}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="secondary"
                    p="5px"
                    gutterBottom
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "center", padding: 1, paddingTop: 0 }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ bgcolor: "#E0C2FF", width: "100%" }}
                    endIcon={<AddIcon />}
                    onClick={() => addToCart(product)}
                  >
                    Add Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </main>
  );
}
