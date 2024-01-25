namespace Betalytics.Domain.Entities;

public class Game
{
    public int GameId { get; set; }

    public Team HomeTeam { get; set; }

    public Team AwayTeam { get; set; }

    public List<BoxScore> BoxScores { get; set; }

    public GameResult @GameResult { get; set; }
}

public enum GameResult
{
    Home = 0x00,

    Away
}