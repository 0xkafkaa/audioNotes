import { Builder, Browser, By, until, WebDriver } from "selenium-webdriver";
import dotenv from "dotenv";
import { Options } from "selenium-webdriver/chrome";
import robot from "robotjs";
dotenv.config();

async function getDriver() {
  const options = new Options({});
  options.addArguments("use-fake-ui-for-media-stream");
  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();
  return driver;
}

async function joinZoom(driver: WebDriver, url: string) {
  try {
    await driver.get(url);
    robot.keyTap("escape");
    await driver
      .findElement(By.xpath("//a[contains(text(), 'Join from your browser')]"))
      .click();
    await driver.wait(until.elementLocated(By.id("webclient")), 5000);
    await driver.switchTo().frame("webclient");
    const input = await driver.wait(
      until.elementLocated(By.id("input-for-name")),
      5000
    );
    await input.sendKeys("Bot");
    await driver.findElement(By.className("preview-join-button")).click(); // preview-join-btn
    await driver.switchTo().defaultContent();
  } catch (e) {
    console.log(e);
  }
}

// (async function example() {
//   const options = new Options({});
//   // options.addArguments("--disable-notifications"); // Disable notifications
//   // options.addArguments("--disable-blink-features=AutomationControlled");
//   // options.addArguments("--use-fake-ui-for-media-stream");
//   // options.addArguments("--window-size=1080,720");
//   options.addArguments("use-fake-ui-for-media-stream");
//   let driver = await new Builder()
//     .forBrowser(Browser.CHROME)
//     .setChromeOptions(options)
//     .build();
//   try {
//     await driver.get(
//       "https://us05web.zoom.us/j/6258544449?pwd=rNmx3zXpbipXDoLSTLJbbkv4Ame3bG.1"
//     );
//     await robot.keyTap("escape");
//     await driver
//       .findElement(By.xpath("//a[contains(text(), 'Join from your browser')]"))
//       .click();
//     await driver.wait(until.elementLocated(By.id("webclient")), 5000);
//     await driver.switchTo().frame("webclient");
//     const input = await driver.wait(
//       until.elementLocated(By.id("input-for-name")),
//       5000
//     );
//     await input.sendKeys("Bot");
//     await driver.findElement(By.className("preview-join-button")).click(); // preview-join-btn
//     await driver.switchTo().defaultContent();
//     await driver.sleep(1000000);
//   } finally {
//     await driver.quit();
//   }
// })();

async function main() {
  // get driver configs
  const driver = await getDriver();
  // connect the user to zoom
  await joinZoom(driver, process.env.URL as string);
}

main();
