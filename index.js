/*
  index.js

  QA Wolf Take Home Job Application Assignment.
  This script opens a chromium browser and goes to Hacker News.

  My objective is to make sure that the 100 entries that pop up on the page are indeed sorted from newest to oldest.
  I'll need to access the elements on the page and whatever attribute determines their age, then do some easy checks to see that each one is older than the last.

  Inspecting the Hacker News page, I can see that all the articles are in a table
  Each article has a title row and a subtext row. The title row has an index which appears to be serialized.
  I'll grab each article's ID and compare to make sure they appear in descending order.

  In the case that ID's are not dependably created in ascending order, the solution is close to the same, 
  but the element to analyze would be the <span class="age"> and its value would need to be converted to a date object for comparison.

  The page only displays 30 rows at a time. This makes sense why it is part of the application assignment haha 
  I'll have to use playwright to grab these rows and store them 30 at a time, then click more and do the next set until I get to 100.

  Element handles are no longer valid if the page reloads so I have to save the id's before trying to grab the next set.
*/

const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  const articles = [];
  const ids = [];

  // Grab rows 1-30
  articles.push(... await page.locator(".athing").elementHandles() );
  for (i = 0; i < articles.length; i++) {
    const article = articles[i];
    const thisID = await article.getAttribute("id");
    ids.push(thisID);
  }
  articles.length = 0;
  console.log("We have", ids.length, "ID's");
  console.log("We have", articles.length, "Articles");
  console.log("Here's an example ID:", ids[0]);

  // Press "More"
  await page.locator(".morelink").click();

  // Grab rows 31-60

  // console.log(articles.length);
  // console.log(articles[0] == articles[30]);

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
  }

}

(async () => {
  await sortHackerNewsArticles();
})();
