using System;
using System.Net;
using System.Web;

namespace Betalytics.Domain.Services;

public class WebService : IDisposable
{
    private readonly HttpClient _webClient;
    private bool _disposed = false;

    public WebService()
    {
        _webClient = new HttpClient();
    }

    public void Dispose()
    {
        if (!_disposed)
        {
            _webClient.Dispose();
            _disposed = true;
        }
    }

    public async Task<HttpResponseMessage> FetchAsync(HttpRequestMessage request) => await _webClient.SendAsync(request);

    
}