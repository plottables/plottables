import { useWalletContext } from "@/components/common/WalletProvider";
import Container from "@/components/Container";
import {
  projectDetails,
  projectScriptByIndex,
  projectScriptInfo,
  projectTokenInfo,
  projectURIInfo,
} from "@/lib/coreContract";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../../styles/Edit.module.css";
import {
  addProjectScript,
  removeProjectLastScript,
  toggleProjectIsPaused,
  updateProjectArtistName,
  updateProjectBaseURI,
  updateProjectCurrencyInfo,
  updateProjectDescription,
  updateProjectLicense,
  updateProjectMaxInvocations,
  updateProjectName,
  updateProjectPricePerTokenInWei,
  updateProjectScript,
  updateProjectScriptJSON,
  updateProjectWebsite,
} from "../../../utils/interact";

export default function Edit(props: {
  projectDetails: {
    projectName: string | number | readonly string[] | undefined;
    artist: string | number | readonly string[] | undefined;
    website: string | number | readonly string[] | undefined;
    description: string | number | readonly string[] | undefined;
    license: string | number | readonly string[] | undefined;
  };
  projectTokenInfo: {
    pricePerTokenInWei: number;
    currency: string | number | readonly string[] | undefined;
    currencyAddress: string | number | readonly string[] | undefined;
    maxInvocations: string | number | readonly string[] | undefined;
    artistAddress: string | number | readonly string[] | undefined;
  };
  projectURIInfo: {
    projectBaseURI: string | number | readonly string[] | undefined;
  };
  projectScriptInfo: { scriptJSON: string; scriptCount: any; paused: any };
  projectScriptArray: (string | number | readonly string[] | undefined)[];
}) {
  const router = useRouter();
  const { projectId } = router.query;

  const walletAddress = useWalletContext();

  const [currentSection, setCurrentSection] = useState("project");
  const [currentScript, setCurrentScript] = useState(0);

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
      case "updateProjectPricePerTokenInWei":
        updateProjectPricePerTokenInWei(
          walletAddress,
          projectId,
          event.target.input1.value
        ).then((res) => console.log(res));
        break;
      case "updateProjectCurrencyInfo":
        updateProjectCurrencyInfo(
          walletAddress,
          projectId,
          event.target.input1.value,
          event.target.input2.value
        ).then((res) => console.log(res));
        break;
      case "updateProjectMaxInvocations":
        updateProjectMaxInvocations(
          walletAddress,
          projectId,
          event.target.input1.value
        ).then((res) => console.log(res));
        break;
      case "updateProjectBaseURI":
        updateProjectBaseURI(
          walletAddress,
          projectId,
          event.target.input1.value
        ).then((res) => console.log(res));
        break;
      case "updateProjectScriptJSON":
        updateProjectScriptJSON(
          walletAddress,
          projectId,
          event.target.input1.value,
          event.target.input2.value
        ).then((res) => console.log(res));
        break;
      case "updateProjectScript":
        updateProjectScript(
          walletAddress,
          projectId,
          currentScript,
          event.target.input1.value
        ).then((res: any) => console.log(res));
        break;
    }
  };

  const addScript = async () => {
    addProjectScript(walletAddress, projectId, "").then((res: any) =>
      console.log(res)
    );
  };

  const removeLastScript = async () => {
    removeProjectLastScript(walletAddress, projectId).then((res: any) =>
      console.log(res)
    );
  };

  const toggleIsPaused = async () => {
    toggleProjectIsPaused(walletAddress, projectId).then((res: any) =>
      console.log(res)
    );
  };

  function renderSection(section: string) {
    if (section === "project") {
      return (
        <div className={styles.section}>
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectName">project name:</label>
            <input
              type="text"
              id="updateProjectName"
              name="input1"
              defaultValue={props.projectDetails.projectName}
            />
            <button type="submit">submit</button>
          </form>
          <br />
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectArtistName">artist name:</label>
            <input
              type="text"
              id="updateProjectArtistName"
              name="input1"
              defaultValue={props.projectDetails.artist}
            />
            <button type="submit">submit</button>
          </form>
          <br />
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectWebsite">project website:</label>
            <input
              type="text"
              id="updateProjectWebsite"
              name="input1"
              defaultValue={props.projectDetails.website}
            />
            <button type="submit">submit</button>
          </form>
          <br />
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectDescription">
              project description:
            </label>
            <input
              type="text"
              id="updateProjectDescription"
              name="input1"
              defaultValue={props.projectDetails.description}
            />
            <button type="submit">submit</button>
          </form>
          <br />
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectLicense">project license:</label>
            <input
              type="text"
              id="updateProjectLicense"
              name="input1"
              defaultValue={props.projectDetails.license}
            />
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
              defaultValue={
                props.projectTokenInfo.pricePerTokenInWei / 1000000000000000000
              }
            />
            <button type="submit">submit</button>
          </form>
          <br />
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectCurrencyInfo">currency symbol:</label>
            <input
              type="text"
              id="updateProjectCurrencyInfo"
              name="input1"
              defaultValue={props.projectTokenInfo.currency}
            />
            <label htmlFor="updateProjectCurrencyInfo">currency address:</label>
            <input
              type="text"
              id="updateProjectCurrencyInfo"
              name="input2"
              defaultValue={props.projectTokenInfo.currencyAddress}
            />
            <button type="submit">submit</button>
          </form>
          <br />
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectMaxInvocations">
              maximum invocations:
            </label>
            <input
              type="text"
              id="updateProjectMaxInvocations"
              name="input1"
              defaultValue={props.projectTokenInfo.maxInvocations}
            />
            <button type="submit">submit</button>
          </form>
          <br />
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectBaseURI">base uri:</label>
            <input
              type="text"
              id="updateProjectBaseURI"
              name="input1"
              defaultValue={props.projectURIInfo.projectBaseURI}
            />
            <button type="submit">submit</button>
          </form>
        </div>
      );
    } else if (section === "script") {
      return (
        <div className={styles.section}>
          <form onSubmit={submitForm}>
            <label htmlFor="updateProjectScriptJSON">script type:</label>
            <input
              type="text"
              id="updateProjectScriptJSON"
              name="input1"
              defaultValue={
                JSON.parse(props.projectScriptInfo.scriptJSON).scriptType
              }
            />
            <label htmlFor="updateProjectScriptJSON">
              aspect ratio (width / height):
            </label>
            <input
              type="text"
              id="updateProjectScriptJSON"
              name="input2"
              defaultValue={
                JSON.parse(props.projectScriptInfo.scriptJSON).aspectRatio
              }
            />
            <button type="submit">submit</button>
          </form>
          <br />
          <div className={styles.scriptSelectors}>
            {Array.from(
              { length: Number(props.projectScriptInfo.scriptCount) },
              (v, k) => k
            ).map((i) => {
              return (
                <div
                  key={i}
                  className={
                    currentScript == i ? styles.activeScript : undefined
                  }
                  onClick={() => setCurrentScript(i)}
                >
                  {i}
                </div>
              );
            })}
            <div onClick={addScript}>+</div>
          </div>
          <br />
          <form onSubmit={submitForm}>
            <input
              className={styles.updateScriptInput}
              type="text"
              id="updateProjectScript"
              name="input1"
              defaultValue={props.projectScriptArray[currentScript]}
            />
            <button type="submit">update script {currentScript}</button>
          </form>
          <br />
          <div onClick={removeLastScript}>
            remove script {Number(props.projectScriptInfo.scriptCount) - 1}
          </div>
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
              defaultValue="test"
            />
            <label htmlFor="updateProjectAdditionalPayeeInfo">
              additional payee percentage:
            </label>
            <input
              type="text"
              id="updateProjectAdditionalPayeeInfo"
              name="input2"
              defaultValue="test"
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
              defaultValue="test"
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
            <input
              type="text"
              id="updateProjectArtistAddress"
              name="input1"
              defaultValue={props.projectTokenInfo.artistAddress}
            />
            <button type="submit">submit</button>
          </form>
          <br />
          <div onClick={toggleIsPaused}>
            {props.projectScriptInfo.paused ? "unpause" : "pause"}
          </div>
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

export const getServerSideProps: ({ params }: { params: any }) => Promise<
  | { notFound: boolean }
  | {
      props: {
        projectTokenInfo: string;
        projectId: string;
        projectDetails: string;
        projectURIInfo: string;
        projectScriptArray: string[];
      };
    }
> = async ({ params }) => {
  const projectId = params?.projectId;

  if (!projectId) {
    return {
      notFound: true,
    };
  }

  let projectScriptArray = [];
  for (let i = 0; i < 5; i++) {
    const script = await projectScriptByIndex(projectId, i.toString());
    if (script.length > 0) {
      projectScriptArray.push(script);
    }
  }

  return {
    props: {
      projectId: projectId,
      projectDetails: await projectDetails(projectId),
      projectTokenInfo: await projectTokenInfo(projectId),
      projectURIInfo: await projectURIInfo(projectId),
      projectScriptInfo: await projectScriptInfo(projectId),
      projectScriptArray: projectScriptArray,
    },
  };
};
