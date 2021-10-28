import { useWalletContext } from "@/components/common/WalletProvider";
import Container from "@/components/Container";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../../styles/Edit.module.css";
import {
  updateProjectArtistName,
  updateProjectDescription,
  updateProjectLicense,
  updateProjectName,
  updateProjectWebsite,
} from "../../../utils/interact";

export default function Edit() {
  const router = useRouter();
  const { projectId } = router.query;

  const walletAddress = useWalletContext();

  const [currentSection, setCurrentSection] = useState("project");

  const toggleProjectIsPaused = async () => {};

  const submitForm = async (event: any) => {
    event.preventDefault();
    switch (event.target.input1.id) {
      case "updateProjectName":
        updateProjectName(
          walletAddress,
          projectId,
          event.target.input1.value
        ).then((res) => console.log(res));
        break;
      case "updateProjectArtistName":
        updateProjectArtistName(
          walletAddress,
          projectId,
          event.target.input1.value
        ).then((res) => console.log(res));
        break;
      case "updateProjectWebsite":
        updateProjectWebsite(
          walletAddress,
          projectId,
          event.target.input1.value
        ).then((res) => console.log(res));
        break;
      case "updateProjectDescription":
        updateProjectDescription(
          walletAddress,
          projectId,
          event.target.input1.value
        ).then((res) => console.log(res));
        break;
      case "updateProjectLicense":
        updateProjectLicense(
          walletAddress,
          projectId,
          event.target.input1.value
        ).then((res) => console.log(res));
        break;
    }
  };

  function renderSection(section: string) {
    if (section === "project") {
      return (
        <div className={styles.section}>
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectName">project name:</label>
            <input type="text" id="updateProjectName" name="input1" />
            <button type="submit">submit</button>
          </form>
          <br />
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectArtistName">artist name:</label>
            <input type="text" id="updateProjectArtistName" name="input1" />
            <button type="submit">submit</button>
          </form>
          <br />
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectWebsite">project website:</label>
            <input type="text" id="updateProjectWebsite" name="input1" />
            <button type="submit">submit</button>
          </form>
          <br />
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectDescription">
              project description:
            </label>
            <input type="text" id="updateProjectDescription" name="input1" />
            <button type="submit">submit</button>
          </form>
          <br />
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectLicense">project license:</label>
            <input type="text" id="updateProjectLicense" name="input1" />
            <button type="submit">submit</button>
          </form>
        </div>
      );
    } else if (section === "token") {
      return (
        <div className={styles.section}>
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectPricePerTokenInWei">
              price per token in eth:
            </label>
            <input
              type="text"
              id="updateProjectPricePerTokenInWei"
              name="input1"
            />
            <button type="submit">submit</button>
          </form>
          <br />
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectCurrencyInfo">currency symbol:</label>
            <input type="text" id="updateProjectCurrencyInfo" name="input1" />
            <label htmlFor="updateProjectCurrencyInfo">currency address:</label>
            <input type="text" id="updateProjectCurrencyInfo" name="input2" />
            <button type="submit">submit</button>
          </form>
          <br />
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectMaxInvocations">
              maximum invocations:
            </label>
            <input type="text" id="updateProjectMaxInvocations" name="input1" />
            <button type="submit">submit</button>
          </form>
          <br />
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectBaseURI">maximum invocations:</label>
            <input type="text" id="updateProjectBaseURI" name="input1" />
            <button type="submit">submit</button>
          </form>
        </div>
      );
    } else if (section === "script") {
      return (
        <div className={styles.section}>
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectScriptJSON">script type:</label>
            <input type="text" id="updateProjectScriptJSON" name="input1" />
            <label htmlFor="updateProjectScriptJSON">
              aspect ratio (width / height):
            </label>
            <input type="text" id="updateProjectScriptJSON" name="input2" />
            <button type="submit">submit</button>
          </form>
          <br />
          updateProjectScript
          <br />
          addProjectScript
          <br />
          removeProjectLastScript
        </div>
      );
    } else if (section === "payout") {
      return (
        <div className={styles.section}>
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectAdditionalPayeeInfo">
              additional payee address:
            </label>
            <input
              type="text"
              id="updateProupdateProjectAdditionalPayeeInfojectCurrencyInfo"
              name="input1"
            />
            <label htmlFor="updateProjectAdditionalPayeeInfo">
              additional payee percentage:
            </label>
            <input
              type="text"
              id="updateProjectAdditionalPayeeInfo"
              name="input2"
            />
            <button type="submit">submit</button>
          </form>
          <br />

          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectSecondaryMarketRoyaltyPercentage">
              secondary market royalty:
            </label>
            <input
              type="text"
              id="updateProjectSecondaryMarketRoyaltyPercentage"
              name="input1"
            />
            <button type="submit">submit</button>
          </form>
        </div>
      );
    } else {
      return (
        <div className={styles.section}>
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectArtistAddress">artist address:</label>
            <input type="text" id="updateProjectArtistAddress" name="input1" />
            <button type="submit">submit</button>
          </form>
          <br />
          <button className={styles.btn} onClick={toggleProjectIsPaused}>
            paused
          </button>
        </div>
      );
    }
  }

  return (
    <Container>
      <Link href={"/project/" + projectId}>
        <a>Return to the Project Page</a>
      </Link>
      <br />
      <br />
      <div className={styles.sections}>
        <div
          id={styles.project}
          className={
            currentSection === "project" ? styles.activeSection : undefined
          }
          onClick={() => setCurrentSection("project")}
        >
          project
        </div>
        <div
          id={styles.token}
          className={
            currentSection === "token" ? styles.activeSection : undefined
          }
          onClick={() => setCurrentSection("token")}
        >
          token
        </div>
        <div
          id={styles.script}
          className={
            currentSection === "script" ? styles.activeSection : undefined
          }
          onClick={() => setCurrentSection("script")}
        >
          script
        </div>
        <div
          id={styles.payout}
          className={
            currentSection === "payout" ? styles.activeSection : undefined
          }
          onClick={() => setCurrentSection("payout")}
        >
          payout
        </div>
        <div
          id={styles.danger}
          className={
            currentSection === "danger" ? styles.activeSection : undefined
          }
          onClick={() => setCurrentSection("danger")}
        >
          danger
        </div>
      </div>
      <br />
      {renderSection(currentSection)}
    </Container>
  );
}
