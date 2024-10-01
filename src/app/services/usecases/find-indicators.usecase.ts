import { NotFoundException } from "@nestjs/common";
import { EcfIndicatorsOutputDto } from "../../api/rest/dtos/output/ecf-indicators.output.dto";
import { BalanceRepository } from "../infra/repositories/balance.repository";
import { EcfProcessInfoRepository } from "../infra/repositories/ecf-processing-info.repository";
import { Formatter } from "../../shared/utils/formatter";
import { BalanceIndicatorModel } from "../models/balance-indicator.model";

export class FindIndicatorsUseCase {
    constructor(
        private readonly balanceRepository: BalanceRepository,
        private readonly ecfProcessInfoRepository: EcfProcessInfoRepository,
    ) {}

    async findByEcfProcessingInfoId(ecfInfoId: number): Promise<EcfIndicatorsOutputDto> {
        const balance = await this.balanceRepository.findByEcfInfoId(ecfInfoId);
        console.log("Balance", balance);

        if (!balance) {
            throw new NotFoundException("Não foi encontrado os indicadores do ecf informado");
        }

        const response: EcfIndicatorsOutputDto = this.mapBalanceToDto(balance);

        return response;
    }

    async findByCnpj(cnpj: string): Promise<EcfIndicatorsOutputDto[]> {
        const ecfsInfo = await this.ecfProcessInfoRepository.findByCnpj(Formatter.formatDocument(cnpj, "CNPJ"));

        if (!ecfsInfo?.length) {
            throw new NotFoundException("Não foi encontrado arquivos para o CNPJ informado");
        }

        const ecfInfoIds = ecfsInfo.map((ecf) => ecf.id);

        const balances = await this.balanceRepository.findByEcfInfoIds(ecfInfoIds);

        if (!balances?.length) {
            throw new NotFoundException("Não foi encontrado indicadores para o CNPJ informado");
        }

        const indicators = balances
            .sort((a, b) => b.customerBalance.year - a.customerBalance.year)
            .slice(0, 3)
            .map((balance) => {
                return this.mapBalanceToDto(balance);
            });
        return indicators;
    }

    private mapBalanceToDto(balance: BalanceIndicatorModel): EcfIndicatorsOutputDto {
        return {
            cnpj: balance.customerBalance.ecfFileProcessInfo.cnpj,
            fileName: balance.customerBalance.ecfFileProcessInfo.fileName,
            year: balance.customerBalance.year,
            ativoTotal: balance.ativoTotal,
            patrimonioLiquido: balance.patrimonioLiquido,
            dividasBancariasLiquida: balance.dividasBancariasLiquida,
            receitaOperacionalBruta: balance.receitaOperacionalBruta,
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
    }
}
