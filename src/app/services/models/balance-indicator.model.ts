import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseModel } from "../../shared/models/base.model";
import { CustomerBalanceModel } from "./customer-balance.model";

@Entity("BalanceIndicator")
export class BalanceIndicatorModel extends BaseModel {
    @OneToOne(() => CustomerBalanceModel)
    @JoinColumn({ name: "CustomerBalanceId" })
    customerBalance: CustomerBalanceModel;

    @Column({ name: "AtivoTotal", type: "decimal" })
    ativoTotal: number;

    @Column({ name: "PatrimonioLiquido", type: "decimal" })
    patrimonioLiquido: number;

    @Column({ name: "DividasBancariasLiquida", type: "decimal" })
    dividasBancariasLiquida: number;

    @Column({ name: "ReceitaOperacionalLiquida", type: "decimal" })
    receitaOperacionalLiquida: number;

    @Column({ name: "LucroOperacional", type: "decimal" })
    lucroOperacional: number;

    @Column({ name: "LucroLiquido", type: "decimal" })
    lucroLiquido: number;

    @Column({ name: "EBITDA", type: "decimal" })
    ebitda: number;

    @Column({ name: "Autogeracao", type: "decimal" })
    autogeracao: number;

    @Column({ name: "SaldoFinalDeDisponibilidades", type: "decimal" })
    saldoFinalDeDisponibilidades: number;

    @Column({ name: "EndividamentoGeral", type: "decimal" })
    endividamentoGeral: number;

    @Column({ name: "EndividamentoFinanceiro", type: "decimal" })
    endividamentoFinanceiro: number;

    @Column({ name: "EndividamentoCurtoPrazo", type: "decimal" })
    endividamentoCurtoPrazo: number;

    @Column({ name: "DBL_EBITDA", type: "decimal" })
    dblEbitda: number;

    @Column({ name: "CapacidadePagamentoJuros", type: "decimal" })
    capacidadePagamentoJuros: number;

    @Column({ name: "Autogeracao_NecessidadeDeCapitalDeGiro", type: "decimal" })
    autogeracaoNecessidadeDeCapitalDeGiro: number;

    @Column({ name: "GrauDeAlavancagem", type: "decimal" })
    grauDeAlavancagem: number;

    @Column({ name: "CoberturaDeFinanciamentos", type: "decimal" })
    coberturaDeFinanciamentos: number;

    @Column({ name: "LucratividadeBruta", type: "decimal" })
    lucratividadeBruta: number;

    @Column({ name: "LucratividadeOperacional", type: "decimal" })
    lucratividadeOperacional: number;

    @Column({ name: "LucratividadeLiquida", type: "decimal" })
    lucratividadeLiquida: number;

    @Column({ name: "EBITDA_ROL", type: "decimal" })
    ebitdaRol: number;

    @Column({ name: "RentabilidadePatrimonial", type: "decimal" })
    rentabilidadePatrimonial: number;

    @Column({ name: "RentabilidadeAtivo", type: "decimal" })
    rentabilidadeAtivo: number;

    @Column({ name: "PontoDeEqulíbrioOperacional", type: "decimal" })
    pontoDeEqulibrioOperacional: number;

    @Column({ name: "LiquidezGeral", type: "decimal" })
    liquidezGeral: number;

    @Column({ name: "LiquidezSeca", type: "decimal" })
    liquidezSeca: number;

    @Column({ name: "LiquidezCorrente", type: "decimal" })
    liquidezCorrente: number;

    @Column({ name: "CicloOperacional", type: "decimal" })
    cicloOperacional: number;

    @Column({ name: "CicloFinanceiro", type: "decimal" })
    cicloFinanceiro: number;

    @Column({ name: "NecessidadeDeCapitalDeGiro", type: "decimal" })
    necessidadeDeCapitalDeGiro: number;
}
