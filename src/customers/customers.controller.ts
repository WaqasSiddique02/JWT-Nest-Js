import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt.authguard';

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

    @Post()
    @ApiBody({
        description: 'Add a new customer',
        type: String,
      })
    create(@Body() customer:{firstname:string,lastname:string,dob:string}): Promise<any>{
        return this.customersService.create(customer);
    }

    @Put(":id")
    @ApiBody({
        description: 'Update a customer',
        type: String,
    })
    Update(@Param('id') id:number,@Body()customer:{firstname:string,lastname:string,dob:string}){
        return this.customersService.update(id,customer);
    }

    @Delete(":id")
    Delete(@Param('id') id:number){
        return this.customersService.delete(id);
    }
}
