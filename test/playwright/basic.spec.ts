import basicSetup from "../wallet-setup/basic.setup";
import { testWithSynpress } from "@synthetixio/synpress";
import { MetaMask, metaMaskFixtures } from "@synthetixio/synpress/playwright";

const test = testWithSynpress(metaMaskFixtures(basicSetup));
const { expect } = test;

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/tsSenderUI/);
});

test("should show the airdrop form when connected, otherwise not", async ({
  page,
  context,
  metamaskPage,
  extensionId,
}) => {
  await page.goto("/");
  await expect(
    page.getByText(
      "Please connect your wallet to use the TSender Airdrop Tool."
    )
  ).toBeVisible();

  const metamask = new MetaMask(
    context,
    metamaskPage,
    basicSetup.walletPassword,
    extensionId
  );

  await page.getByTestId("rk-connect-button").click();
  await page
    .getByTestId("rk-wallet-option-io.metamask")
    .waitFor({ state: "visible", timeout: 30000 });

  await page.getByTestId("rk-wallet-option-io.metamask").click();
  await metamask.connectToDapp();

  const customNetowrk = { name: "Anvil", rpcUrl: "http://localhost:8545" };

  await expect(page.getByText("Token Address")).toBeVisible();
});
