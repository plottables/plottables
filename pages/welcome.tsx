import { useRouter } from "next/router";

export default function Welcome(props: { owner: string }) {
  const router = useRouter();
  const { tokenId } = router.query;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ width: "100%", height: "100%" }}>
        <iframe
          src={`/api/tokens/welcome/plot`}
          style={{
            height: "100%",
            width: "100%",
            border: 0,
          }}
        />
      </div>
    </div>
  );
}

// export const getServerSideProps: (context: any) => Promise<{ props: any }> =
//     async (context) => {
//         const tokenId = context.params?.tokenId;
//         return {
//             props: {
//                 owner: await ownerOf(tokenId),
//             },
//         };
//     };
