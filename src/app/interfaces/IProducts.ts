export interface IProducts {
    id: string;
    name: string;
    brand: string;
    photo: string;
    price: any;
    createdAt: string;
    updatedAt: string;
    quantity?: number;
    description: string;
    valorTotal?: number;
}