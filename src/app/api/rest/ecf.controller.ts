import { Controller, Delete, Get, Logger, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { EcfService } from "../../services/ecf.service";
import { EcfListItemOutputDto } from "./dtos/output/ecf-list-item.output.dto";
import { EcfIndicatorsOutputDto as EcfIndicatorsOutputDto } from "./dtos/output/ecf-indicators.output.dto";

@Controller("ecf")
export class EcfController {
    private readonly logger = new Logger(EcfController.name);

    constructor(private readonly ecfService: EcfService) {}

    // TODO: colocar um GUARD em todos os endpoints não públicos. Não posso deixar acessar se não informar o accessToken

    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        this.logger.log(`recebendo requisição upload do ecf: ${file.filename}, ${file.size}, ${file.mimetype}`);
        this.ecfService.uploadEcfFile(file);
    }

    @Get()
    findAll(): Promise<EcfListItemOutputDto[]> {
        this.logger.log(`recebendo requisição p/ listar todos os ecf's`);
        return this.ecfService.findAll();
    }

    @Get("indicators/:fileInfoId")
    findEcfIndicators(@Param("fileInfoId") fileInfoId: number): Promise<EcfIndicatorsOutputDto> {
        this.logger.log(`recebendo requisição p/ buscar os indicadores do ecf: ${fileInfoId}`);
        return this.ecfService.findIndicatorsByEcfInfoId(fileInfoId);
    }

    @Delete(":fileInfoId")
    deleteEcf(@Param("fileInfoId") fileInfoId: number): Promise<void> {
        this.logger.log(`recebendo requisição p/ excluir ecf: ${fileInfoId}`);
        return this.ecfService.delete(fileInfoId);
    }
}
