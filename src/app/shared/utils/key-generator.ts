import { randomInt } from "crypto";
import { CryptoWordList } from "./crypto-word-list";

export class KeyGenerator {
    public static generateHexDecKey(length: number, splitLength?: number, separator: string = "-"): string {
        const characters = "0123456789abcdef";
        const result = Array.from({ length }, () =>
            characters.charAt(Math.floor(Math.random() * characters.length)),
        ).join("");

        return splitLength && splitLength > 0 && splitLength < length
            ? result.match(new RegExp(`.{1,${splitLength}}`, "g")).join(separator)
            : result;
    }

    public static generateAphanumericKey(length: number = 24): string {
        var text = "";
        var possibilities = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++) {
            text += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
        }

        return text;
    }

    public static generateCryptoBasedPassword(): string {
        const wordQty = 2;
        const separators = ["-", "_", "&", "*", "#", ".", "@"];
        const separator = separators[randomInt(0, separators.length - 1)];
        const number = randomInt(100, 999);

        let password = "";
        for (let i = 0; i < wordQty; i++) {
            const wordIndex = Number.randomInt(0, CryptoWordList.WORDS.length - 1);
            const word = CryptoWordList.WORDS[wordIndex];
            password += word.changeCase("capitalize") + separator;
        }
        password += number;

        return password;
    }
}
