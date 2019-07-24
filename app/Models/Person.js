'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Person extends Model {

    static get table() {
        return 'persons'
    }

}

module.exports = Person
