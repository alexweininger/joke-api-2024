import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { readFile } from 'fs/promises';

export async function getJoke(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const file = await readFile('src/jokes.json', 'utf8');
    const jokes = JSON.parse(file);
    context.log(jokes[0]);
    return { body: JSON.stringify(jokes[0]) };
};

app.http('joke', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getJoke
});
