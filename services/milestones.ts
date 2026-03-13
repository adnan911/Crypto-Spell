export interface Milestone {
    level: number;
    label: string;
    coins: number;
    badge: string;
}

export const MILESTONES: Milestone[] = [
    { level: 10, label: "Band 1 Complete", coins: 500, badge: "Accumulator" },
    { level: 25, label: "Majors Mastered", coins: 1000, badge: "Bull Runner" },
    { level: 40, label: "Staples Expert", coins: 2000, badge: "DeFi Degen" },
    { level: 60, label: "Rebrand Historian", coins: 3500, badge: "OG Hodler" },
    { level: 75, label: "Niche Hunter", coins: 5000, badge: "Gem Finder" },
    { level: 85, label: "Meme Lord", coins: 7500, badge: "Diamond Hands" },
    { level: 94, label: "Hard Mode Hero", coins: 12000, badge: "Whale" },
    { level: 100, label: "Crypto Master", coins: 25000, badge: "Satoshi" }
];

export const getMilestone = (level: number): Milestone | undefined => {
    return MILESTONES.find(m => m.level === level);
};
