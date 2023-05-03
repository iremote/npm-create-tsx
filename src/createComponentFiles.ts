import fs from "fs";
import path from "path";

/**
 * Copyright (c) iRemote, Inc.
 *
 * Creates new component and its infrastructure files (tests, storybook, etc.).
 * Uses file-template folder as a source of templates.
 * You may use `--dry-run` flag to see what files will be created without actually creating them.
 *
 * @author Ramesh Doddi.
 */
export function createComponentFiles() {

	const componentPathArg = process.argv[2];
	const dryRun = process.argv.includes("--dry-run");

	if (!componentPathArg) {
		console.error("Please provide a component path");
		// @ts-ignore
		process.exit(1);
	}

	const componentName = path.basename(componentPathArg);
	const folderSubPath = path.dirname(componentPathArg).replace(/^src\//, "");
	const templatesDir = path.resolve(__dirname, "file-templates");
	const componentDir = path.resolve(process.cwd(), "src", folderSubPath, componentName);

	const filesToCreate = [
		{ template: "component.tsx.template", output: `${componentName}.tsx` },
		{ template: "test.tsx.template", output: `${componentName}.test.tsx` },
		{ template: "storybook.tsx.template", output: `${componentName}.stories.tsx` },
		{ template: "index.ts.template", output: "index.ts" },
		{ template: "types.ts.template", output: "types.ts" },
	];

	const replaceTokens = (content: string, tokens: Record<string, string>): string =>
		Object.entries(tokens).reduce(
			(acc, [key, value]) => acc.replace(new RegExp(`__${key}__`, "g"), value),
			content
		);

	console.log(`Dry Run: Creating component '${componentName}' with the following files:`);
	filesToCreate.forEach(({ output }) => console.log(`- ${output}`));

	if (!dryRun) {
		if (!fs.existsSync(componentDir)) fs.mkdirSync(componentDir, { recursive: true });

		filesToCreate.forEach(({ template, output }) => {
			const [templatePath, outputPath] = [
				path.join(templatesDir, template),
				path.join(componentDir, output),
			];

			const replacedContent = replaceTokens(fs.readFileSync(templatePath, "utf-8"), {
				COMPONENT_NAME: componentName,
			});

			fs.writeFileSync(outputPath, replacedContent, "utf-8");
		});

		console.log(`\nComponent ${componentName} created successfully.`);
	}
}
