import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/features/ProductCard";
import ContactForm from "../components/features/ContactForm";
import Video from "../components/features/Video";

export default function page() {
  return (
    <div className="">
      <Navbar />
      <Video/>
      <ProductCard />
      <Footer />
    </div>
  );
}
