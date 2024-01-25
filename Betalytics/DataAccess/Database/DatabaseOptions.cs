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

    public static DatabaseProvider FromConnectionStringName(string name) => name switch
    {
        "Sqlite" => DatabaseProvider.Sqlite,
        _ => throw new NotSupportedException($"{name} is not a supported database provider. Make sure \"name\" attribute of the connectionString configuration is the name of the database provider you want to use and the database is supported")
    };
}
