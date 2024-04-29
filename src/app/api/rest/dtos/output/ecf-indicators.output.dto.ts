import { ApiProperty } from "@nestjs/swagger";

export class EcfIndicatorsOutputDto {
    @ApiProperty({ example: "06.711.013/0001-55" })
    cnpj: string;

    @ApiProperty({ example: "ECF 2017 Banco Santander.pdf" })
    fileName: string;

    @ApiProperty({ example: 2014 })
    year: number;

    @ApiProperty({ example: 201604369.34, format: "Moeda: BRL" })
    ativoTotal: number;

    @ApiProperty({ example: -42537019.58, format: "Moeda: BRL" })
    patrimonioLiquido: number;

    @ApiProperty({ example: 21298143.07, format: "Moeda: BRL" })
    dividasBancariasLiquida: number;

    @ApiProperty({ example: 291634847.49, format: "Moeda: BRL" })
    receitaOperacionalLiquida: number;

    @ApiProperty({ example: 33753698.4, format: "Moeda: BRL" })
    lucroOperacional: number;

    @ApiProperty({ example: 26522550.61, format: "Moeda: BRL" })
    lucroLiquido: number;

    @ApiProperty({ example: 34475435.32, format: "Moeda: BRL" })
    ebitda: number;

    @ApiProperty({ example: 26883419.07, format: "Moeda: BRL" })
    autogeracao: number;

    @ApiProperty({ example: 4320549.77, format: "Moeda: BRL" })
    saldoFinalDeDisponibilidades: number;

    @ApiProperty({ example: 119.95, format: "Porcentagem" })
    endividamentoGeral: number;

    @ApiProperty({ example: 4.81, format: "Porcentagem" })
    endividamentoFinanceiro: number;

    @ApiProperty({ example: 58.36, format: "Porcentagem" })
    endividamentoCurtoPrazo: number;

    @ApiProperty({ example: 28.45, format: "Porcentagem" })
    dblEbitda: number;

    @ApiProperty({ example: 2.89, format: "Número absoluto" })
    capacidadePagamentoJuros: number;

    @ApiProperty({ example: -0.31, format: "Número absoluto" })
    autogeracaoNecessidadeDeCapitalDeGiro: number;

    @ApiProperty({ example: -3.72, format: "Número absoluto" })
    grauDeAlavancagem: number;

    @ApiProperty({ example: 0.52, format: "Número absoluto" })
    coberturaDeFinanciamentos: number;

    @ApiProperty({ example: 38.88, format: "Porcentagem" })
    lucratividadeBruta: number;

    @ApiProperty({ example: 11.57, format: "Porcentagem" })
    lucratividadeOperacional: number;

    @ApiProperty({ example: 9.09, format: "Porcentagem" })
    lucratividadeLiquida: number;

    @ApiProperty({ example: 11.69, format: "Porcentagem" })
    ebitdaRol: number;

    @ApiProperty({ example: -62.35, format: "Porcentagem" })
    rentabilidadePatrimonial: number;

    @ApiProperty({ example: 16.74, format: "Porcentagem" })
    rentabilidadeAtivo: number;

    @ApiProperty({ example: 53.49, format: "Porcentagem" })
    pontoDeEqulibrioOperacional: number;

    @ApiProperty({ example: 0.63, format: "Número absoluto" })
    liquidezGeral: number;

    @ApiProperty({ example: 1.48, format: "Número absoluto" })
    liquidezSeca: number;

    @ApiProperty({ example: 2.71, format: "Número absoluto" })
    liquidezCorrente: number;

    @ApiProperty({ example: 185, format: "Número de dias" })
    cicloOperacional: number;

    @ApiProperty({ example: 149, format: "Número de dias" })
    cicloFinanceiro: number;

    @ApiProperty({ example: 80943871.01, format: "Moeda: BRL" })
    necessidadeDeCapitalDeGiro: number;
}
