import { faker } from '@faker-js/faker'

export type Person2 = {
    firstName: string
    lastName: string
    age: number
    visits: number
    progress: number
    status: 'relationship' | 'complicated' | 'single'
    subRows?: Person2[]
}

const range = (len: number) => {
    const arr: number[] = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}


const newPerson = (): Person2 => {
    const statuses = ['relationship', 'complicated', 'single'];
    const randomIndex = faker.number.int({ min: 0, max: statuses.length - 1 });

    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: faker.number.int(40),
        visits: faker.number.int(1000),
        progress: faker.number.int(100),
        status: statuses[randomIndex] as unknown as 'relationship' | 'complicated' | 'single',
    }
}

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): Person2[] => {
        const len = lens[depth]!
        return range(len).map((d): Person2 => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            }
        })
    }

    return makeDataLevel()
}
