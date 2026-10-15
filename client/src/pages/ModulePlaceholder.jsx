import { useParams } from 'react-router-dom'
import Screen from '../components/Screen'

const copy = {
  tournaments: 'Create cups, collect GST-ready fees, publish points tables and auto-announce sold players.',
  teams: 'Franchise and academy sides with player slots, budgets and public pages.',
  players: 'Search verified nicknames, follow careers and invite to matches.',
  auctions: 'Player pool, base prices, live bidding and franchise settlement.',
  grounds: 'Slot booking, Team A vs Team B, staff and monthly accounts.',
  streaming: 'Go live from phone. Pair with AI commentary and highlights.',
  schedule: 'Fixtures, reminders and ground collision checks.',
  rankings: 'City, state and academy leaderboards from genuine match data.',
  analytics: 'Wagon wheel, Manhattan, partnerships, form and career timeline.',
  drs: 'DRS review clips and DLS rain tools inside the match.',
  settings: 'Voice, language, privacy and notification controls.',
  academy: 'U14 to pro stages, coach feedback, attendance and fees.',
  tickets: 'QR entry, live attendance and revenue split.',
  market: 'Jerseys, used gear, verified sellers and checkout.',
  aimatch: 'Simulate country or custom matches from real player stats.',
}

export default function ModulePlaceholder() {
  const { slug } = useParams()
  const title = slug?.replace(/-/g, ' ') || 'Module'

  return (
    <Screen back title={title}>
      <div className="panel">
        <h3>Coming next in this prototype</h3>
        <p className="lede">{copy[slug] || 'This cricket module is in the product scope and will be wired after the home flow.'}</p>
        <p className="muted">UI shell is ready so you can drop logos and live APIs later.</p>
      </div>
    </Screen>
  )
}
