export declare class ProductCreateDto {
    title: string;
    description: string;
    image: string;
    price: number;
}
declare const ProductUpdateDto_base: import("@nestjs/common").Type<Partial<ProductCreateDto>>;
export declare class ProductUpdateDto extends ProductUpdateDto_base {
}
export {};
