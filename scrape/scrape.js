import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

import { randomUserAgent } from "../globals/randomUserAgent.js";
import { readJson, readTxtLinesToArray } from "./utils/readFile.js";

export async function init(startUrl) {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    userDataDir: "./tmp",
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    userDataDir: "C:/Users/bohda/AppData/Local/Google/Chrome/User Data/Default",
  });

  const page = await browser.newPage();
  await page.setUserAgent(randomUserAgent);
  await page.goto(startUrl, {
    waitUntil: "domcontentloaded",
  });

  await page.setCacheEnabled(false);

  return { browser, page };
}

export async function scrapeSearch(page, words) {
  const allWordsInfo = [];
  for (const word of words) {
    await page.setUserAgent(randomUserAgent);
    const url = `https://www.linguee.com/english-german/search?source=german&query=${word}`;
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    const FullWordInfo = { word: null, prep: null, tranlations: [] };

    FullWordInfo.price = await getPreposition(page);
    FullWordInfo.name = await getTranslations(page);

    allWordsInfo.push(FullWordInfo);
  }

  return allWordsInfo;
}

export async function getPreposition(page) {
  let preposition = "";
  try {
    const prepositionHandler = await page.$("span.tag_lemma span.tag_wordtype");
    preposition = await page.evaluate(
      (el) => el.textContent,
      prepositionHandler
    );
  } catch (e) {
    console.log("Preposition is not found");
  }
  return preposition;
}

export async function getTranslations(page) {
  let preposition = "";
  let preposition = "";
  try {
    const translation = await page.$("div.translation.sortablemg.featured");
    const tag_trans = await translation.$(
      "h3.translation_desc span.tag_trans "
    );
    const wordHandler = await tag_trans.$("a.dictLink.featured");
    const prepositionHandler = await tag_trans.$("span.tag_type");

    word = await tag_trans.evaluate(
      (el) => el.textContent,
      "a.dictLink.featured"
    );
    preposition = await page.evaluate(
      (el) => el.textContent,
      prepositionHandler
    );
  } catch (e) {
    console.log("Preposition is not found");
  }
  return preposition;
}

const { browser, page } = init("https://www.linguee.com/");
const words = readTxtLinesToArray("words/a1.txt");
const { products } = scrapeSearch(page, words);
