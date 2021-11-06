export function makeLineBreak() {
  let path = "M 0 " + (10 * Math.random() + 5);
  for (let i = 1; i < 100; i++) {
    path +=
      " S " +
      (i - 0.5) +
      " " +
      (10 * Math.random() + 5) +
      " " +
      i +
      " " +
      (10 * Math.random() + 5);
  }
  return (
    <svg
      preserveAspectRatio="none"
      width="100%"
      height="17px"
      viewBox="0 0 100 20"
    >
      <path
        style={{ fill: "none", strokeWidth: "2", stroke: "rgb(0%,0%,0%)" }}
        d={path}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
