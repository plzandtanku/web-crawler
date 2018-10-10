import java.io.*;
import java.util.*;
import org.jsoup.*;
import org.jsoup.select.*;
import org.jsoup.nodes.*;
public class Crawler{
    public static String crawl(String q, String startUrl) {
        List<String> urls = new ArrayList<String>(Arrays.asList(startUrl));
        try {
            while (!urls.isEmpty()) {
                String url = urls.remove(0);
                // check if the current URL has the query
                Document d = Jsoup.connect(url).get();
                String text = d.body().text();
                if (text.toLowerCase().contains(q)) {
                    return url;
                }
                // otherwise navigate to other pages from the links on page
                Elements links = d.select("a[href]");
                for (Element link : links) {
                    urls.add(link.attr("abs:href"));
                }
            }
        }
        catch (IOException ie) {
            System.out.println(ie);
            return "";
        }
        return "";
    }
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a string to search: ");
        String q = sc.nextLine();
        System.out.print("Enter a starting URL: ");
        String startUrl = sc.nextLine();
        System.out.println("Searching for " + q + " starting from url: [" + startUrl + "]");
        String result = crawl(q, startUrl);
        if (!result.equals("")) {
            System.out.println("Found " + q + " at " + result);
        }
        else {
            System.out.println("Could not find query from starting URL: " + startUrl);
        }
    }
}

