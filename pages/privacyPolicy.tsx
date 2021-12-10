import Container from "@/components/Container";
import styles from "@/styles/PrivacyPolicy.module.css";

export default function PrivacyPolicy() {
  return (
    <Container>
      <div className={styles.container}>Privacy Policy</div>
      <br />
      This privacy policy (“Policy”) describes how Plottables (“we”, “our”, or
      “us”) collects, uses, shares, and stores personal information of users of
      our website, <a href="https://plottables.io">https://plottables.io</a> -
      including any subdomains (collectively the “Application”).
      <br />
      <br />
      <div className={styles.container}>How do we define personal data?</div>
      <br />
      We consider personal data to be any information that could be used to
      identify an individual.
      <br />
      <br />
      <div className={styles.container}>
        What personal data do we intentionally collect?
      </div>
      <br />
      We do not intentionally collect any personal data of our users. Our
      Application is a decentralized application that merely facilitates your
      interaction with the Ethereum blockchain. We do not create, manage, or
      store user accounts or user information. We do not record or store your
      Ethereum address or any actions you perform on the blockchain.
      <br />
      <br />
      <div className={styles.container}>
        What information is automatically stored?
      </div>
      <br />
      We may automatically record certain information about how you use our
      Application including but not limited to your Internet Protocol (IP)
      address, device and browser type, operating system, and other usage
      statistics. These data points are automatically logged by our web hosting
      and service providers.
      <br />
      <br />
      <div className={styles.container}>
        What information might other third parties collect?
      </div>
      <br />
      You must use MetaMask as your Ethereum provider to use the Application. We
      do not receive, collect, or store, nor are we responsible for any personal
      data or information that MetaMask may collect. You should refer to their
      privacy policy for more information.
      <br />
      <br />
      <div className={styles.container}>Sharing of personal information.</div>
      <br />
      We do not sell any personal information with third parties.
      <br />
      <br />
    </Container>
  );
}
