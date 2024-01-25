namespace Devdroppings.Betalytics.Data.Contracts.Entities;
public class Player
{
    public int PlayerId { get; set; }

    public string PlayerFirstName { get; set; }

    public string PlayerLastName { get; set; }

    public Team @Team { get; set; }

    public List<BoxScore> BoxScores { get; set; }
}
