
import React from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

export default function Home() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Header />
      <HomePage />
    </div>
  );
}
