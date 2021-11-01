import Container from "@/components/Container";
import { projectDetails, projectTokenInfo } from "@/lib/coreContract";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { imageBaseUrl } from "@/config/index";
import styles from "@/styles/Gallery.module.css";

interface GalleryProps {
  projects: any[];
}

export default function Gallery({ projects }: GalleryProps) {
  return (
    <Container>
      <br />
      {projects.map((p) => {
        let randomToken =
          1000000 * p.projectId +
          Math.floor(Math.random() * p.projectTokenInfo.invocations);
        return (
          <div key={p.projectId}>
            <Link href={`/project/${p.projectId}`}>
              <a>
                {p.projectDetails.projectName} by {p.projectDetails.artist}
              </a>
            </Link>
            <div className={styles.projectContainer}>
              <div className={styles.projectDetails}>
                <br />
                {p.projectDetails.description}
                <br />
                <br />
                Total Minted: {p.projectTokenInfo.invocations} /{" "}
                {p.projectTokenInfo.maxInvocations}
                <br />
                <br />
                Price per token:{" "}
                {p.projectTokenInfo.pricePerTokenInWei / 1000000000000000000}
                <br />
                <br />
              </div>
              <div className={styles.projectPreview}>
                <Link href={"/token/" + randomToken}>
                  <a>#{randomToken - 1000000 * p.projectId}</a>
                </Link>
                <img
                  src={imageBaseUrl + randomToken + ".png"}
                  alt={"a random image"}
                />
              </div>
            </div>
          </div>
        );
      })}
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<GalleryProps> = async ({
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  let projects = [];
  for (let projectId of process.env.VISIBLE_PROJECT_IDS!.split(",")) {
    projects.push({
      projectId: projectId,
      projectDetails: await projectDetails(projectId.toString()),
      projectTokenInfo: await projectTokenInfo(projectId.toString()),
    });
  }

  return {
    props: {
      projects: projects,
    },
  };
};
