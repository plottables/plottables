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
        <a
          href="https://www.instagram.com/plottables.io/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="icons/instagram.png"/>
        </a>
        <a
          href="https://twitter.com/plottablesio"
          target="_blank"
          rel="noreferrer"
        >
            <img src="icons/twitter.png"/>
        </a>
        <a
          href="https://github.com/plottables"
          target="_blank"
          rel="noreferrer"
        >
            <img src="icons/github.png"/>
        </a>
          <a
              href="https://discord.gg/umEbqdFxQv"
              target="_blank"
              rel="noreferrer"
          >
              <img src="icons/discord.png"/>
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
