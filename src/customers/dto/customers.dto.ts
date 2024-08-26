import { IsString } from "class-validator";

export class CustomerDto{
    @IsString()
    firstname : string;

    @IsString()
    lastname : string;
    
    @IsString()
    dob : string;
}