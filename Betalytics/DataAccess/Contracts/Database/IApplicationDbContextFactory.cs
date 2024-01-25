﻿using Betalytics.Properties;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Betalytics.DataAccess.Contracts.Database;

public interface IApplicationDbContextFactory : IDbContextFactory<ApplicationDbContext>
{

}
