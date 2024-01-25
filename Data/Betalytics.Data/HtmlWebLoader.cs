using Devdroppings.Betalytics.Data.Contracts.Web;
using System;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Threading.Tasks;
using HtmlAgilityPack;
using System.Net;

namespace Devdroppings.Betalytics.Data.Web;

public class HtmlWebLoader : IHtmlWebLoader
{
    public HtmlWebLoader()
    {
        WebClient = new();
    }
    
    public async Task<(HttpStatusCode StatusCode, HtmlDocument? Html)> FetchAsync(string url)
    {
        var html = await WebClient.LoadFromWebAsync(url);
        return (WebClient.StatusCode, html);
    }

    private HtmlWeb WebClient { get; set; }
}