module.exports = {
    verbose: true,
    projects: [
        {
            displayName: 'test',
            moduleFileExtensions: ['js', 'json', 'ts'],
            rootDir: '.',
            testRegex: '.test.ts$',
            transform: {
                '^.+\\.(t|j)s$': 'ts-jest'
            },
            testPathIgnorePatterns: [
                '<rootDir>/test/template/'
            ],
            preset: 'ts-jest',
            testEnvironment: 'node'
        }
    ]
}
