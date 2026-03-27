export type OptionType = "CE" | "PE";

export type Trade = {
  rank: number;
  username: string;
  instrumentName: string;
  symbol: string;
  exchange: string;
  optionType?: OptionType;
  strike?: number;
  entry: number;
  exit: number;
  retPct: number;
  pnl: number;
  capital: number;
  narrative: string;
  macroContext: string;
  effRatio: number;
  smartPickRank?: number; // 1..5
};

export type Trader = {
  username: string;
  initials: string;
  gradientClass: string;
  followers: number;
  following: number;
  winRate: number;
  tradesToday: number;
  bio: string;
  specialtyPills: string[];
};

export const demoDateLabel = "26 Mar 2026";
export const demoMacroContext =
  "US-Iran ceasefire signal on 25 Mar 2026 sent Sensex up 1,205 pts (+1.6%) with sharp intraday swings. Crude fell below $100. HDFC Bank +2.7%, L&T +3.8%, Bajaj Finance +3.8% led the rally. TCS −0.86%, Tech Mahindra −1.66% lagged. India HSBC PMI fell to 56.5 (4-month low).";

export const top10Carousel: Trade[] = [
  {
    rank: 1,
    username: "@spread_king_59",
    instrumentName: "BSE Sensex Options",
    symbol: "BSXOPT",
    exchange: "BFO",
    optionType: "PE",
    strike: 75000,
    entry: 14.74,
    exit: 32.91,
    retPct: 123.27,
    pnl: 145_314,
    capital: 117_930,
    narrative:
      '"Sensex PE at ₹14.74 → ₹32.91 (+123%). Macro trigger: US-Iran ceasefire signals drove Sensex up 1.6% with sharp intraday two-way swings — ideal for PE premium expansion near 75,200 strike."',
    macroContext: demoMacroContext,
    effRatio: 4.0,
    smartPickRank: 1,
  },
  {
    rank: 2,
    username: "@scalp_lord_73",
    instrumentName: "BSE Sensex Options",
    symbol: "BSXOPT",
    exchange: "BFO",
    optionType: "CE",
    strike: 75500,
    entry: 262.27,
    exit: 344.49,
    retPct: 31.35,
    pnl: 156_210,
    capital: 498_312,
    narrative:
      "\"Sensex CE at ₹262.27 → ₹344.49 (+31%). Macro trigger: Crude oil fell below $100 on de-escalation hopes, sending Sensex and financial stocks sharply higher — CE at 75,500 captured the morning surge.\"",
    macroContext: demoMacroContext,
    effRatio: 4.0,
    smartPickRank: 2,
  },
  {
    rank: 3,
    username: "@scalp_lord_73",
    instrumentName: "BSE Sensex Options",
    symbol: "BSXOPT",
    exchange: "BFO",
    optionType: "PE",
    strike: 75500,
    entry: 262.47,
    exit: 335.46,
    retPct: 27.81,
    pnl: 116_789,
    capital: 419_952,
    narrative:
      "\"Sensex PE at ₹262.47 → ₹335.46 (+28%). Macro trigger: Despite the index closing up, intraday uncertainty caused sharp dips — this PE leg was held through the afternoon reversal.\"",
    macroContext: demoMacroContext,
    effRatio: 4.0,
    smartPickRank: 3,
  },
  {
    rank: 4,
    username: "@scalp_lord_73",
    instrumentName: "BSE Sensex Options",
    symbol: "BSXOPT",
    exchange: "BFO",
    optionType: "PE",
    strike: 75200,
    entry: 150.98,
    exit: 189.76,
    retPct: 25.69,
    pnl: 232_717,
    capital: 905_880,
    narrative:
      "\"Sensex PE at ₹150.98 → ₹189.76 (+26%). Macro trigger: mixed signals into close — index faded from highs, pushing PE premium up 26%.\"",
    macroContext: demoMacroContext,
    effRatio: 4.0,
    smartPickRank: 4,
  },
  {
    rank: 5,
    username: "@algo_sniper_29",
    instrumentName: "BSE Sensex Options",
    symbol: "BSXOPT",
    exchange: "BFO",
    optionType: "PE",
    strike: 75500,
    entry: 82.85,
    exit: 101.87,
    retPct: 22.96,
    pnl: 2_663,
    capital: 11_599,
    narrative:
      "\"Sensex PE at ₹82.85 → ₹101.87 (+23%). Macro trigger: oil supply uncertainty spooked mid-session — deep OTM PE spiked on the dip.\"",
    macroContext: demoMacroContext,
    effRatio: 4.0,
  },
  {
    rank: 6,
    username: "@scalp_lord_73",
    instrumentName: "BSE Sensex Options",
    symbol: "BSXOPT",
    exchange: "BFO",
    optionType: "PE",
    strike: 75200,
    entry: 175.21,
    exit: 212.68,
    retPct: 21.39,
    pnl: 209_835,
    capital: 0,
    narrative:
      "\"Sensex PE at ₹175.21 → ₹212.68 (+21%). Macro trigger: two-way whipsaws on geopolitical headlines — sized for intraday vol spike.\"",
    macroContext: demoMacroContext,
    effRatio: 4.0,
  },
  {
    rank: 7,
    username: "@delta_monk_95",
    instrumentName: "BSE Sensex Options",
    symbol: "BSXOPT",
    exchange: "BFO",
    optionType: "PE",
    strike: 75200,
    entry: 138.63,
    exit: 165.61,
    retPct: 19.46,
    pnl: 852_928,
    capital: 4_383_534,
    narrative:
      "\"Sensex PE at ₹138.63 → ₹165.61 (+19%). Macro trigger: expiry-day swings inflated PE premium into close.\"",
    macroContext: demoMacroContext,
    effRatio: 4.0,
  },
  {
    rank: 8,
    username: "@delta_monk_95",
    instrumentName: "BSE Sensex Options",
    symbol: "BSXOPT",
    exchange: "BFO",
    optionType: "CE",
    strike: 75500,
    entry: 93.44,
    exit: 110.61,
    retPct: 18.38,
    pnl: 525_806,
    capital: 0,
    narrative:
      "\"Sensex CE at ₹93.44 → ₹110.61 (+18%). Macro trigger: second-day rally on global risk-on sentiment — CE at support-turned-resistance played out.\"",
    macroContext: demoMacroContext,
    effRatio: 4.0,
  },
  {
    rank: 9,
    username: "@trend_rider_94",
    instrumentName: "BSE Sensex Options",
    symbol: "BSXOPT",
    exchange: "BFO",
    optionType: "PE",
    strike: 75500,
    entry: 27.04,
    exit: 31.91,
    retPct: 18.01,
    pnl: 3_216,
    capital: 0,
    narrative:
      "\"Sensex PE at ₹27.04 → ₹31.91 (+18%). Macro trigger: PMI slipped to a 4-month low — weak data weighed midday, boosting short-dated PE ahead of expiry.\"",
    macroContext: demoMacroContext,
    effRatio: 4.0,
  },
  {
    rank: 10,
    username: "@spread_king_59",
    instrumentName: "BSE Sensex Options",
    symbol: "BSXOPT",
    exchange: "BFO",
    optionType: "CE",
    strike: 76500,
    entry: 13.37,
    exit: 15.34,
    retPct: 14.73,
    pnl: 4_737,
    capital: 32_080,
    narrative:
      "\"Sensex CE at ₹13.37 → ₹15.34 (+15%). Macro trigger: heavyweight financials pulled Sensex higher — deep ITM CE strengthened into afternoon.\"",
    macroContext: demoMacroContext,
    effRatio: 4.0,
  },
];

