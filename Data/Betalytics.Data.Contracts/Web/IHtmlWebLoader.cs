using HtmlAgilityPack;
using System.Net;

namespace Devdroppings.Betalytics.Data.Contracts.Web;

public interface IHtmlWebLoader
{
   Task<(HttpStatusCode StatusCode, HtmlDocument? Html)> FetchAsync(string url);
}