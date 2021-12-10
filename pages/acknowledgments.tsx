import Container from "@/components/Container";
import { makeLineBreak } from "@/lib/makeLineBreak";

export default function Acknowledgments() {
  return (
    <Container>
      Plottables utilizes third-party open source software subject to the
      licenses described below.
      <br />
      <br />
      {makeLineBreak()}
      <a
        href="https://github.com/nornagon/saxi"
        target="_blank"
        rel="noreferrer"
      >
        saxi
      </a>
      <br />
      Special thanks to{" "}
      <a href="https://nornagon.net/" target="_blank" rel="noreferrer">
        Jeremy Rose
      </a>{" "}
      and all of the collaborators working on saxi.
      <br />
      Distributed under the{" "}
      <a
        href="https://www.gnu.org/ licenses/agpl-3.0.en.html"
        target="_blank"
        rel="noreferrer"
      >
        GNU Affero General Public License
      </a>
      .
      <br />
      {makeLineBreak()}
    </Container>
  );
}
