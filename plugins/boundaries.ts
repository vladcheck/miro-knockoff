// oxlint-disable one-var
import { eslintCompatPlugin } from "@oxlint/plugins";
import type { Rule } from "eslint";

const LAYER_RULES: Record<string, string[]> = {
  shared: ["features", "app"],
  features: ["app"],
};
const layers = new Set(Object.keys(LAYER_RULES));

const rule: Rule.RuleModule = {
  create(ctx) {
    const filename = ctx.filename;

    return {
      ImportDeclaration(node) {
        let layer: string = "";

        if (filename.includes("/src/shared")) {
          layer = "shared";
        } else if (filename.includes("/src/features")) {
          layer = "features";
        } else if (filename.includes("/src/app")) {
          layer = "app";
        }

        if (maySkip(layer)) {
          return;
        }

        const sourcePath = node.source.value!.toString();
        const prohibitedImportLayers: string[] = LAYER_RULES[layer];

        for (const prohibited of prohibitedImportLayers) {
          if (sourcePath.startsWith(`@/${prohibited}`)) {
            ctx.report({
              node,
              message: createErrorMessage(layer, prohibited),
            });
          }
        }
      },
    };
  },
};

function maySkip(layer: string) {
  return (
    layer === "" || // unknown
    !layers.has(layer) || // unknown
    !LAYER_RULES[layer] || // undefined
    LAYER_RULES[layer].length === 0 // no prohibitions
  );
}

export function createErrorMessage(target: string, prohibited: string) {
  return `${target} layer can't import from ${prohibited} layer`;
}

const boundariesPlugin = eslintCompatPlugin({
  meta: {
    name: "homebrew",
    type: "suggestion",
    schema: [],
  },
  rules: {
    boundaries: rule,
  },
  files: ["src/**/*.tsx?", "!src/**/*.{spec,test}.tsx?"],
} as any);

export default boundariesPlugin;
