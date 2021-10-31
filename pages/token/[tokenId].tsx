import Container from "@/components/Container";
import {
  ownerOf,
  projectDetails,
  tokenIdToProjectId,
} from "@/lib/coreContract";
import { ProjectDetails } from "@/lib/types";
import styles from "../../styles/Token.module.css";
import Link from "next/link";

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
        <br/>
        <br/>
        <div className={styles.viewOptions}>
            <a href={`https://${process.env.VERCEL_URL}/api/${tokenId}`}>live</a>
            <a href={`https://${process.env.VERCEL_URL}/api/${tokenId}/plot`}>plot</a>
        </div>
        <iframe className={styles.liveview} frameBorder="0" sandbox="allow-scripts" src={`http://${process.env.VERCEL_URL}/api/${tokenId}`} title={tokenId}/>
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
