export interface Documentation {
    name: string;
    description: string;
    icon: string;
    customerId: string;
    documentationPadreId: string;
    htmlData: string;
    state: string;
    moduloId: string;
    userCreationId: string;
    userModificationId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
