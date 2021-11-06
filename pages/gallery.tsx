import Container from "@/components/Container";
import { imageBaseUrl } from "@/config/index";
import { projectDetails, projectTokenInfo } from "@/lib/coreContract";
import styles from "@/styles/Gallery.module.css";
import { GetServerSideProps } from "next";
import Link from "next/link";

interface GalleryProps {
  projects: any[];
}

function makeBreak() {
  let path = "M 0 " + (10 * Math.random() + 5);
  for (let i = 1; i < 100; i++) {
    path +=
      " S " +
      (i - 0.5) +
      " " +
      (10 * Math.random() + 5) +
      " " +
      i +
      " " +
      (10 * Math.random() + 5);
  }
  return (
    <svg
      preserveAspectRatio="none"
      width="100%"
      height="17px"
      viewBox="0 0 100 20"
    >
      <path
        style={{ fill: "none", strokeWidth: "2", stroke: "rgb(0%,0%,0%)" }}
        d={path}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function Gallery({ projects }: GalleryProps) {
  return (
    <Container>
      {makeBreak()}
      <br />
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
            <br />
            <br />
            {makeBreak()}
            <br />
            <br />
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
