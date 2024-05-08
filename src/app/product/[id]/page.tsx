"use client";
import { useEffect, useState } from "react";
import { fetchProduct } from "../../service";
import Loader from "../../components/Loader";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
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

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingX: 5,
          paddingY: 15,
        }}
      >
        <Card sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardContent sx={{ padding: 2 }}>
              <Typography variant="h2" component="div" gutterBottom>
                {product.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
              >
                {product.description}
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            alt={product.title}
            height="500"
            image={product.images[0]}
          />
        </Card>
      </Box>
    </>
  );
}
export default ProductDetail;
