"use client";
import { useEffect, useState } from "react";
import { fetchProduct } from "../../service";
import Loader from "../../components/Loader";
import styles from "../../page.module.css";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "@/app/components/Navbar";

function ProductDetail({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = params.id;
        const data = await fetchProduct(id as string);
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  // Sepete ürün eklemek
  const addToCart = (product: undefined) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    console.log(localStorage.getItem("cart"));
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Navbar />
      <Grid container spacing={2} className={styles.container}>
        <Grid item xs={12} sm={6} md={6}>
          <Box className={styles.main}>
            <img src={product.image} alt={product.title} height={500} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card className={styles.mainCard}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
          </Card>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                width: 1000,
                height: 50,
                bgcolor: "lavender",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                ${product.price.toFixed(2)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                bgcolor: "#E0C2FF",
                width: "100%",
                boxShadow: "none",
                borderRadius: "0",
              }}
              endIcon={<AddIcon />}
              onClick={() => addToCart(product)}
            >
              Add Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
export default ProductDetail;
