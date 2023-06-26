import { useWalletContext } from "@/components/common/WalletProvider";
import Container from "@/components/Container";
import {
  artfora_config,
  calendar,
  coreContractAddress,
  editProjectBaseUrl,
  flexCalendar,
  imageBaseUrl
} from "@/config/index";
import { fetcher } from "@/lib/fetcher";
import { connectWallet, purchase, waitForConfirmation } from "@/lib/interact";
import { ProjectResponse } from "@/pages/api/project/[projectId]";
import styles from "@/styles/Project.module.css";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Rand from "rand-seed";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import useSWR from "swr";
// @ts-ignore
import { WinterCheckout } from '@usewinter/checkout';
import ReactMarkdown from "react-markdown";

export default function Project({ seed }: { seed: string }) {
  const rand = new Rand(seed);

  const router = useRouter();
  const walletAddress = useWalletContext();
  const [offset, setOffset] = useState(0);
  const [tokens, setTokens] = useState<Array<string>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [countConfirmations, setCountConfirmations] = useState(0);
  const [releaseDate, setReleaseDate] = useState("TBD");
    const [showWinter, setShowWinter] = useState(false);
    const toggleWinter = async () => { setShowWinter(true) };

  const { data, error, isValidating } = useSWR<ProjectResponse>(
    `/api/project/${router.query.projectId}`,
    fetcher
  );

  useEffect(() => {
    if (!data?.project?.projectId) return;

    if (
        (process.env.NEXT_PUBLIC_ETH_NETWORK == "main" || process.env.NEXT_PUBLIC_ETH_NETWORK == "flexMain") &&
      data.project.projectId in calendar
    ) {
      const date = new Date(
          process.env.NEXT_PUBLIC_ETH_NETWORK === "main" ? calendar[data.project.projectId as unknown as keyof typeof calendar] : flexCalendar[data.project.projectId as unknown as keyof typeof flexCalendar]
      );
      setReleaseDate(
        date.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZoneName: "short",
          hour: "numeric",
        })
      );
    }
  }, [data?.project]);

  let scriptType = "";
  if (data?.project?.projectScriptInfo?.scriptJSON) {
    try {
      scriptType = JSON.parse(
        data?.project?.projectScriptInfo?.scriptJSON
      ).type;
    } catch {
      console.error("unable to parse script json");
    }
  }

  useEffect(() => {
    if (!data?.project?.projectId) return;

    let tokens = [];
    for (
      let i = offset;
      i <
      Math.min(
        offset + Number(process.env.NEXT_PUBLIC_PROJECT_GALLERY_PER_PAGE!),
        Number(data?.project.projectTokenInfo.invocations)
      );
      i++
    ) {
      tokens.push(i.toString());
    }
    setTokens(tokens);
  }, [offset, data?.project]);

  const handlePageClick = (data: { selected: number }) => {
    setOffset(
      Math.ceil(
        data.selected *
          Number(process.env.NEXT_PUBLIC_PROJECT_GALLERY_PER_PAGE!)
      )
    );
  };

  const handlePurchaseClick = async () => {
    if (!data?.project?.projectId) return;

    if (walletAddress.length === 0) {
      await connectWallet();
    }
    const transaction = await purchase(data?.project.projectId);
    if (transaction) {
      setIsProcessing(true);
      await waitForConfirmation(transaction, 1);
      setCountConfirmations(1);
      await waitForConfirmation(transaction, 2);
      setCountConfirmations(2);
      const tokenId = await waitForConfirmation(transaction, 3);
      setCountConfirmations(3);
      await router.push("/token/" + tokenId);
    }
  };

  if (!data) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>Error!</Container>;
  }

  return (
    <Container>

        <WinterCheckout
            projectId={8110}
            production={process.env.NEXT_PUBLIC_ETH_NETWORK === "main" || process.env.NEXT_PUBLIC_ETH_NETWORK === "mainFlex"}
            showModal={showWinter}
            onClose={() => setShowWinter(false)}
            // Extra mint params are params besides 'address, amount, proof'
            // The key needs to exactly match the name of the param provided to Winter
            // The value will be passed in as the param
            extraMintParams={{projectId: data?.project?.projectId}}
            // priceFunctionParams={{projectId: data?.project?.projectId}}
            // testnet="goerli"
        />

      <div
        className={styles.overlay}
        style={{
          display: isProcessing ? "block" : "none",
        }}
      >
        <div>processing... {countConfirmations} / 3</div>
      </div>
      <br />
      {data.project.projectDetails.projectName} by{" "}
      {data.project.projectDetails.artist}
      <br />
      <br />
      <a
        href={data.project.projectDetails.website}
        className={styles.projectWebsite}
      >
        {data.project.projectDetails.website}
      </a>
      <br />
      <br />
      <span>
        <ReactMarkdown>{data.project.projectDetails.description}</ReactMarkdown>
      </span>
      <br />
      <br />
      Release Date: {releaseDate}
      <br />
      <br />
      Total Minted: {data.project.projectTokenInfo.invocations} /{" "}
      {data.project.projectTokenInfo.maxInvocations}
      <br />
      <br />
      Price per token:{" "}
      {parseInt(data.project.projectTokenInfo.pricePerTokenInWei) /
        1000000000000000000}{" "}
      {data.project.projectTokenInfo.currency}
      <br />
      <br />
      License: {data.project.projectDetails.license}
      <br />
      <br />
      Script: {scriptType}
      <br />
      <br />
      {
        <div
          className={`${styles.purchaseButton} ${styles.highlight}`}
          onClick={handlePurchaseClick}
        >
          {walletAddress.length === 0
            ? "Connect Wallet to Purchase"
            : data.project.projectTokenInfo.invocations ==
              data.project.projectTokenInfo.maxInvocations
            ? "Sold Out"
            : !data.project.projectScriptInfo.paused &&
              data.project.projectTokenInfo.active
            ? "Purchase"
            : "Purchases Paused"}
        </div>
      }
      <br />
      <br />
      {
        Object.keys(artfora_config.projects).includes(data.project.projectId) && (
          <div className={`${styles.purchaseButton} ${styles.highlightOrange}`}>
            <a
              href={`${artfora_config.collection_base_url}/${artfora_config.projects[data.project.projectId as unknown as keyof typeof artfora_config.projects]}`}
              target="_blank"
              rel="noreferrer"
            >
              View Collection on Artfora
            </a>
          </div>
        )
      }
        {
            <div
                className={`${styles.purchaseButton} ${styles.highlight}`}
                onClick={toggleWinter}
            >
                {parseInt(data.project.projectTokenInfo.invocations) < parseInt(data.project.projectTokenInfo.maxInvocations) /*&& !data.project.projectScriptInfo.paused && data.project.projectTokenInfo.active */&& (process.env.NEXT_PUBLIC_ETH_NETWORK == "goerli" || process.env.NEXT_PUBLIC_ETH_NETWORK == "goerliFlex" || process.env.NEXT_PUBLIC_ETH_NETWORK == "mainFlex") ? "Purchase With Card" : ""}
            </div>
        }
      <br />
      {walletAddress.toLowerCase() ===
      data.project.projectTokenInfo.artistAddress.toLowerCase() ? (
        <a
          href={`${editProjectBaseUrl}${data.project.projectId}`
          }
          target="_blank"
          rel="noreferrer"
        >
          Edit Project
        </a>
      ) : null}
      <div>
        <br />
        <div className={styles.galleryContainer}>
          {tokens.map((t) => {
            return (
              <div key={t} className={styles.token}>
                <Link
                  href={
                    "/token/" +
                    (parseInt(t) + 1000000 * parseInt(data.project.projectId))
                  }
                >
                  <a>#{t}</a>
                </Link>
                <img
                  src={`${imageBaseUrl}${
                    parseInt(t) + 1000000 * parseInt(data.project.projectId)
                  }.png`}
                  alt={"an image"}
                />
              </div>
            );
          })}
        </div>

        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          breakLabel={"..."}
          pageCount={
            Number(data.project.projectTokenInfo.invocations) /
            Number(process.env.NEXT_PUBLIC_PROJECT_GALLERY_PER_PAGE!)
          }
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
        />
        <br />
      </div>
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
