import { NotFoundException } from "@nestjs/common";
import { EcfFileProcessInfoRepository } from "../infra/repositories/ecf-file-processing-info.repository";
import { EcfFileRepository } from "../infra/repositories/ecf-file.repository";
import { BalanceRepository } from "../infra/repositories/balance.repository";

export class DeleteEcfUseCase {
    constructor(
        private readonly ecfFileRepository: EcfFileRepository,
        private readonly ecfFileProcessInfoRepository: EcfFileProcessInfoRepository,
        private readonly balanceRepository: BalanceRepository,
    ) {}

    async execute(ecfInfoId: number): Promise<void> {
        const ecfFileInfo = await this.ecfFileProcessInfoRepository.findByEcfInfoId(ecfInfoId);
        if (!ecfFileInfo) {
            throw new NotFoundException(`Arquivo com id ${ecfInfoId} não encontrado.`);
        }

        const ecfFileInfoId = ecfFileInfo.id;

        await this.ecfFileRepository.deleteByFileInfoId(ecfFileInfoId);
        await this.ecfFileProcessInfoRepository.delete(ecfFileInfoId);
        await this.balanceRepository.deleteBalanceAndIndicatorsByFileInfoId(ecfInfoId);

        // TODO: validar que ECF pertence ao usuário
    }
}
