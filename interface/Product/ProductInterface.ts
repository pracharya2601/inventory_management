interface List {
    id: number;
    desckey: string;
    desc: string;
}
interface ProductDetail {
    id: number;
    detailkey: string;
    detail: string;
}

interface Guide {
    id: number;
    type: string;
    link: string;
}

export interface Images {
    id: string;
    url: string;
    color: string;
}

interface PostedBy {
    id: string;
    imageUrl: string;
    name: string;
}
interface CreatedBy {
    id: string;
    imageUrl: string;
    name: string;
}

export interface Skus {
    id: number;
    color: string;
    count: number;
    price: number;
    size: string;
}

export interface UpdatedAt {
    date: string;
    updatedBy: string;
}

export interface ProductType {
    _id: string;
    name: string;
    description: string;
    listDescription: List[];
    guide: Guide[];
    images: Images[];
    postedBy: PostedBy;
    createdBy: CreatedBy;
    postedAt: string;
    updatedAt: UpdatedAt[];
    productdetail: ProductDetail[];
    catagory: string[];
    skus: Skus[];
    productType: 'stock' | 'inventory';
}

export interface CreateDataType {
    name: string;
    description: string;
    listDescription: List[];
    guide: Guide[];
    images: Images[];
    productdetail: ProductDetail[];
    catagory: string[] | [];
    skus: Skus[];
    productType: 'stock' | 'inventory';
}

export interface FormDataType {
    updateData: ProductType;
    createData: CreateDataType;
}

export type ProductList = ProductType[] | [];
