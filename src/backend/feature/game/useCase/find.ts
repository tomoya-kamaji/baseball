interface Game {
  id: number
  date: string
  homeTeamId: string
  roadTeamId: string
  venueId: string
  scoreHome: number
  scoreRoad: number
  time: string
  url: string
}

// 仮の試合データ
const gamesData: Game[] = [
  {
    id: 1,
    date: '2023-03-30',
    homeTeamId: 'team_1',
    roadTeamId: 'team_2',
    venueId: 'venue_1',
    scoreHome: 1,
    scoreRoad: 3,
    time: '18:30',
    url: 'https://npb.jp/scores/2023/0330/f-e-01/'
  }
]

export const findGameUseCase = async (teamId?: string): Promise<Game[]> => {
  // teamIdが指定されている場合は、試合データから該当する試合を取得
  if (teamId) {
    const filterGames = gamesData.filter(
      (game) => game.homeTeamId === teamId || game.roadTeamId === teamId
    )
    return filterGames
  }

  return gamesData
}
