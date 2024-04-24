
import React from "react";
import HomePage from './pages/Home'
import Header from "./components/Header";
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
