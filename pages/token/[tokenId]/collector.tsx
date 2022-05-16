import {
  ownerOf,
  projectIdToArtistAddress,
  tokenIdToProjectId,
} from "@/lib/coreContract";
import {useRouter} from "next/router";
import styles from "@/styles/Plot.module.css";

export default function Collector(props: { artistAddress: string }) {

  const router = useRouter();
  const { peerId } = router.query;

  return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <iframe
            src={`https://iammattjacobson.com/plotShareCollector/?peerId=${peerId}`}
            style={{
              height: "100%",
              width: "100%",
              border: 0
            }}
            allow="camera; microphone"
        />
      </div>
  );
}

export const getServerSideProps: (context: any) => Promise<{ props: any }> =
    async (context) => {
      const tokenId = context.params?.tokenId;
      const projectId = await tokenIdToProjectId(tokenId);
      return {
        props: {
          owner: await ownerOf(tokenId),
          projectId: projectId,
          artistAddress: await projectIdToArtistAddress(projectId),
        },
      };
    };
