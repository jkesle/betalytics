namespace Devdroppings.Betalytics.Data.Contracts.Entities;

using System;

public class BoxScore
{
    public int Id { get; set; }
    
    public Player @Player { get; set; }

    public Game @Game { get; set; }

    public int Points { get; set; }

    public int Rebounds { get; set; }

    public int Assists { get; set; }
}