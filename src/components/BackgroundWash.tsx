/**
 * The page's background, measured off the live site: a diagonal wash with
 * five light rays spanning the first 200vh, plus a grain tile fixed to the
 * viewport so it covers the whole page.
 *
 * Each ray is a tall white column sheared 45deg, but the part that actually
 * makes it look like sunlight is a horizontal `mask` gradient per ray (see
 * .ray-1..5 in globals.css). Without the mask each column paints as one flat
 * slab and the whole thing reads as a single bright wedge.
 *
 * Note the z-0 below rather than a negative z-index: a negative one paints
 * behind body's own opaque background and the entire wash vanishes.
 */
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
      style={{
        backgroundImage: "url('/img/6mcf62RlDfRfU61Yg5vb2pefpi.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "150px auto",
      }}
    />
  );
}

const FADE =
  "radial-gradient(125% 100% at 0px 0px, #000 0%, rgba(0,0,0,0.224) 88.29%, rgba(0,0,0,0) 100%)";

export default function BackgroundWash() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[200vh] overflow-hidden"
      style={{
        background: "linear-gradient(225deg, #ffffff 0%, #d9d9d9 100%)",
        // The whole layer fades out from the top-left corner, as live, so
        // the wash and rays melt into the plain #d9d9d9 page further down.
        mask: FADE,
        WebkitMask: FADE,
      }}
    >
      <div className="ray ray-1" />
      <div className="ray ray-2" />
      <div className="ray ray-3" />
      <div className="ray ray-4" />
      <div className="ray ray-5" />
    </div>
  );
}
