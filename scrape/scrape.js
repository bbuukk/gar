import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

import { randomUserAgent } from "./randomUserAgent.js";
import { readJson, readTxtLinesToArray } from "./utils/readFile.js";
import { writeToFile } from "./utils/writeToFile.js";


export async function init(startUrl) {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,    
    executablePath: "/usr/bin/google-chrome-stable",
    userDataDir: "~/.config/google-chrome/Default"
  });

  const page = await browser.newPage();
  await page.setUserAgent(randomUserAgent);
  await page.goto(startUrl, {
    waitUntil: "domcontentloaded",
  });

  await page.setCacheEnabled(false);

  return { browser, page };
}

export async function scrapeSearch(browser, page, words) {
  const allWordsInfo = [];
  for (const word of words) {
    await page.setUserAgent(randomUserAgent);
    const url = `https://www.linguee.com/englishString-german/search?source=german&query=${word}`;
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    const fullWordInfo = { word: word, preposition: null, translations: [] };

    fullWordInfo.preposition = await getPreposition(page);
    fullWordInfo.translations = await getTranslations(page);

    allWordsInfo.push(fullWordInfo);
  }  

  browser.close();
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
  let translations = [];
  try {
    const translationContainers = await page.$$("div.translation.sortablemg.featured");  
    for (const translation of translationContainers) {
      const tag_trans = await translation.$(
        "h3.translation_desc span.tag_trans"
      );
      
      const wordHandler = await tag_trans.$("a.dictLink.featured");
      const word = await wordHandler.evaluate((el) => el.textContent);

      const prepositionHandler = await tag_trans.$("span.tag_type");
      const preposition = await prepositionHandler.evaluate((el) => el.textContent);  

      const examplesHandlers = await translation.$$(
        "div.example_lines div.example.line span.tag_e"
      );

      const examples = []
      for (const example of examplesHandlers) {
        const germanStringHandler = await example.$("span.tag_s");
        const germanString = await germanStringHandler.evaluate((el) => el.textContent,);

        const englishStringHandler = await example.$("span.tag_t");
        const englishString = await englishStringHandler.evaluate((el) => el.textContent,);

        examples.push({ger: germanString, eng: englishString})
      }

      translations.push({word, preposition, examples})    
    }
        
  } catch (e) {
    console.log("Translation is not found");
  }
  return translations;
}

const { browser, page } = await init("https://www.linguee.com/");
const words = await readTxtLinesToArray("words/a1.txt");
const  allWordsInfo  = await scrapeSearch(browser, page, words);
writeToFile(JSON.stringify(allWordsInfo, null,2),"data/a1.json")

