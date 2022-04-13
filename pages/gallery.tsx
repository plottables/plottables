import Container from "@/components/Container";
import { LineBreak } from "@/components/LineBreak";
import { calendar, imageBaseUrl } from "@/config/index";
import { fetcher } from "@/lib/fetcher";
import { GalleryResponse } from "@/pages/api/gallery";
import styles from "@/styles/Gallery.module.css";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Rand from "rand-seed";
import { useState } from "react";
import useSWR from "swr";

export default function Gallery({ seed }: { seed: string }) {
  const rand = new Rand(seed);

  const { data, error, isValidating } = useSWR<GalleryResponse>(
    "/api/gallery",
    fetcher
  );

  const [filter, setFilter] = useState("all");
  return (
    <Container>
      <LineBreak rand={rand} />
      <br />
      <br />
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

      <LineBreak rand={rand} />
      <br />
      <br />
      {!data?.projects && <div style={{ textAlign: "center" }}>Loading...</div>}
      {data?.projects &&
        data?.projects
          .filter((p) => p.projectTokenInfo.active)
          .filter((p) => {
            if (filter == "open") {
              return (
                parseInt(p.projectTokenInfo.invocations as string) <
                parseInt(p.projectTokenInfo.maxInvocations as string)
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
              1000000 * parseInt(p.projectId) +
              Math.floor(
                rand.next() * parseInt(p.projectTokenInfo.invocations as string)
              );

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
                    {parseInt(p.projectTokenInfo.pricePerTokenInWei as string) /
                      1000000000000000000}{" "}
                    {p.projectTokenInfo.currency}
                    <br />
                    <br />
                  </div>
                  <div className={styles.projectPreview}>
                    <Link href={"/token/" + randomToken}>
                      <a>#{randomToken - 1000000 * parseInt(p.projectId)}</a>
                    </Link>
                    <img
                      src={`https://res.cloudinary.com/art-blocks/image/fetch/f_auto,c_limit,h_500,q_auto/${imageBaseUrl}${randomToken}.png`}
                      alt={"a random image"}
                    />
                  </div>
                </div>
                <br />
                <br />
                <LineBreak rand={rand} />
                <br />
                <br />
              </div>
            );
          })}
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<{ seed: string }> =
  async () => {
    return {
      props: {
        seed: new Rand().next().toString(),
      },
    };
  };
