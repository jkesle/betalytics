
using HtmlAgilityPack;
using HtmlAgilityPack.CssSelectors.NetCore;
using System.Xml.XPath;

namespace Betalytics.Data.Web;

public class HtmlParser
{
    public HtmlParser()
    { }

    public static bool TryGetNode(HtmlDocument html, string cssSelector, out HtmlNode node)
    {
        node = html.DocumentNode.QuerySelector(cssSelector);
        return node is not null;
    }
}