export const top20ByReturn: Trade[] = top10Carousel
  .slice(0, 6)
  .map((t) => ({
    ...t,
    capital: t.capital || Math.round(t.entry * 750),
  }));

export const top20ByPnl: Array<
  Trade & { tradesCount: number; bestReturnPct: number }
> = [
  {
    ...top10Carousel[0],
    rank: 1,
    retPct: 148_296,
    pnl: 148_296,
    tradesCount: 3,
    bestReturnPct: 123.27,
    narrative:
      '"Best day of the month — 3 Sensex trades capitalised on US-Iran volatility. Standout: 75,000 PE +123% as crude fell below $100 and options pricing exploded."',
    effRatio: 4.0,
  },
  {
    ...top10Carousel[1],
    rank: 2,
    retPct: 64_998,
    pnl: 64_998,
    tradesCount: 13,
    bestReturnPct: 31.35,
    narrative:
      '"Highest trade count: 13 Sensex option trades across CE/PE legs. Strategy: buy morning breakout, flip to PE on fades during the 1,200-pt swing."',
    effRatio: 4.0,
  },
  {
    ...top10Carousel[7],
    rank: 3,
    username: "@zetatrade_18",
    instrumentName: "Nifty 50 Options",
    symbol: "NIFTY",
    exchange: "NFO",
    optionType: "CE",
    strike: 23000,
    entry: 313.81,
    exit: 352.9,
    retPct: 56_222,
    pnl: 56_222,
    capital: 600_000,
    tradesCount: 4,
    bestReturnPct: 12.46,
    narrative:
      "\"4-for-4 on Nifty 50 CE trades — easing oil and risk-on drove Nifty up 394 pts (+1.72%). Highest single return: 12.5% on 23,000 CE.\"",
    macroContext: demoMacroContext,
    effRatio: 4.0,
  },
];

export const suggestedTraders: Trader[] = [
  {
    username: "@scalp_lord_73",
    initials: "SL",
    gradientClass: "bg-gradient-to-br from-[color:var(--mf-purple)] to-pink-600",
    followers: 0,
    following: 0,
    winRate: 0,
    tradesToday: 6,
    bio: "",
    specialtyPills: ["Options", "BFO"],
  },
  {
    username: "@algo_sniper_29",
    initials: "AS",
    gradientClass: "bg-gradient-to-br from-[color:var(--mf-green)] to-[color:var(--mf-accent)]",
    followers: 0,
    following: 0,
    winRate: 0,
    tradesToday: 1,
    bio: "",
    specialtyPills: ["Options", "BFO"],
  },
  {
    username: "@delta_monk_95",
    initials: "DM",
    gradientClass: "bg-gradient-to-br from-[color:var(--mf-gold)] to-[color:var(--mf-orange)]",
    followers: 0,
    following: 0,
    winRate: 0,
    tradesToday: 2,
    bio: "",
    specialtyPills: ["Options", "BFO"],
  },
];

export const demoTraderProfile: Trader = {
  username: "@spread_king_59",
  initials: "SK",
  gradientClass: "bg-gradient-to-br from-[color:var(--mf-accent)] to-[color:var(--mf-purple)]",
  followers: 2841,
  following: 183,
  winRate: 67,
  tradesToday: 3,
  bio: "Sensex options specialist — trades BFO weekly expiries, focused on premium expansion plays around macro events. Tight sizing, quick exits. Never overstays a position.",
  specialtyPills: ["🏆 #1 Today", "⚡ Sensex Options", "BFO · BSE", "67% Win Rate"],
};

