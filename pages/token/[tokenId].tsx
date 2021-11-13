import Container from "@/components/Container";
import { coreContractAddress, imageBaseUrl, liveBaseUrl } from "@/config/index";
import {
  ownerOf,
  projectDetails,
  projectScriptInfo,
  tokenIdToProjectId,
} from "@/lib/coreContract";
import { ProjectDetails, ProjectScriptInfo } from "@/lib/types";
import styles from "@/styles/Token.module.css";
import Link from "next/link";

interface TokenProps {
  tokenId: string;
  projectId: string;
  ownerOf: string;
  projectDetails: ProjectDetails;
  projectScriptInfo: ProjectScriptInfo;
  features: Object;
}

export default function Token({
  tokenId,
  projectId,
  ownerOf,
  projectDetails,
  projectScriptInfo,
  features,
}: TokenProps) {
  let scale;
  try {
    scale = 1 / JSON.parse(projectScriptInfo.scriptJSON).aspectRatio;
  } catch {
    scale = 1;
  }

  return (
    <Container>
      {projectDetails.projectName} #
      {parseInt(tokenId) - 1000000 * parseInt(projectId)} by{" "}
      {projectDetails.artist}
      <br />
      <br />
      Owned by{" "}
      <Link href={`/user/${ownerOf}`}>
        <a>{ownerOf.toLowerCase().substring(0, 8)}</a>
      </Link>
      <br />
      <br />
      <div className={styles.viewOptions}>Features</div>
      <div className={`${styles.featuresContainer} ${styles.highlight}`}>
        {Object.keys(features).map(function (key: string, index) {
          return (
            <div key={key} className={styles.feature}>
              {key}: {features[key as keyof typeof features]}
            </div>
          );
        })}
      </div>
      <br />
      <div className={styles.viewOptions}>
        <Link href={`/project/${projectId}`}>
          <a>Visit the {projectDetails.projectName} Gallery</a>
        </Link>
      </div>
      <br />
      <div className={styles.viewOptions}>
        <a href={`/token/${tokenId}/plot`} target="_blank" rel="noreferrer">
          plot
        </a>
        <a href={`/api/tokens/${tokenId}/svg`} target="_blank" rel="noreferrer">
          svg
        </a>
        <a
          href={imageBaseUrl + tokenId + ".png"}
          target="_blank"
          rel="noreferrer"
        >
          image
        </a>
        <a href={liveBaseUrl + tokenId} target="_blank" rel="noreferrer">
          live
        </a>
      </div>
      <div className={styles.liveviewContainer}>
        <iframe
          className={styles.liveview}
          src={liveBaseUrl + tokenId}
          style={{
            width: "500px",
            height: "calc(" + scale + "*500px)",
          }}
        />
      </div>
    </Container>
  );
}

export const getServerSideProps: ({ params }: { params: any }) => Promise<
  | { notFound: boolean }
  | {
      props: {
        tokenId: string;
        ownerOf: string;
        projectId: string;
        projectDetails: string;
        projectScriptInfo: string;
      };
    }
> = async ({ params }) => {
  const tokenId = params?.tokenId;

  if (!tokenId) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(
    `https://token.staging.artblocks.io/${coreContractAddress.toLowerCase()}/${tokenId}`
  );
  const data = await res.json();

  const projectId = await tokenIdToProjectId(tokenId);

  return {
    props: {
      tokenId: tokenId,
      projectId: projectId,
      ownerOf: await ownerOf(tokenId),
      projectDetails: await projectDetails(projectId),
      projectScriptInfo: await projectScriptInfo(projectId),
      features: data.features,
    },
  };
};
