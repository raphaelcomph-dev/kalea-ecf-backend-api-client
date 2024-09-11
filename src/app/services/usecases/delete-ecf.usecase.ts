import { NotFoundException } from "@nestjs/common";
import { EcfProcessInfoRepository } from "../infra/repositories/ecf-processing-info.repository";
import { EcfFileRepository } from "../infra/repositories/ecf-file.repository";
import { BalanceRepository } from "../infra/repositories/balance.repository";

export class DeleteEcfUseCase {
    constructor(
        private readonly ecfFileRepository: EcfFileRepository,
        private readonly ecfFileProcessInfoRepository: EcfProcessInfoRepository,
        private readonly balanceRepository: BalanceRepository,
    ) {}

    async execute(ecfInfoId: number): Promise<void> {
        const ecfFileInfo = await this.ecfFileProcessInfoRepository.findByEcfInfoId(ecfInfoId);
        if (!ecfFileInfo) {
            throw new NotFoundException(`Arquivo com id ${ecfInfoId} não encontrado.`);
        }

        const ecfFileInfoId = ecfFileInfo.id;

        await this.ecfFileRepository.deleteByFileInfoId(ecfFileInfoId);
        await this.balanceRepository.deleteBalanceAndIndicatorsByFileInfoId(ecfInfoId);
        await this.ecfFileProcessInfoRepository.delete(ecfFileInfoId);
    }
}
