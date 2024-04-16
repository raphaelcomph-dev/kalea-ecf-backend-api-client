import { Controller, Get, Logger, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { EcfService } from "../../services/ecf.service";
import { EcfListItemOutputDto } from "./dtos/output/ecf-list-item.output.dto";
import { EcfIndicatorsOutputDto as EcfIndicatorsOutputDto } from "./dtos/output/ecf-indicators.output.dto";

@Controller("ecf")
export class EcfController {
    private readonly logger = new Logger(EcfController.name);

    constructor(private readonly ecfService: EcfService) {}

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
        // TODO: Implementar esse método
        this.logger.log(`recebendo requisição p/ buscar os indicadores do ecf: ${fileInfoId}`);
        return this.ecfService.findIndicatorsByEcfInfoId(fileInfoId);
    }
}
