import { ApiProperty } from "@nestjs/swagger";

export class EcfListItemOutputDto {
    @ApiProperty({ example: "456" })
    id: number;

    @ApiProperty({ example: "ECF 2017 Banco Santander.pdf" })
    fileName: string;

    @ApiProperty({
        example: "2024-04-25T13:01:47.585Z",
        description: "Data em que se iniciou o processamento do arquivo.",
    })
    fileDate: Date;

    @ApiProperty({
        example: "06.711.013/0001-55",
        nullable: true,
    })
    cnpj: string;

    @ApiProperty({
        example: "3",
        description: "Status do processamento do arquivo.",
        examples: {
            "0": "Na fila",
            "1": "Em processamento",
            "2": "Erro",
            "3": "Concluido",
            "4": "Erro",
        },
    })
    status: number;
}
