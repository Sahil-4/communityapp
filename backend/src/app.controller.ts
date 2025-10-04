import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("root")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: "Get hello world",
  })
  @ApiResponse({
    status: 200,
    description: "Get hello world",
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({
    summary: "Get bye world",
  })
  @ApiResponse({
    status: 200,
    description: "Get bye world",
  })
  @Get("bye")
  getBye(): string {
    // return 'bye'; // !SRP
    return this.appService.getBye();
  }
}
