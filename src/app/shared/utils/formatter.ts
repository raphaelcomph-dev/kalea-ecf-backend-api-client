export class Formatter {
    static formatDocument(value: string, format: "CNPJ" | "CPF"): string {
        if (value != null && value != undefined) {
            if (format == "CNPJ") {
                return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, `$1.$2.$3/$4-$5`);
            } else if (format == "CPF") {
                return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, `$1.$2.$3-$4`);
            }
        }
        return `-`;
    }
}
