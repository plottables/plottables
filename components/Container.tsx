import Header from "@/components/Header";
import React from "react";

const Container: React.FC = ({ children }) => {
  return (
    <div className="container">
      <Header/>
      {children}
    </div>
  );
};

export default Container;
