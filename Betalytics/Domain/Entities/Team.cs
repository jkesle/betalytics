﻿namespace Betalytics.Domain.Entities;

public class Team
{
    public string TeamId { get; set; }

    public List<Player> Players { get; set; }

    public List<Game> Games { get; set; }
}