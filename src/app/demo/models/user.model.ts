import { Audit } from './audit.model';

export interface User extends Audit {
    _id: string,
    firstName: string,
    secondName: string,
    firstLastName: string,
    secondLastName: string,
    fullName: string,
    email: string,
    image: string,
    rol: string,
    identification: string,
    customerId: string,
}
