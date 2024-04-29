import { ApiProperty } from "@nestjs/swagger";

export class LoginOutputDto {
    @ApiProperty({
        example:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZGZlYWZiYy1lNjVmLTQzODQtOTY1Yi00NWIzYzY5YzZmZTEiLCJ0ZW5hbnRJZCI6ImViMDc1ZTEwLTk1YTAtNDNlZi1hMDNkLTg3OWUzMzE2YjkxMyIsIm5hbWUiOiJCcnVjZSBXYXluZSIsImVtYWlsIjoiYnJ1Y2Uud2F5bmVAd2F5bmVlbnRlcnByaXNlcy5jb20iLCJpYXQiOjE2OTY5Njk0NzQsImV4cCI6MTY5Njk3MTI3NH0.ruAPLNSmihpSAo1nTA-B3oyrAaGsju2zrxfrYBYb7V0",
    })
    accessToken: string;
    refreshToken: string;
}
