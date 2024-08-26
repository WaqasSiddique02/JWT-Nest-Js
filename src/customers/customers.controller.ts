import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt.authguard';
import { CustomerDto } from './dto/customers.dto';

@Controller('customers')
@ApiTags("Customer")
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

@Post('auth/login')
@ApiBody({
    description: 'Generate Jwt token',
    type: String,
})
  async login(@Body() body) {
    const user = await this.customersService.validateUser(body.username, body.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.customersService.login(user);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
    @Get()
    findAll(){
        return this.customersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    @ApiBody({
        description: 'Add a new customer',
        type: String,
      })
    create(@Body() customer:CustomerDto): Promise<any>{
        return this.customersService.create(customer);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(":id")
    @ApiBody({
        description: 'Update a customer',
        type: String,
    })
    Update(@Param('id',ParseIntPipe) id:number,@Body()customer:CustomerDto): Promise<any>{
        return this.customersService.update(id,customer);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(":id")
    Delete(@Param('id',ParseIntPipe) id:number): Promise<any>{
        return this.customersService.delete(id);
    }
}