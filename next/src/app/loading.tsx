"use client";

import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <CircularProgress />
      <h3 style={{ marginTop: 10, color: "#bab2badb" }}>Loading...</h3>
    </div>
  );
}
