import Container from "@/components/Container";
import Logo from "../public/logo.svg";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Container>
      <div className={styles.home}>
        <br />
        <br />
        <br />
        <br />
        <div className={styles.logo}>
          <Logo />
        </div>
        <br />
        <br />
        <br />
        <br />
        What is it?
        <br />
        &emsp;A curated on-chain generative art platform powered by ArtBlocks.
        <br />
        <br />
        Who is it for?
        <br />
        &emsp;This is a place for generative artists working with pen plotters
        to share their work with a larger community.
      </div>
    </Container>
  );
}
