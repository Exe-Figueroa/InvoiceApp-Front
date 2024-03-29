export const ShadowBackground = ({isActive, zIndex}) => {
  return (
    <div className={`fixed ${isActive ? 'flex' : 'hidden'} w-screen top-0 left-0 bg-black/40 h-full ${zIndex ? zIndex : 'z-20'} `}></div>
  );
}
