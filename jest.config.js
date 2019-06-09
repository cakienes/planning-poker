module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>/tsconfig.json',
        },
        __CONFIG__: 'default',
    },
    verbose: true,
    testURL: 'http://localhost/',
    clearMocks: true,
    resetMocks: true,
    collectCoverage: false,
    collectCoverageFrom: ['src/**'],
    coveragePathIgnorePatterns: ['.d.ts', 'js', '.snap'],
    testRegex: '((.*)\\.(test|spec)\\.(ts|tsx|js))$',
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/coverage/', '/temp/'],
    transformIgnorePatterns: ['/node_modules/', '/dist/', '/coverage/', '/temp/'],
    watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/coverage/', '/temp/'],
    setupFilesAfterEnv: ['mock-local-storage'],
    setupFiles: ['<rootDir>/test/setup/enzymeSetup.js', '<rootDir>/test/setup/browserMocks.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jest'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
    transform: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/test/setup/fileTransformer.js',
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
};
