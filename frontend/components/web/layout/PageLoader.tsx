// Full-screen loading overlay shown during page transitions
export function PageLoader() {
  return (
    <div aria-hidden="true" className="page-loader">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/alaia-surf-coach-logo-round-green.svg" alt="" width={300} height={300} />
    </div>
  );
}