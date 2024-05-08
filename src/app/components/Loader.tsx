import * as React from "react";
import { CircularProgress } from "@mui/material";
import styles from "../page.module.css";

function Loader() {
  return (
    <main className={styles.main}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress sx={{ color: "#E0C2FF" }} />
      </div>
    </main>
  );
}
export default Loader;
