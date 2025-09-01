export interface League {
    id: number,
    name: string,
    rank_count: number,
    entry_percentile_rank: number,
    entry_rank: number,
    entry_last_rank: number,
}

export interface LeagueEntry {
    id: number,
    favourite_team: 2,
    player_first_name: string,
    player_last_name: string,
    player_region_name: string,
    years_active: number,
    summary_overall_points: number,
    summary_overall_rank: number,
    summary_event_points: number,
    summary_event_rank: number,
    current_event: number,
    leagues: League[]
}