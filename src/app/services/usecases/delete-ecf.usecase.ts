import { NotFoundException } from "@nestjs/common";
import { EcfFileProcessInfoRepository } from "../infra/repositories/ecf-file-processing-info.repository";
import { EcfFileRepository } from "../infra/repositories/ecf-file.repository";

export class DeleteEcfUseCase {
    constructor(
        private readonly ecfFileRepository: EcfFileRepository,
        private readonly ecfFileProcessInfoRepository: EcfFileProcessInfoRepository,
    ) {}

    async execute(ecfInfoId: number): Promise<void> {
        const ecfFileInfo = await this.ecfFileProcessInfoRepository.findByEcfInfoId(ecfInfoId);
        if (!ecfFileInfo) {
            throw new NotFoundException(`Arquivo com id ${ecfInfoId} não encontrado.`);
        }

        const ecfFileInfoId = ecfFileInfo.id;

        await this.ecfFileRepository.deleteByFileInfoId(ecfFileInfoId);
        await this.ecfFileProcessInfoRepository.delete(ecfFileInfoId);

        // TODO: validar que ECF pertence ao usuário
    }
}
