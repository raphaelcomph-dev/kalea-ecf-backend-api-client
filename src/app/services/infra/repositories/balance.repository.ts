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
                customerBalance: { ecfFileProcessInfo: true },
            },
        });
    }

    async deleteBalanceAndIndicatorsByFileInfoId(ecfInfoId: number): Promise<void> {
        const customerBalance = await this.customerBalanceModelTypeormRepository.findOneBy({
            ecfFileProcessInfo: { id: ecfInfoId },
        });
        if (customerBalance) {
            const customerBalanceId = customerBalance.id;
            await this.customerBalanceModelTypeormRepository.delete({ id: customerBalanceId });
            await this.balanceIndicatorModelTypeormRepository.delete({ customerBalance: { id: customerBalanceId } });
        }
    }
}
