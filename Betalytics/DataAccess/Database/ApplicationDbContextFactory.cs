using Betalytics.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using OpenQA.Selenium;

namespace Betalytics.DataAccess.Database;

public class ApplicationDbContextFactory : IDbContextFactory<ApplicationDbContext>
{
    private readonly DatabaseOptions _options;

    public ApplicationDbContextFactory(DatabaseOptions options)
    {
        _options = options;
    }

    public ApplicationDbContext CreateDbContext()
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
        return _options.Provider switch
        {
            DatabaseProvider.Sqlite => new ApplicationDbContext(optionsBuilder.UseSqlite(_options.ConnectionString).Options),
            _ => throw new NotSupportedException($"{_options.Provider} is not a supported database provider at this time")
        };
    }

}