interface List {
    key: string;
    desc: string;
}
interface ProductDetail {
    key: string;
    detail: string;
}

interface Guide {
    type: string;
    link: string;
}

export interface Images {
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
    color: string;
    count: number;
    price: number;
    size: string;
}

export interface ProductType {
    _id: string;
    name: string;
    description: {
        base: string;
        list: List[] | [];
    };
    guide: Guide | [];
    images: Images[];
    postedBy: PostedBy;
    createdBy: CreatedBy;
    postedAt: string;
    updatedAt: string[];
    productdetail: ProductDetail[];
    catagory: string[];
    skus: Skus[];
    colors: string[];
    sizes: string[];
}

export interface ProductList {
    data: ProductType[];
}
