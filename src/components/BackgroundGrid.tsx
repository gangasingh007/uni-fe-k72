const BackgroundGrid = () => (
    <div className="fixed inset-0 z-0 pointer-events-none select-none">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      {/* Radial Gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_0%,#115e5915,transparent)]" />
      <div className="absolute inset-0 bg-black/90" /> 
    </div>
  );

export default BackgroundGrid