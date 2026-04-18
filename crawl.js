const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }
  
  const normalizedCurrentURL = normalizeUrl(currentURL);

  console.log("activily crawling: ", currentURL);
  
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }
  
  pages[normalizedCurrentURL] = 1;
  
    try{
      const resp = await fetch(currentURL);
      
      if (resp.status > 399) {
        console.log(`Error in fetch status code ${resp.status} on site: ${currentURL}`);
        return pages;
      }

      const contentType = resp.headers.get("content-type")
      if (!contentType.includes("text/html")) {
        console.log(`non html response, content type: ${contentType} on page ${currentURL}`);
        return pages;
      }

      const htmlBody = await resp.text();

      const nextURLs = getURLsfromHTML(htmlBody,  baseURL);

      for(const nextURL of nextURLs){
        pages = await crawlPage(baseURL, nextURL, pages);
      }
      
    } catch (err) {
      console.log(`Error in fetch :${err.message}, on page: ${currentURL}`);
      
    }

    return pages
    
}

function getURLsfromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  // console.log(dom);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    console.log(linkElement.href);
    if (linkElement.href.slice(0, 1) === "/") {
      //relative
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log("error with relative URL:", err.message);
      }
    } else {
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log("error with absolute url", err.message);
      }
    }
  }
  return urls;
}

function normalizeUrl(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }

  return hostPath;
}

module.exports = {
  normalizeUrl,
  getURLsfromHTML,
  crawlPage
};
