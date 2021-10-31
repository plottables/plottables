import Container from "@/components/Container";
import {
  ownerOf,
  projectDetails,
  tokenIdToProjectId,
} from "@/lib/coreContract";
import { ProjectDetails } from "@/lib/types";

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
        <iframe sandbox="allow-scripts" src={"http://localhost:3000/api/" + tokenId} title={tokenId}/>
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
