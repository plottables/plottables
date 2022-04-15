import Container from "@/components/Container";
import { imageBaseUrl, liveBaseUrl } from "@/config/index";
import { fetcher } from "@/lib/fetcher";
import { TokenResponse } from "@/pages/api/token/[tokenId]";
import styles from "@/styles/Token.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

export default function Token() {
  const router = useRouter();

  const tokenId = router.query.tokenId as string;

  const { data, error } = useSWR<TokenResponse>(
    `/api/token/${tokenId}`,
    fetcher
  );

  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  let scale = 1;
  try {
    if (data?.projectScriptInfo?.scriptJSON) {
      scale = 1 / JSON.parse(data?.projectScriptInfo?.scriptJSON).aspectRatio;
    }
  } catch {}

  if (!data) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>Error!</Container>;
  }

  return (
    <Container>
      <div className={styles.viewOptions}>
        <Link href={`/project/${data?.projectId}`}>
          <a>Visit the {data?.projectDetails.projectName} Gallery</a>
        </Link>
      </div>
      <br />
      <div className={styles.viewOptions}>
        {data.projectDetails.projectName} #
        {parseInt(tokenId) - 1000000 * parseInt(data.projectId)} by{" "}
        {data.projectDetails.artist}
      </div>
      <div className={styles.viewOptions}>
        Owned by{" "}
        <Link href={`/user/${data.ownerOf}`}>
          <a>{data.ownerOf.toLowerCase().substring(0, 8)}</a>
        </Link>
      </div>
      <br />
      <div className={styles.container}>
        <div className={styles.tokenInfo}>
          <br />
          <br />
          <div className={styles.viewOptions}>
            <a
              href={
                "https://opensea.io/assets/0xa319c382a702682129fcbf55d514e61a16f97f9c/" +
                tokenId
              }
              target="_blank"
              rel="noreferrer"
            >
              View on OpenSea
            </a>
          </div>

          <div className={styles.viewOptions}>
            <a
              href={
                "https://looksrare.org/collections/0xa319C382a702682129fcbF55d514E61a16f97f9c/" +
                tokenId
              }
              target="_blank"
              rel="noreferrer"
            >
              View on LooksRare
            </a>
          </div>
          <br />
          <div className={styles.viewOptions}>Features</div>
          <div className={`${styles.featuresContainer} ${styles.highlight}`}>
            {Object.keys(data.features || {}).map((key: string) => {
              return (
                <div key={key} className={styles.feature}>
                  {key}: {data.features[key]}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.tokenLive}>
          <div className={styles.viewOptions}>
            <a href={`/token/${tokenId}/plot`} target="_blank" rel="noreferrer">
              plot
            </a>
            <a
              href={`/api/token/${tokenId}/svg`}
              target="_blank"
              rel="noreferrer"
            >
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
                width: `${width > 768 ? 500 : width - 100}px`,
                height:
                  "calc(" + scale + `*${width > 768 ? 500 : width - 100}px)`,
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
