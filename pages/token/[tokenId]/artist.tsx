import {
  ownerOf,
  projectIdToArtistAddress,
  tokenIdToProjectId,
} from "@/lib/coreContract";
import { useRouter } from "next/router";

export default function Artist(props: { artistAddress: string }) {
  const router = useRouter();
  const { tokenId } = router.query;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <iframe
        src={`https://iammattjacobson.com/plotShareArtist/?url=https%3A%2F%2Fplottables-mainnet.s3.amazonaws.com%2F${tokenId}.png`}
        style={{
          height: "100%",
          width: "100%",
          border: 0,
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
