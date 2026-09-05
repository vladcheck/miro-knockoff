import { RuleTester } from "eslint";
import { describe, it } from "vite-plus/test";
import boundariesPlugin, { createErrorMessage } from "./boundaries";

RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      lang: "ts",
    },
  },
});

ruleTester.run("boundaries", boundariesPlugin as any, {
  valid: [
    {
      name: "Should allow import from same layer",
      code: "import foo from '@/app/pages/catalog/page.ts';",
      filename: "/src/app/pages/routes.ts",
    },
  ],
  invalid: [
    {
      name: "Should not allow to import app from shared",
      code: `import { page } from @/app/pages/page.ts;`,
      filename: "src/shared/shared.ts",
      errors: [
        {
          message: createErrorMessage("shared", "app"),
        },
      ],
    },
  ],
});
