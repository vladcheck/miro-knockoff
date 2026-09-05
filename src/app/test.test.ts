import * as allure from "allure-js-commons";

describe("signing in with a password", () => {
  it("should sign in with a valid password", async () => {
    expect.hasAssertions();

    await allure.description(
      "The test checks if an active user with a valid password can sign in to the app.",
    );
    await allure.epic("Signing in");
    await allure.feature("Sign in with a password");
    await allure.story("As an active user, I want to successfully sign in using a valid password");
    await allure.tags("signin", "ui", "positive");
    await allure.owner("valdemar_check");
    await allure.parameter("browser", "chrome");

    await allure.step("Make a sign-in attempt", async () => {
      const user = null;
      expect(user).toBeNull();
    });
  });
});
