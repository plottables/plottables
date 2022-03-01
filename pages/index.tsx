import Container from "@/components/Container";
import Logo from "@/public/logo.svg";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <div className={styles.home}>
        <br className={styles.noMobile} />
        <br className={styles.noMobile} />
        <br className={styles.noTablet} />
        <br />
        <div className={styles.logo}>
          <Logo />
        </div>
        <br className={styles.noMobile} />
        <br className={styles.noMobile} />
        <br className={styles.noTablet} />
        <br />
        <span className={styles.highlight}>What is it?</span>
        <br />
        A curated on-chain generative art platform powered by ArtBlocks.
        <br />
        <br />
        <span className={styles.highlight}>Who is it for?</span>
        <br />
        This is a place for generative artists working with pen plotters to
        share their work with a larger community.
        <br />
        <br />
        <span className={styles.highlight}>
          Do I need to own a pen plotter?
        </span>
        <br />
        Nope! All works minted here exists just like any other NFT.
        <br />
        <br />
        <span className={styles.highlight}>
          Which pen plotters are supported?
        </span>
        <br />
        Currently only the <a href="https://www.axidraw.com/">AxiDraw</a> is
        supported but we are looking forward to adding support for others in the
        future.
        <br />
        <br />
        <Link href={"/welcome"}>
          <a target="_blank" rel="noreferrer">
            Try it out!
          </a>
        </Link>
      </div>
    </Container>
  );
}
