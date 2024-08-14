const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const uuid_matcher = {
    toBeUUID(received) {
        const pass = UUID_REGEX.test(received);
        if (pass) {
        return {
            message: () => `expected ${received} not to be a valid UUID`,
            pass: true,
        };
        } else {
        return {
            message: () => `expected ${received} to be a valid UUID`,
            pass: false,
        };
        }
    },
}

export default uuid_matcher;