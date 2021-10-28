import Container from "@/components/Container";
import { tokensOfOwner } from "@/lib/coreContract";

export interface UserProps {
  tokensOfOwner: string[] | null;
}

export default function User({ tokensOfOwner }: UserProps) {
  return (
    <Container>
      <h3>User</h3>
      <hr />
      This is the user page
      <br />
      {tokensOfOwner?.map((t) => (
        <pre key={t}>
          {t}
          <br />
        </pre>
      ))}
    </Container>
  );
}

export const getServerSideProps: (
  context: any
) => Promise<
  { props: { tokensOfOwner: null } } | { props: { tokensOfOwner: string } }
> = async (context) => {
  const address = context.params?.address;

  if (!address) {
    return {
      props: {
        tokensOfOwner: null,
      },
    };
  }

  return {
    props: {
      tokensOfOwner: await tokensOfOwner(address),
    },
  };
};
