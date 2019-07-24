'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CrmSchema extends Schema {
  up() {

    this.create('logs', (table) => {
      table.increments()
      table.string('activity', 200).notNullable()
      table.string('user', 50)
      table.date('date')
      table.time('time')
      table.string('ip', 15)
      table.text('query')
      table.timestamps()
    })

    this.create('company', (table) => {
      table.increments()
      table.string('fantasy_name', 250).notNullable()
      table.string('company_name', 250)
      table.string('document', 30)
      table.string('cnae', 20)
      table.string('state_registration', 30)
      table.string('municipal_registration', 30)
      table.string('email', 250);
      table.string('phone', 20)
      table.string('celphone', 20)
      table.string('website', 120)
      table.string('zip_code', 12)
      table.string('street', 200)
      table.string('number', 10)
      table.string('complement', 50)
      table.string('district', 80)
      table.string('city', 80)
      table.string('state', 50)
      table.string('logo', 80)
      table.date('foundation_date')
      table.boolean('simples').defaultTo(0)
      table.text('obs')
      table.boolean('status').defaultTo(1)
      table.timestamps()
    })

    this.create('persons', (table) => {
      table.increments()
      table.string('name', 250).notNullable()
      table.string('fantasy_name', 250)
      table.enu('type', ['F', 'J']).defaultTo('F')
      table.string('document', 30)
      table.string('state_registration', 30)
      table.string('municipal_registration', 30)
      table.string('suframa_registration', 30)
      table.string('email', 250);
      table.string('phone', 20)
      table.string('celphone', 20)
      table.string('website', 120)
      table.string('zip_code', 12)
      table.string('street', 200)
      table.string('number', 10)
      table.string('complement', 50)
      table.string('district', 80)
      table.string('city', 80)
      table.string('state', 50)
      table.boolean('client').defaultTo(1)
      table.boolean('employee').defaultTo(0)
      table.boolean('shipping_company').defaultTo(0)
      table.boolean('provider').defaultTo(0)
      table.boolean('simples').defaultTo(0)
      table.text('obs')
      table.boolean('status').defaultTo(1)
      table.timestamps()
    })

    this.create('person_contacts', (table) => {
      table.increments()
      table.string('contact_name', 250).notNullable()
      table.string('email', 250)
      table.string('phone', 20)
      table.string('position', 50)
      table.integer('person_id').unsigned()
      table.foreign('person_id').references('persons.id')
      table.timestamps()
    })

    this.create('positions', (table) => {
      table.increments()
      table.string('position', 250).notNullable()
      table.integer('cbo')
      table.timestamps()
    })

    this.create('employees', (table) => {
      table.increments()
      table.decimal('salary', 15, 2)
      table.decimal('commission', 5, 2)
      table.integer('person_id').unsigned().notNullable()
      table.integer('position_id').unsigned()
      table.foreign('person_id').references('persons.id')
      table.foreign('position_id').references('positions.id')
      table.boolean('status').defaultTo(1)
      table.timestamps()
    })

  }

  down() {
    this.drop('employees')
    this.drop('positions')
    this.drop('person_contacts')
    this.drop('persons')
    this.drop('company')
    this.drop('logs')
  }
}

module.exports = CrmSchema
