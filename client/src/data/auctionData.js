export const TOURNAMENT_DATA = {
  id: 'sh-premier-2026',
  name: 'SH Premier League 2026',
  tier: 'PRO AUCTION ECOSYSTEM',
  franchisesCount: 8,
  totalPlayers: 144,
  auctionDate: '24 Aug • 6:00 PM',
  status: 'LIVE AUCTION IN PROGRESS',
  organizer: 'Scoring Heroes Board',
  currency: '₹',
}

export const FRANCHISE_WALLET = {
  totalBudget: 1000000, // ₹ 10,00,000
  spentPurchased: 260000, // ₹ 2,60,000
  gstPlatformFee: 48000, // ₹ 48,000 (18% GST + platform trust clearance)
  availableBudget: 692000, // ₹ 6,92,000
  squadCapacity: 15,
  slotsFilled: 7,
  teamName: 'Hapur Heroes',
}

export const AUCTION_PLAYERS = [
  {
    id: 'p-1',
    name: 'Arjun Verma',
    role: 'All-Rounder',
    jerseyNumber: 14,
    avatarImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    basePrice: 50000,
    currentBid: 185000,
    leadingFranchise: 'Hapur Heroes',
    status: 'bidding', // 'bidding' | 'sold' | 'unsold'
    stats: {
      batAvg: 38.4,
      strikeRate: 154.2,
      wickets: 28,
      economy: 6.8,
      matches: 34,
      trustRating: 96,
    },
    shortlisted: true,
  },
  {
    id: 'p-2',
    name: 'Vikramaditya Rao',
    role: 'Fast Bowler',
    jerseyNumber: 99,
    avatarImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    basePrice: 75000,
    currentBid: 240000,
    leadingFranchise: 'Marina Strikers',
    status: 'sold',
    soldTo: 'Marina Strikers',
    stats: {
      speed: '142 km/h',
      wickets: 42,
      economy: 7.1,
      maidens: 8,
      matches: 40,
      trustRating: 98,
    },
    shortlisted: true,
  },
  {
    id: 'p-3',
    name: 'Devansh Kulkarni',
    role: 'Top-Order Batsman',
    jerseyNumber: 18,
    avatarImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    basePrice: 60000,
    currentBid: 60000,
    leadingFranchise: 'None',
    status: 'upcoming',
    stats: {
      batAvg: 46.2,
      strikeRate: 144.8,
      fifties: 12,
      centuries: 3,
      matches: 29,
      trustRating: 93,
    },
    shortlisted: false,
  },
  {
    id: 'p-4',
    name: 'Siddharth Pillai',
    role: 'Wicketkeeper Finisher',
    jerseyNumber: 7,
    avatarImg: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    basePrice: 50000,
    currentBid: 50000,
    leadingFranchise: 'None',
    status: 'upcoming',
    stats: {
      batAvg: 34.6,
      strikeRate: 168.0,
      dismissals: 31,
      matches: 38,
      trustRating: 95,
    },
    shortlisted: true,
  },
  {
    id: 'p-5',
    name: 'Zameer Khan',
    role: 'Mystery Spinner',
    jerseyNumber: 24,
    avatarImg: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    basePrice: 40000,
    currentBid: 40000,
    leadingFranchise: 'None',
    status: 'upcoming',
    stats: {
      economy: 5.9,
      wickets: 36,
      dotBallPct: '48%',
      matches: 32,
      trustRating: 91,
    },
    shortlisted: false,
  },
]

export const POOL_CATEGORIES = [
  { id: 'all', title: 'ALL POOL', count: 144 },
  { id: 'batsman', title: 'BATSMAN', count: 28 },
  { id: 'bowler', title: 'BOWLER', count: 31 },
  { id: 'allrounder', title: 'ALL-ROUNDER', count: 52 },
  { id: 'wicketkeeper', title: 'WICKETKEEPER', count: 33 },
]

export const FRANCHISES_LIST = [
  { id: 'f-1', name: 'Hapur Heroes', wallet: '₹ 6,92,000', playersCount: 7, color: '#e10613' },
  { id: 'f-2', name: 'Marina Strikers', wallet: '₹ 5,80,000', playersCount: 8, color: '#00e676' },
  { id: 'f-3', name: 'Coastal Kings', wallet: '₹ 7,40,000', playersCount: 6, color: '#3de0ff' },
  { id: 'f-4', name: 'Deccan Royals', wallet: '₹ 6,10,000', playersCount: 7, color: '#ffb300' },
]
