import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/features/ProductCard";
import ContactForm from "../components/features/ContactForm";

export default function page() {
  return (
    <div className="">
      <Navbar />
      <ProductCard />
      <Footer />
    </div>
  );
}
