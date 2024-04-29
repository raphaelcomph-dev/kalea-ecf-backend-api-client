import { ApiProperty } from "@nestjs/swagger";

export class ApiErrorOutputDto {
    @ApiProperty({
        description:
            "Descrição do(s) erro(s). Pode vir como uma única string com um erro ou como uma lista de string com vários erros",
        example: "Já existe um usuário com este email ou telefone cadastrado",
    })
    message: string | string[];
    @ApiProperty({ description: "Nome do erro HTTP", example: "Unprocessable Entity" })
    error: string;
    @ApiProperty({ description: "Código do erro HTTP.", example: 422, examples: [400, 500, 503] })
    statusCode: number;
}
