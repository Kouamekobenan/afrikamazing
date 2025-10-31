import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  console.log("📦 Root Layout appelé");
  return children;
}
