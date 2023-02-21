import { Audit } from './audit.model';
export interface Project extends Audit {
    _id: string
    name: string,
    description: string,
    icon: string,
    userCreationId?: string,
    userModificationId?: string,
    createdAt?: Date,
    updatedAt?: Date
}
