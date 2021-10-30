import Container from "@/components/Container";
import Logo from "../public/logo.svg";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Container>
      <div className={styles.home}>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className={styles.logo}>
          <Logo/>
        </div>
        <br/>
        <br/>
        <br/>
        <strong style={{fontWeight: 'bolder'}}>What is it?</strong>
        <p>
          A curated on-chain generative art platform powered by ArtBlocks.
        </p>
        <br/>

        <strong style={{fontWeight: 'bolder'}}>Who is it for?</strong>
        <p>This is a place for generative artists working with pen plotters
          to share their work with a larger community.</p>

        <br/>
        <button className={'dotted'}>View Gallery</button>
        <br/>
        <br/>
      </div>
    </Container>
  );
}
