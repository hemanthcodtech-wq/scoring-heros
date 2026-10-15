export const DEMO_OTP = '1234'

export const sports = [
  { id: 'cricket', name: 'Cricket', focus: true, emoji: '🏏' },
  { id: 'hockey', name: 'Hockey', focus: false, emoji: '🏑' },
  { id: 'football', name: 'Football', focus: false, emoji: '⚽' },
  { id: 'badminton', name: 'Badminton', focus: false, emoji: '🏸' },
  { id: 'kabaddi', name: 'Kabaddi', focus: false, emoji: '🤼' },
  { id: 'basketball', name: 'Basketball', focus: false, emoji: '🏀' },
]

export const roles = [
  { id: 'batsman', title: 'Batsman', copy: 'Anchor innings and chase totals.' },
  { id: 'bowler', title: 'Bowler', copy: 'Take wickets and control economy.' },
  { id: 'allrounder', title: 'All-rounder', copy: 'Impact with bat and ball.' },
  { id: 'wicketkeeper', title: 'Wicketkeeper', copy: 'Keep, catch and finish games.' },
]

export const modules = [
  { slug: 'scorer', title: 'Live Scorer', icon: 'scorer', accent: true, to: '/app/scorer' },
  { slug: 'tournaments', title: 'Tournaments', icon: 'trophy', to: '/app/tournaments' },
  { slug: 'teams', title: 'Teams', icon: 'users' },
  { slug: 'players', title: 'Players', icon: 'user' },
  { slug: 'auctions', title: 'Auctions', icon: 'gavel', to: '/app/auction' },
  { slug: 'grounds', title: 'Grounds', icon: 'map', to: '/app/grounds' },
  { slug: 'streaming', title: 'Highlights & Replays', icon: 'video', to: '/app/highlights' },
  { slug: 'schedule', title: 'Schedule', icon: 'calendar' },
  { slug: 'rankings', title: 'Rankings', icon: 'chart', to: '/app/stats' },
  { slug: 'analytics', title: 'Player Stats', icon: 'activity', to: '/app/stats' },
  { slug: 'drs', title: 'DRS & DLS', icon: 'replay', to: '/app/match-tools' },
  { slug: 'marketplace', title: 'Marketplace', icon: 'cart', to: '/app/marketplace' },
  { slug: 'settings', title: 'Settings', icon: 'settings' },
]

export const liveMatch = {
  format: 'T20',
  over: '10.3',
  maxOvers: 20,
  score: '106/3',
  crr: '10.10',
  rrr: '8.25',
  batting: 'Scoring XI',
  bowling: 'Warriors XI',
  striker: { name: 'Rohit', runs: 42, balls: 18, extras: ['4', '6'] },
  nonStriker: { name: 'Karan', runs: 18, balls: 10, extras: ['1', '1'] },
  bowler: { name: 'Vikram', figures: '1.3-0-21-1' },
}

export const upcomingMatches = [
  {
    id: 'm1',
    title: 'Chennai Street Cup',
    a: 'Scoring XI',
    b: 'Marina Strikers',
    ground: 'Marina Turf, Chennai',
    when: 'Today • 7:30 PM',
    live: true,
  },
  {
    id: 'm2',
    title: 'Academy Super League',
    a: 'U19 Titans',
    b: 'Coastal Kings',
    ground: 'SH Arena 2',
    when: 'Tomorrow • 6:00 AM',
    live: false,
  },
]

export const career = {
  stage: 'U19 Academy',
  matches: 48,
  runs: 1842,
  avg: 38.4,
  sr: 142.6,
  wickets: 31,
  economy: 6.8,
  highest: 118,
  fifties: 12,
  hundreds: 3,
  lastTeams: ['Scoring XI', 'Marina Strikers', 'U19 Titans', 'Coastal Kings', 'City Super Giants'],
}

export const super11 = [
  { name: 'Rohit', role: 'BAT', pts: 98 },
  { name: 'Meera', role: 'WK', pts: 91 },
  { name: 'Karan', role: 'AR', pts: 88 },
  { name: 'Vikram', role: 'BOWL', pts: 86 },
  { name: 'Dev', role: 'BAT', pts: 81 },
]

export const feed = [
  { id: 1, who: 'Scoring XI', text: 'Rohit smashes 42*(18) — Super Scoring 11 lock incoming.', tag: 'LIVE' },
  { id: 2, who: 'Marina Auctions', text: 'U19 all-rounder Meera sold to Coastal Kings for ₹4.2L.', tag: 'AUCTION' },
  { id: 3, who: 'SH Academy', text: 'Coach note: Arjun’s strike rate jumped 18 points this month.', tag: 'CAREER' },
]

export const alerts = [
  { id: 1, title: 'Match starting soon', body: 'Scoring XI vs Marina Strikers at 7:30 PM.', time: '12m' },
  { id: 2, title: 'Auction shortlist', body: 'You are shortlisted for City Super Giants.', time: '1h' },
  { id: 3, title: 'Verified badge', body: 'Trust score updated. Aadhaar stays private.', time: 'Yesterday' },
]

export const onboardingSlides = [
  {
    kicker: 'Verified identity',
    title: 'A lifelong cricket career, recorded for real.',
    copy: 'Every run, wicket and academy stage lives on your Scoring Heroes profile — from U14 to pro.',
  },
  {
    kicker: 'Live scoring',
    title: 'Ball-by-ball scoring that becomes stats and highlights.',
    copy: 'Score like a broadcast desk. Share live cards, AI commentary and one-tap highlights.',
  },
  {
    kicker: 'Tournaments & auctions',
    title: 'Run cups, bid for players, book grounds.',
    copy: 'Organisers get GST-ready fees, franchise dashboards and sold-player announcements.',
  },
  {
    kicker: 'Cricket first',
    title: 'Built for cricket. Ready for more sports later.',
    copy: 'Hockey, football, kabaddi and others stay on the roadmap. Cricket is the launch sport.',
  },
]
