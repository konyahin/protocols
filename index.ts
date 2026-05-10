import { readdir } from "node:fs/promises";
import path from "node:path";
import { title } from "node:process";

type Protocol = {
    readonly title: string;
    readonly url: string;
};

type HomePage = {
    readonly protocols: readonly Protocol[];
};

const protocolsFiles = await readdir("./protocols");

const protocols: readonly Protocol[] = protocolsFiles.map((file) => ({
    title: path.parse(file).name,
    url: `${title}.html`,
}));

const homePage: HomePage = { protocols };

console.log(homePage);