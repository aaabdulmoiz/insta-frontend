import React from "react";
import NavBar from "../Components/NavBar";
import Layout from "../Components/Layout";
import { useLocation } from "react-router";
export default function Profile() {
  const location = useLocation();
  return (
    <div>
      <NavBar />
      <Layout>
        <h1>Profile</h1>
      </Layout>
    </div>
  );
}
