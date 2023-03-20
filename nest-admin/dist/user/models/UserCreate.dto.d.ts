export declare class UserCreateDto {
    first_name: string;
    last_name: string;
    email: string;
}
declare const UserUpdateDto_base: import("@nestjs/common").Type<Partial<UserCreateDto>>;
export declare class UserUpdateDto extends UserUpdateDto_base {
}
export {};
