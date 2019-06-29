'use strict'

const createError = require('apollo-errors');

export const UnknownError = createError('UnknownError', {
    message: 'An unknown error has occurred!  Please try again later'
});

export const ForbiddenError = createError('ForbiddenError', {
    message: 'You are not allowed to do this'
});

export const AuthenticationRequiredError = createError('AuthenticationRequiredError', {
    message: 'You must be logged in to do this'
});