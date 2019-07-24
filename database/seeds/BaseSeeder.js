'use strict'

/*
|--------------------------------------------------------------------------
| BaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')
const Database = use('Database')
const uuid = use('uuid/v1')

class BaseSeeder {
  async run() {


    const person = await Database.from('persons').insert([
      {
        name: 'Admin',
        client: false,
        employee: true
      }
    ])

    const position = await Database.from('positions').insert([
      {
        position: 'Administrador de Empresas',
        cbo: '252105'
      }
    ])

    const employee = await Database.from('employees').insert([
      {
        person_id: person,
        position_id: position
      }
    ])

    const permission = await Database.from('permissions').insert([
      {
        name: 'administrador',
        permissions: '',
      }
    ])

    const user = await Database.from('users').insert([
      {
        uid: uuid(),
        provider: 'local',
        first_name: 'Admin',
        last_name: 'admin',
        email: 'admin@admin.com',
        confirmation_token: '',
        password: await Hash.make('123456'),
        permission_id: permission,
        person_id: person

      }
    ])

    console.log(permission, user, position, employee, person)
  }
}

module.exports = BaseSeeder
