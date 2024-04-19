import { NotFoundException } from "@nestjs/common";
import { EcfIndicatorsOutputDto } from "../../api/rest/dtos/output/ecf-indicators.output.dto";
import { BalanceRepository } from "../infra/repositories/balance.repository";

export class FindIndicatorsUseCase {
    constructor(private readonly ecfFileRepository: BalanceRepository) {}

    async execute(ecfInfoId: number): Promise<EcfIndicatorsOutputDto> {
        const balance = await this.ecfFileRepository.findByEcfInfoId(ecfInfoId);
        console.log("Balance", balance);

        if (!balance) {
            throw new NotFoundException("Não foi encontrado os indicadores do ecf informado");
        }

        const response: EcfIndicatorsOutputDto = {
            year: balance.customerBalance.year,
            ativoTotal: balance.ativoTotal,
            patrimonioLiquido: balance.patrimonioLiquido,
            dividasBancariasLiquida: balance.dividasBancariasLiquida,
            receitaOperacionalLiquida: balance.receitaOperacionalLiquida,
            lucroOperacional: balance.lucroOperacional,
            lucroLiquido: balance.lucroLiquido,
            ebitda: balance.ebitda,
            autogeracao: balance.autogeracao,
            saldoFinalDeDisponibilidades: balance.saldoFinalDeDisponibilidades,
            endividamentoGeral: balance.endividamentoGeral,
            endividamentoFinanceiro: balance.endividamentoFinanceiro,
            endividamentoCurtoPrazo: balance.endividamentoCurtoPrazo,
            dblEbitda: balance.dblEbitda,
            capacidadePagamentoJuros: balance.capacidadePagamentoJuros,
            autogeracaoNecessidadeDeCapitalDeGiro: balance.autogeracaoNecessidadeDeCapitalDeGiro,
            grauDeAlavancagem: balance.grauDeAlavancagem,
            coberturaDeFinanciamentos: balance.coberturaDeFinanciamentos,
            lucratividadeBruta: balance.lucratividadeBruta,
            lucratividadeOperacional: balance.lucratividadeOperacional,
            lucratividadeLiquida: balance.lucratividadeLiquida,
            ebitdaRol: balance.ebitdaRol,
            rentabilidadePatrimonial: balance.rentabilidadePatrimonial,
            rentabilidadeAtivo: balance.rentabilidadeAtivo,
            pontoDeEqulibrioOperacional: balance.pontoDeEqulibrioOperacional,
            liquidezGeral: balance.liquidezGeral,
            liquidezSeca: balance.liquidezSeca,
            liquidezCorrente: balance.liquidezCorrente,
            cicloOperacional: Math.ceil(balance.cicloOperacional),
            cicloFinanceiro: Math.ceil(balance.cicloFinanceiro),
            necessidadeDeCapitalDeGiro: balance.necessidadeDeCapitalDeGiro,
        };

        return response;
    }
}
