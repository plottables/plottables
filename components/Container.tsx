import Header from "@/components/Header";
import React from "react";

const Container: React.FC = ({ children }) => {
  return (
    <div className="app">
      <div id="paper">
        <div id="pattern">
          <div id="content">
            <Header />
            <br />
            <br />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
