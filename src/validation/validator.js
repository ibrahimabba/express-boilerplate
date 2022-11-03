import { BadRequestError } from '../helpers/errors.js';

const buildErrorObject = (errors) => {
    const customErrors = {};
    errors.forEach((item) => {
        if (!Object.prototype.hasOwnProperty.call(customErrors, item.path.join('.'))) {

            customErrors[item.path.join('.')] = {
                message: item.message.replace(/['"]+/g, '')
            };
        }
    });

    return customErrors;
};

export const validator = (request, schema) => {
    const validation = schema.validate(request, { abortEarly: false });
    const { value, error } = validation;

    if (error) {
        throw new BadRequestError('Invalid request data', buildErrorObject(error.details));
    }

    return value;
};