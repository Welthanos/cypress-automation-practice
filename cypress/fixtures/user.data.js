import { faker } from '@faker-js/faker'

export const user = {
    email: {
        valid: () => faker.internet.email(),
        invalid: faker.internet.userName(),
        existing: 'well@gmail.com'
    },
    password: {
        valid: () => faker.internet.password(),
        existing: 'n@d8thBZKywmAZR'
    },
    name: {
        first: () => faker.person.firstName(),
        last: () => faker.person.lastName(),
    },
    birthDate: {
        day: () => faker.number.int({ min: 1, max: 31 }),
        month: () => faker.date.month(),
        year: () => faker.number.int({ min: 1950, max: 2008 }).toString()
    },
    gender: () => faker.number.int({ min: 1, max: 2 })
}