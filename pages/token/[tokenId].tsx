import Container from "@/components/Container";
import {
  ownerOf,
  projectDetails,
  tokenIdToProjectId,
} from "@/lib/coreContract";
import { ProjectDetails } from "@/lib/types";
import styles from "../../styles/Token.module.css";

interface TokenProps {
  tokenId: string;
  projectId: string;
  ownerOf: string;
  projectDetails: ProjectDetails;
}

export default function Token({
  tokenId,
  projectId,
  ownerOf,
  projectDetails,
}: TokenProps) {
  return (
    <Container>
      <br />
      {projectDetails.projectName} #
      {parseInt(tokenId) - 1000000 * parseInt(projectId)} by{" "}
      {projectDetails.artist}
      <br />
      <br />
      <a href={projectDetails.website}>{projectDetails.website}</a>
      <br />
      <br />
      {projectDetails.description}
      <br />
      <br />
      Owned by {ownerOf}
      <br />
      <br />
      <div className={styles.viewOptions}>
        <a
          href={`https://ropsten.plottables.io/api/${tokenId}`}
          target="_blank"
          rel="noreferrer"
        >
          live
        </a>
        <a
          href={`https://ropsten.plottables.io/api/${tokenId}/plot`}
          target="_blank"
          rel="noreferrer"
        >
          plot
        </a>
      </div>
      <iframe
        className={styles.liveview}
        frameBorder="0"
        sandbox="allow-scripts"
        src={`https://ropsten.plottables.io/api/${tokenId}`}
        title={tokenId}
      />
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
      };
    }
> = async ({ params }) => {
  const tokenId = params?.tokenId;

  if (!tokenId) {
    return {
      notFound: true,
    };
  }

  const projectId = await tokenIdToProjectId(tokenId);

  return {
    props: {
      tokenId: tokenId,
      projectId: projectId,
      ownerOf: await ownerOf(tokenId),
      projectDetails: await projectDetails(projectId),
    },
  };
};
