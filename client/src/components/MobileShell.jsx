export default function MobileShell({ children }) {
  return (
    <div className="stage">
      <div className="phone">
        <div className="phone__notch" aria-hidden="true" />
        {children}
      </div>
    </div>
  )
}
