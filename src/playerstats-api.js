class BoxScore {
    playerId;
    playerName;
    team;
    gameId;
    gameDate;
    matchup;
    wl;
    pts;
    ast;
    reb;

    constructor(playerId, playerName, team, gameId, gameDate, matchup, wl, pts, ast, reb) {
        this.playerId = playerId;
        this.playerName = playerName;
        this.team = team;
        this.gameId = gameId;
        this.gameDate = gameDate;
        this.matchup = matchup;
        this.wl = wl;
        this.pts = pts;
        this.ast = ast;
        this.reb = reb;
    }

    get playerId() {
        return this.playerId;
    }

    get playerName() {
        return this.playerName;
    }

    get team() {
        return this.team;
    }

    get gameId() {
        return this.gameId;
    }

    get gameDate() {
        return this.gameDate;
    }
    
    get matchup() {
        return this.matchup;
    }

    get wl() {
        return this.wl;
    }

    get pts() {
        return this.pts;
    }

    get ast() {
        return this.ast;
    }

    get reb() {
        return this.reb;
    }
}

const fetchPlayerStats = async () => {
    const options = {
      method: "GET",
      headers: {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.9",
          "Connection": "keep-alive",
          "Host": "stats.nba.com",
          "Origin": "https://www.nba.com",
          "DNT": "1",
          "Referer": "https://www.nba.com/",
          "Sec-CH-UA": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Microsoft Edge\";v=\"120\"",
          "Sec-CH-UA-Mobile": "?0",
          "Sec-CH-UA-Platform": "Windows",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0"
      }
    };

    const prepPlayerStats = leagueGameLog => {
        const resultSets = leagueGameLog.resultSets[0];
        const props = Object.fromEntries(resultSets.headers.map((prop, idx) => [prop, idx]));
        const rows = resultSets.rowSet;
        return rows.map(row => new BoxScore(row[1], row[2], row[4], row[6], row[7], row[8], row[9], row[28], row[23], row[22]));
    }
  
    const response = await fetch("https://stats.nba.com/stats/leaguegamelog?Counter=1000&DateFrom=&DateTo=&Direction=DESC&ISTRound=&LeagueID=00&PlayerOrTeam=P&Season=2023-24&SeasonType=Regular%20Season&Sorter=DATE", options);
    return prepPlayerStats(await response.json());
}

module.exports = {BoxScore, fetchPlayerStats};