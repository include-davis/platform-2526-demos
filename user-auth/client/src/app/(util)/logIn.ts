export default async function logIn(username: string, password: string) {
    const loginUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/log-in`;
    console.log("sending request to ", loginUrl);

    const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log("result", result);
        localStorage.setItem('auth_token', result.token);
        return result;
}
