using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Betalytics.DataAccess.Database;

public class DatabaseOptions
{
    public string ConnectionString { get; set; }
    public DatabaseProvider Provider { get; set; }
}
