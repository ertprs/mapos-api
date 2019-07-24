'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {

  up() {

    this.create('permissions', (table) => {
      table.increments()
      table.string('name')
      table.text('permissions')
      table.boolean('status').defaultTo(1)
      table.timestamps()
    })

    this.create('users', (table) => {
      table.increments()
      table.string('uid').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('provider').notNullable()
      table.string('first_name')
      table.string('last_name')
      table.string('confirmation_token')
      table.string('reset_token')
      table.boolean('status').defaultTo(1)
      table.integer('permission_id').unsigned()
      table.integer('person_id').unsigned()
      table.foreign('permission_id').references('permissions.id')
      table.foreign('person_id').references('persons.id')
      table.timestamps()
    })

  }

  down() {
    this.drop('users')
    this.drop('permissions')
  }
}

module.exports = UserSchema
