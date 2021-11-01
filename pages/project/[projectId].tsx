import { useWalletContext } from "@/components/common/WalletProvider";
import Container from "@/components/Container";
import {
  projectDetails,
  projectScriptInfo,
  projectTokenInfo,
} from "@/lib/coreContract";
import {
  ProjectDetails,
  ProjectScriptInfo,
  ProjectTokenInfo,
} from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { imageBaseUrl } from "../../config";
import styles from "../../styles/Project.module.css";
import { connectWallet, purchase } from "../../utils/interact";

interface ProjectProps {
  projectId: string;
  projectDetails: ProjectDetails;
  projectTokenInfo: ProjectTokenInfo;
  projectScriptInfo: ProjectScriptInfo;
}

export default function Project(project: ProjectProps) {
  const walletAddress = useWalletContext();
  const [offset, setOffset] = useState(0);
  const [tokens, setTokens] = useState<Array<string>>([]);

  useEffect(() => {
    let tokens = [];
    for (
      let i = offset;
      i <
      Math.min(
        offset + Number(process.env.NEXT_PUBLIC_PROJECT_GALLERY_PER_PAGE!),
        Number(project.projectTokenInfo.invocations)
      );
      i++
    ) {
      tokens.push(i.toString());
    }
    setTokens(tokens);
  }, [offset, project.projectTokenInfo.invocations]);

  const handlePageClick = (data: { selected: number }) => {
    setOffset(
      Math.ceil(
        data.selected *
          Number(process.env.NEXT_PUBLIC_PROJECT_GALLERY_PER_PAGE!)
      )
    );
  };

  const handlePurchaseClick = async () => {
    if (walletAddress.length === 0) {
      await connectWallet();
    } else if (!project.projectScriptInfo.paused) {
      await purchase(
        walletAddress,
        project.projectId,
        project.projectTokenInfo.pricePerTokenInWei
      );
    }
  };

  return (
    <Container>
      <br />
      {project.projectDetails.projectName} by {project.projectDetails.artist}
      <br />
      <br />
      <a href={project.projectDetails.website}>
        {project.projectDetails.website}
      </a>
      <br />
      <br />
      {project.projectDetails.description}
      <br />
      <br />
      Total Minted: {project.projectTokenInfo.invocations} /{" "}
      {project.projectTokenInfo.maxInvocations}
      <br />
      <br />
      Price per token:{" "}
      {parseInt(project.projectTokenInfo.pricePerTokenInWei) /
        1000000000000000000}
      <br />
      <br />
      {
        <div className={styles.purchaseButton} onClick={handlePurchaseClick}>
          {walletAddress.length === 0
            ? "Connect Wallet to Purchase"
            : !project.projectScriptInfo.paused
            ? "Purchase"
            : "Purchases Paused"}
        </div>
      }
      <br />
      {walletAddress.toLowerCase() ===
      project.projectTokenInfo.artistAddress.toLowerCase() ? (
        <Link href={"/project/" + project.projectId + "/edit"}>
          <a>Edit Project</a>
        </Link>
      ) : null}
      <div>
        <br />
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          breakLabel={"..."}
          pageCount={
            Number(project.projectTokenInfo.invocations) /
            Number(process.env.NEXT_PUBLIC_PROJECT_GALLERY_PER_PAGE!)
          }
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
        />
        <br />
        <div className={styles.galleryContainer}>
          {tokens.map((t) => {
            return (
              <div key={t} className={styles.token}>
                <Link
                  href={
                    "/token/" +
                    (parseInt(t) + 1000000 * parseInt(project.projectId))
                  }
                >
                  <a>#{t}</a>
                </Link>
                <img
                  src={
                    imageBaseUrl +
                    (parseInt(t) + 1000000 * parseInt(project.projectId)) +
                    ".png"
                  }
                  alt={"an image"}
                />
              </div>
            );
          })}
        </div>
      </div>
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
        projectScriptInfo: string;
      };
    }
> = async ({ params }) => {
  const projectId = params?.projectId;

  if (!projectId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      projectId: projectId,
      projectDetails: await projectDetails(projectId),
      projectTokenInfo: await projectTokenInfo(projectId),
      projectScriptInfo: await projectScriptInfo(projectId),
    },
  };
};
