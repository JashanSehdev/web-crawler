const { normalizeUrl, getURLsfromHTML } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeURL', () => {
    const input = 'https://boot.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL trailing slash', () => {
    const input = 'https://boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://Boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
    const input = 'http://Boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute',()=> {
    const input = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
            Boot.dev Blog
            </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://blog.boot.dev/path/"
    const actual = getURLsfromHTML(input, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative',()=> {
    const input = `
    <html>
        <body>
            <a href="/path/">
            Boot.dev Blog
            </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsfromHTML(input, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML multiple path',()=> {
    const input = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
            Boot.dev Blog path 1
            </a>

            <a href="/path2/">
            Boot.dev Blog path 2
            </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsfromHTML(input, inputBaseURL);
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML bad url',()=> {
    const input = `
    <html>
        <body>
            <a href="invalid">
            Boot.dev Blog path 1
            </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsfromHTML(input, inputBaseURL);
    const expected = []
    expect(actual).toEqual(expected)
})