import { isEqual, isArrayEmpty, isArray, isStringEmpty, isNumberEmpty, isObjectEmpty, capitalizeString, formatNumberIntoMoney, isJsonString, isSuccessApiCall } from '../src/common/commonFunctions';
import { TEXT_CONSTANTS } from '../src/common/constants';

describe('isEqual', () => {
    test("123, ''", () => {
        expect(isEqual(123, '')).toBe(false);
    })

    test("123, ''", () => {
        expect(!isEqual(123, '')).toBe(true);
    })

    test("123, '123'", () => {
        expect(isEqual(123, '123')).toBe(false);
    })

    test("123, '123'", () => {
        expect(!isEqual(123, '')).toBe(true);
    })

    test("123, 123", () => {
        expect(!isEqual(123, 123)).toBe(false);
    })

    test("123, 123", () => {
        expect(isEqual(123, 123)).toBe(true);
    })
})

describe('isArray', () => {
    test("[]", () => {
        expect(isArray([])).toBe(true);
    })

    test("[]", () => {
        expect(!isArray([])).toBe(false);
    })

    test("null", () => {
        expect(!isArray("null")).toBe(true);
    })

    test("[{amount: 1, id: '123'}]", () => {
        expect(isArray([{ amount: 1, id: '123' }])).toBe(true);
    })

    test("undefined", () => {
        expect(!isArray(undefined)).toBe(true);
    })
})

describe('isArrayEmpty', () => {
    test("[]", () => {
        expect(isArrayEmpty([])).toBe(true);
    })

    test("[]", () => {
        expect(!isArrayEmpty([])).toBe(false);
    })

    test("null", () => {
        expect(isArrayEmpty(null)).toBe(true);
    })

    test("null", () => {
        expect(!isArrayEmpty("null")).toBe(false);
    })

    test("[{amount: 1, id: '123'}]", () => {
        expect(isArrayEmpty([{ amount: 1, id: '123' }])).toBe(false);
    })

    test("[{amount: 1, id: '123'}]", () => {
        expect(!isArrayEmpty([{ amount: 1, id: '123' }])).toBe(true);
    })
})

describe('isObjectEmpty', () => {
    test("{}", () => {
        expect(isObjectEmpty({})).toBe(true);
    })

    test("{}", () => {
        expect(!isObjectEmpty({})).toBe(false);
    })

    test("null", () => {
        expect(isObjectEmpty(null)).toBe(true);
    })

    test("null", () => {
        expect(!isObjectEmpty("null")).toBe(false);
    })

    test("[{amount: 1, id: '123'}]", () => {
        expect(isObjectEmpty([{ amount: 1, id: '123' }])).toBe(true);
    })

    test("{ amount: 1, id: '123' }", () => {
        expect(!isObjectEmpty({ amount: 1, id: '123' })).toBe(true);
    })
})

describe('iStringEmpty', () => {
    test("[]", () => {
        expect(isStringEmpty([])).toBe(true);
    })

    test("null", () => {
        expect(isStringEmpty(null)).toBe(true);
    })

    test("null", () => {
        expect(!isStringEmpty("null")).toBe(true);
    })

    test("[{amount: 1, id: '123'}]", () => {
        expect(!isStringEmpty([{ amount: 1, id: '123' }])).toBe(true);
    })
})

describe('isNumberEmpty', () => {
    test("", () => {
        expect(isNumberEmpty("")).toBe(true);
    })

    test("", () => {
        expect(!isNumberEmpty("")).toBe(false);
    })

    test("12ghh", () => {
        expect(isNumberEmpty("12ghh")).toBe(true);
    })

    test("12.12", () => {
        expect(!isNumberEmpty("12.12")).toBe(true);
    })

    test("0", () => {
        expect(isNumberEmpty("0")).toBe(false);
    })

    test("0.1", () => {
        expect(!isNumberEmpty(0.1)).toBe(true);
    })
})

describe('capitalizeString', () => {
    test("aabd23", () => {
        expect(capitalizeString("aabd23")).toBe("Aabd23");
    })

    test("2abd23", () => {
        expect(capitalizeString("2abd23")).toBe("2abd23");
    })

    test(TEXT_CONSTANTS.DATE_OF_TRANSFER, () => {
        expect(capitalizeString(TEXT_CONSTANTS.DATE_OF_TRANSFER)).toBe("Date Of Transfer");
    })

    test(TEXT_CONSTANTS.USERNAME, () => {
        expect(capitalizeString(TEXT_CONSTANTS.USERNAME)).toBe("Username");
    })
})

describe('formatNumberIntoMoney', () => {
    test("12.34", () => {
        expect(formatNumberIntoMoney(12.34)).toBe("12.34");
    })

    test("2344", () => {
        expect(formatNumberIntoMoney(2344)).toBe("2,344.00");
    })

    test("1222344", () => {
        expect(formatNumberIntoMoney(1222344)).toBe("1,222,344.00");
    })

    test("", () => {
        expect(formatNumberIntoMoney("")).toBe("");
    })

    test("12lslf", () => {
        expect(formatNumberIntoMoney("12lslf")).toBe("");
    })
})

describe('isJsonString', () => {
    test("", () => {
        expect(isJsonString("")).toBe(false);
    })

    test('{"name":"John", "age":30, "city":"New York"}', () => {
        expect(isJsonString('{"name":"John", "age":30, "city":"New York"}')).toBe(true);
    })

    test("{\"name\":\"John\",\"age\":30,\"city\":\"New York\"}", () => {
        expect(isJsonString("{\"name\":\"John\",\"age\":30,\"city\":\"New York\"}")).toBe(true);
    })

    test('{"name":"John", "age":30, "city":"New York"}', () => {
        expect(isJsonString({ "name": "John", "age": 30, "city": "New York" })).toBe(false);
    })

    test('[{"name":"John", "age":30, "city":"New York"}]', () => {
        expect(isJsonString([{ "name": "John", "age": 30, "city": "New York" }])).toBe(false);
    })
})

describe('isSuccessApiCall', () => {
    test('200', () => {
        expect(isSuccessApiCall(200)).toBe(true);
    })

    test('201', () => {
        expect(isSuccessApiCall(201)).toBe(true);
    })

    test('400', () => {
        expect(isSuccessApiCall(400)).toBe(false);
    })

    test('401', () => {
        expect(isSuccessApiCall(401)).toBe(false);
    })

    test('403', () => {
        expect(isSuccessApiCall(403)).toBe(false);
    })

    test('404', () => {
        expect(isSuccessApiCall(404)).toBe(false);
    })
})
