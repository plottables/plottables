import styles from "@/styles/Admin.module.css";
import Container from "../components/Container";

export default function Admin() {
  return (
    <Container>
      <div>
        <a id="hide1" href="#hide1" className={styles.hide}>
          addProject
        </a>
        <a id="show1" href="#show1" className={styles.show}>
          addProject
        </a>
        <div className={styles.details}>
          <br />
          <form>
            <label htmlFor="_address">_address:</label>
            <input type="text" id="_address" name="_address" />
          </form>
          <br />
          <div className={styles.writeButton}>Write</div>
        </div>
        <br />
      </div>
      <div>
        <a id="hide1" href="#hide1" className={styles.hide}>
          toggleProjectIsActive
        </a>
        <a id="show1" href="#show1" className={styles.show}>
          toggleProjectIsActive
        </a>
        <div className={styles.details}>
          <br />
          <form>
            <label htmlFor="_address">_address:</label>
            <input type="text" id="_address" name="_address" />
          </form>
          <br />
          <div className={styles.writeButton}>Write</div>
        </div>
        <br />
      </div>
      {/*<a className={styles.methodName}>addMintWhitelisted</a>*/}
      {/*  <a className={styles.show}>addMintWhitelisted</a>*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<div className={styles.write}>*/}
      {/*    test*/}
      {/*  <form>*/}
      {/*    <label htmlFor="_address">_address:</label>*/}
      {/*    <input type="text" id="_address" name="_address" />*/}
      {/*  </form>*/}
      {/*  <br />*/}
      {/*  <div className={styles.writeButton}>Write</div>*/}
      {/*</div>*/}
      {/*<br />*/}
      {/*<br />*/}
      addProject
      <br />
      addProjectScript
      <br />
      addWhitelisted
      <br />
      approve
      <br />
      mint
      <br />
      removeMintWhitelisted
      <br />
      removeProjectLastScript
      <br />
      removeWhitelisted
      <br />
      safeTransferFrom
      <br />
      safeTransferFrom
      <br />
      setApprovalForAll
      <br />
      toggleProjectIsActive
      <br />
      toggleProjectIsLocked
      <br />
      toggleProjectIsPaused
      <br />
      transferFrom
      <br />
      updateAdmin
      <br />
      updateProjectAdditionalPayeeInfo
      <br />
      updateProjectArtistAddress
      <br />
      updateProjectArtistName
      <br />
      updateProjectBaseURI
      <br />
      updateProjectCurrencyInfo
      <br />
      updateProjectDescription
      <br />
      updateProjectIpfsHash
      <br />
      updateProjectLicense
      <br />
      updateProjectMaxInvocations
      <br />
      updateProjectName
      <br />
      updateProjectPricePerTokenInWei
      <br />
      updateProjectScript
      <br />
      updateProjectScriptJSON
      <br />
      updateProjectSecondaryMarketRoyaltyPercentage
      <br />
      updateProjectWebsite
      <br />
      updateRandomizerAddress
      <br />
      updateRenderProviderAddress
      <br />
      updateRenderProviderPercentage
      <br />
    </Container>
  );
}
