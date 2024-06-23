import { Injectable } from '@nestjs/common';
import { ValidationOptions, registerDecorator } from 'class-validator';


export function IsImageFile(options ?: ValidationOptions) {
    return (object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options,
            validator: {
                validate(mimeType) {
                    const acceptMimeTypes = ['image/jpg', 'image/jpeg'];
                    const fileType = acceptMimeTypes.find((type) => type === mimeType);
                    return !fileType;
                },
            },
        });
    };
}

