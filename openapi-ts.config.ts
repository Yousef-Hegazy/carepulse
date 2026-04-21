import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    input: 'http://127.0.0.1:5119/openapi/v1.json',
    output: './generated',
    plugins: [
        '@hey-api/typescript',
        '@hey-api/client-axios',
        'zod',
        {
            name: '@hey-api/sdk',
            validator: false
        },
    ]
})