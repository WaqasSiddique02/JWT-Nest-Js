import { Body, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'typeorm';

@Injectable()
export class CustomersService {
    constructor(private readonly connection:Connection,private readonly jwtService: JwtService){}

    async validateUser(username: string, pass: string): Promise<any> {
        // Replace with your user validation logic
        const user = { userId: 1, username: 'test', password: 'password' };
        
        if (user && pass === user.password) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    
      async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    
    async findAll(){
        return await this.connection.query(`SELECT * FROM customers`);
    }

    async create(customer:{firstname:string,lastname:string,dob:string}){
        await this.connection.query(`INSERT INTO Customers (FirstName,LastName,DateOfBirth) values ('${customer.firstname}','${customer.lastname}','${customer.dob}')`)
        return this.findAll();
    }

    async update(id:number,customer:{firstname:string,lastname:string,dob:string}){
       await this.connection.query(`UPDATE Customers set FirstName='${customer.firstname}',LastName='${customer.lastname}',DateOfBirth='${customer.dob}' WHERE CustomerID=${id}`);
        return this.findAll();
    }

    delete(id:number){
        this.connection.query(`DELETE FROM Customers WHERE CustomerID=${id}`);
        return this.findAll();
    }
}