/*
  index.js

  QA Wolf Take Home Job Application Assignment.
  This script opens a chromium browser and goes to Hacker News.

  My objective is to make sure that the 100 entries that pop up on the page are indeed sorted from newest to oldest.
  I'll need to access the elements on the page and whatever attribute determines their age, then do some easy checks to see that each one is older than the last.

  Inspecting the Hacker News page, I can see that all the articles are in a table
  Each article has a title row and a subtext row. The title row has an index which appears to be serialized.
  I'll grab each article's ID and compare to make sure they appear in descending order.

  The page only displays 30 rows at a time. This makes sense why it is part of the application assignment haha 
  I'll have to use playwright to grab these rows and store them 30 at a time, then click more and do the next set until I get to 100.
*/

const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  const articles = []
  // Grab 30 rows
  const thisSet = await page.locator(".athing").elementHandles();
  articles.push(...thisSet);

  console.log(articles.length);

  for (let i = 0; i < 30; i++) {
    const article = articles[i];
  }

}

(async () => {
  await sortHackerNewsArticles();
})();
