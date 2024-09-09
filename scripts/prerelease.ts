import { EOL } from "node:os";

interface Manifest {
    name: string;
    version: string;
}

const jsr = Bun.file("./jsr.json", { type: "application/json" });
const pkg = Bun.file("./package.json", { type: "application/json" });
const pkgContent: Manifest = await pkg.json();

await Bun.write(
    jsr,
    `${JSON.stringify(
        {
            name: pkgContent.name,
            version: pkgContent.version,
            license: pkgContent.license,
            exports: "./src/index.ts",
        },
        null,
        2
    )}${EOL}`
);
