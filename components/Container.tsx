import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import React from "react";

const Container: React.FC = ({ children }) => {
  return (
    <div className="app">
      <Head>
        <title>plottables</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div id="paper">
        <div id="pattern">
          <div id="content">
            <Header />
            <br />
            <br />
            {children}
            <br />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
