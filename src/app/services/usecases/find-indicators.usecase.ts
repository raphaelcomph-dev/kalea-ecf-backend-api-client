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

        // TODO: incluir mês e ano do CustomerBalance

        const response: EcfIndicatorsOutputDto = {
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
            pontoDeEqulíbrioOperacional: balance.pontoDeEqulíbrioOperacional,
            liquidezGeral: balance.liquidezGeral,
            liquidezSeca: balance.liquidezSeca,
            liquidezCorrente: balance.liquidezCorrente,
            cicloOperacional: balance.cicloOperacional,
            cicloFinanceiro: balance.cicloFinanceiro,
            necessidadeDeCapitalDeGiro: balance.necessidadeDeCapitalDeGiro,
        };

        return response;
    }
}
