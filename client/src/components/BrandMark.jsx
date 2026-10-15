const MARK = '/applogo.jpeg'
const WORDMARK = '/logo.png'

export default function BrandMark({ size = 72, withWord = false }) {
  if (withWord) {
    return (
      <img
        className="brand brand__wordmark"
        src={WORDMARK}
        alt="Scoring Heroes"
        style={{ height: size }}
      />
    )
  }

  return (
    <img
      className="brand__logo"
      src={MARK}
      alt="Scoring Heroes"
      width={size}
      height={size}
    />
  )
}
