const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Locker {
        _id: ID!
        locker: Int!
        size: Size!
        income: Int!
        timeout: String
        status: String
        user: User!
    }
    
    type Size {
        _id: ID!
        size: String!
        perhour: Int!
        nextminute: Int!
    }

    type User {
        _id: ID
        telephone: String
        status: Boolean
    }

    input SizeInput {
        locker: Int!
        size: String!
        perhour: Int!
        nextminute: Int!
    }

    input LockerInput {
        locker: Int!
        income: Int!
        status: String
        timeout: String
    }

    input UserInput {
        telephone: String!
    }

    type RootQuery {
        lockers: [Locker!]!
        sizes: [Size!]!
        users: [User!]!
    }

    type RootMutation {
        createSize(size: SizeInput): Size
        createLocker(locker: LockerInput): Locker
        createUser(user: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
