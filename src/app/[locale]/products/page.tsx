import React from "react";
import Navbar from "../../components/layout/Navbar";
import Video from "../../components/features/Video";
import ProductCard from "../../components/features/ProductCard";
import Footer from "../../components/layout/Footer";
export default function page() {
  return (
    <div className="">
      <Navbar />
      <Video />
      <ProductCard />
      <Footer />
    </div>
  );
}
