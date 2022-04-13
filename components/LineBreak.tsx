import Rand from "rand-seed";

export const LineBreak = ({ rand }: { rand?: Rand }) => {
  if (!rand) {
    rand = new Rand();
  }

  let path = "M 0 " + (10 * rand.next() + 5);
  for (let i = 1; i <= 20; i++) {
    path +=
      " S " +
      (i - 0.5) +
      " " +
      (10 * rand.next() + 5) +
      " " +
      i +
      " " +
      (10 * rand.next() + 5);
  }
  return (
    <svg
      preserveAspectRatio="none"
      width="100%"
      height="17px"
      viewBox="0 0 20 20"
    >
      <path
        style={{
          fill: "none",
          strokeWidth: "2",
          stroke: "rgb(0%,0%,0%)",
        }}
        d={path}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};
