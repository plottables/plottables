import Container from "@/components/Container";
import { calendar, imageBaseUrl } from "@/config/index";
import { projectDetails, projectTokenInfo } from "@/lib/coreContract";
import { makeLineBreak } from "@/lib/makeLineBreak";
import styles from "@/styles/Gallery.module.css";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";

interface GalleryProps {
  projects: any[];
}

export default function Gallery({ projects }: GalleryProps) {
  const [filter, setFilter] = useState("all");
  return (
    <Container>
      <div className={styles.selectorContainer}>
        <div
          className={filter === "all" ? styles.highlight : undefined}
          onClick={() => setFilter("all")}
        >
          all projects
        </div>
        <div
          className={filter === "open" ? styles.highlight : undefined}
          onClick={() => setFilter("open")}
        >
          open projects
        </div>
      </div>
      <br />
      {makeLineBreak()}
      <br />
      <br />
      {projects
        .filter((p) => p.projectTokenInfo.active)
        .filter((p) => {
          if (filter == "open") {
            return (
              parseInt(p.projectTokenInfo.invocations) <
              parseInt(p.projectTokenInfo.maxInvocations)
            );
          } else {
            return true;
          }
        })
        .map((p) => {
          let releaseDate = "TBD";
          if (
            process.env.NEXT_PUBLIC_ETH_NETWORK == "main" &&
            p.projectId in calendar
          ) {
            const date = new Date(
              calendar[p.projectId as unknown as keyof typeof calendar]
            );
            releaseDate = date.toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZoneName: "short",
              hour: "numeric",
            });
          }
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
                  Release Date: {releaseDate}
                  <br />
                  <br />
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    {p.projectDetails.description}
                  </span>
                  <br />
                  <br />
                  Total Minted: {p.projectTokenInfo.invocations} /{" "}
                  {p.projectTokenInfo.maxInvocations}
                  <br />
                  <br />
                  Price per token:{" "}
                  {p.projectTokenInfo.pricePerTokenInWei /
                    1000000000000000000}{" "}
                  {p.projectTokenInfo.currency}
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
              {makeLineBreak()}
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
