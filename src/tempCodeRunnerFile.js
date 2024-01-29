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