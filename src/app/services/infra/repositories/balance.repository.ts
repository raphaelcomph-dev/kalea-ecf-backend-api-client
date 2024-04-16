import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BalanceIndicatorModel } from "../../models/balance-indicator.model";
import { CustomerBalanceModel } from "../../models/customer-balance.model";
import { Repository } from "typeorm";

@Injectable()
export class BalanceRepository {
    constructor(
        @InjectRepository(BalanceIndicatorModel)
        private readonly balanceIndicatorModelTypeormRepository: Repository<BalanceIndicatorModel>,
        @InjectRepository(CustomerBalanceModel)
        private readonly customerBalanceModelTypeormRepository: Repository<CustomerBalanceModel>,
    ) {}

    async findByEcfInfoId(ecfInfoId: number): Promise<BalanceIndicatorModel> {
        return await this.balanceIndicatorModelTypeormRepository.findOne({
            // TODO: corrigir pra colocar o customerId da sessão -> where: { customerBalance: { customer: {}, ecfFileProcessInfo: { id: ecfInfoId } } },
            where: { customerBalance: { ecfFileProcessInfo: { id: ecfInfoId } } },
            relations: {
                customerBalance: true,
            },
        });
    }
}
