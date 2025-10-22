// page.tsx

import { Button } from "./components/ui/Button";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <div className="p-8">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6">Site vitrine Affrikamazing</h1>
      <Button label="En savoir plus!" />
      <Footer />
    </div>
  );
}
