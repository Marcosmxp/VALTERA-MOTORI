export default function Loading() {
  return <main className="loading-screen" aria-live="polite" aria-busy="true">
    <div className="loading-brand"><span className="brand-mark" aria-hidden="true">V</span><span>VALTERA MOTORI</span></div>
    <div className="loading-vehicle" aria-hidden="true"><span /><i /></div>
    <div className="loading-line" aria-hidden="true"><span /></div>
    <div className="loading-status"><span>Multibrand Market Intelligence</span><b>V0.5</b></div>
  </main>;
}
