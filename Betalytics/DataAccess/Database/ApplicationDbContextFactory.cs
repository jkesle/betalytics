using Betalytics.Properties;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using Betalytics.DataAccess.Contracts.Database;

namespace Betalytics.DataAccess.Database;

public class ApplicationDbContextFactory : IApplicationDbContextFactory
{

    public ApplicationDbContextFactory()
    {
    }

    public ApplicationDbContext CreateDbContext()
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
        var configuredProviderName = Settings.Default.DatabaseProvider;
        var provider = DatabaseOptions.FromConnectionStringName(configuredProviderName);
        return provider switch
        {
            DatabaseProvider.Sqlite => new ApplicationDbContext(optionsBuilder.UseSqlite(GenerateSqliteConnectionString()).Options),
            _ => throw new NotSupportedException($"{provider} is not a supported database provider at this time")
        };
    }

    private static string GenerateSqliteConnectionString()
    {
        // Data Source={{LOCALAPPDATA}}\Betalytics\betalytics.sqlite;Version=3
        var connectionString = Settings.Default.Sqlite;
        var localAppData = Environment.GetEnvironmentVariable(Resources.LocalAppData);
        return connectionString.Replace(Resources.AppDataPlaceholder, localAppData);
    }
}