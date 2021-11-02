import Container from "@/components/Container";
import { imageBaseUrl } from "@/config/index";
import {
  projectDetails,
  tokenIdToProjectId,
  tokensOfOwner,
} from "@/lib/coreContract";
import styles from "@/styles/User.module.css";
import Link from "next/link";
import { Key } from "react";

export interface UserProps {
  address: string | null;
  organizedTokens: any[];
}

export default function User({ address, organizedTokens }: UserProps) {
  return (
    <Container>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      User {address}'s Collection
      <br />
      <br />
      {Object.keys(organizedTokens).map((k) => {
        // @ts-ignore
        const { tokens, projectDetails } = organizedTokens[k];
        return (
          <div key={k}>
            <br />
            <Link href={`/project/${k}`}>
              <a>
                {projectDetails.projectName} by {projectDetails.artist}
              </a>
            </Link>
            <br />
            <br />
            <div className={styles.tokenContainer}>
              {tokens.map((t: Key | null | undefined) => {
                return (
                  <div key={t} className={styles.token}>
                    <Link href={"/token/" + t}>
                      <a>#{parseInt(t as string) - 1000000 * parseInt(k)}</a>
                    </Link>
                    <img src={imageBaseUrl + t + ".png"} alt={"an image"} />
                  </div>
                );
              })}
            </div>
            <br />
            <br />
          </div>
        );
      })}
    </Container>
  );
}

export const getServerSideProps: (context: any) => Promise<{ props: any }> =
  async (context) => {
    const address = context.params?.address;

    if (!address) {
      return {
        props: {
          address: null,
          organizedTokens: null,
        },
      };
    }

    const tokens = await tokensOfOwner(address);

    let organizedTokens = {};
    for (const token of tokens) {
      const projectId: string = await tokenIdToProjectId(token);
      if (!organizedTokens.hasOwnProperty(projectId)) {
        Object.assign(organizedTokens, {
          [projectId]: {
            tokens: [],
            projectDetails: await projectDetails(projectId),
          },
        });
      }
      // @ts-ignore
      organizedTokens[projectId].tokens.push(token);
    }

    return {
      props: {
        address: address,
        organizedTokens: organizedTokens,
      },
    };
  };
