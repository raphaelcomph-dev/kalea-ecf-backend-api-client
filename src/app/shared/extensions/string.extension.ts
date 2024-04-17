import * as crypto from "crypto";

declare global {
    interface String {
        changeCase(caseName: "name" | "title" | "camelCase" | "constant" | "capitalize"): string;
    }
}

String.prototype.changeCase = function (caseName: "name" | "title" | "camelCase" | "constant" | "capitalize"): string {
    switch (caseName) {
        case "name":
            return this.replace(/\w\S*/g, (txt) =>
                txt
                    .trim()
                    .replace(/\s+/g, " ")
                    .split(" ")
                    .map((word, index) => {
                        if (word) {
                            if (
                                word.toLowerCase() === "e" ||
                                word.toLowerCase() === "de" ||
                                word.toLowerCase() === "da" ||
                                word.toLowerCase() === "das" ||
                                word.toLowerCase() === "do" ||
                                word.toLowerCase() === "dos"
                            ) {
                                return word.toLowerCase();
                            }
                            return word[0].toUpperCase().concat(word.slice(1).toLowerCase());
                        }
                        return "";
                    })
                    .join(" "),
            );
        case "title":
            return this.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        case "camelCase":
            return this.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
                index === 0 ? word.toLowerCase() : word.toUpperCase(),
            ).replace(/\s+/g, "");
        case "constant":
            return this.replace(/\s+/g, "_").toUpperCase();
        case "capitalize":
            return this.charAt(0).toUpperCase() + this.slice(1);
        default:
            throw new Error("Invalid case name.");
    }
};

export {};
