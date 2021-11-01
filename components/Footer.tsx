import React from "react";

const Footer: React.FC = ({ children }) => {
  return (
    <div className="footer">
      <div className="left">
        <a href={"/termsOfUse"} target="_blank" rel="noreferrer">
          Terms of Use
        </a>
        <a href={"/privacyPolicy"} target="_blank" rel="noreferrer">
          Privacy Policy
        </a>
      </div>
      <div className="center">
        <a href="https://www.apply.com" target="_blank" rel="noreferrer">
          apply
        </a>
        <a
          href="https://www.instagram.com/plottables.io/"
          target="_blank"
          rel="noreferrer"
        >
          instagram
        </a>
        <a
          href="https://twitter.com/plottables_io"
          target="_blank"
          rel="noreferrer"
        >
          twitter
        </a>
        <a
          href="https://github.com/plottables"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
      </div>
      <div className="right">
        <a href="https://www.artblocks.io/" target="_blank" rel="noreferrer">
          Powered By ArtBlocks
        </a>
      </div>
    </div>
  );
};

export default Footer;
