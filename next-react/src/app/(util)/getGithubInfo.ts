export async function getData(gh_username: string) {
    const url = `https://api.github.com/users/${gh_username}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}
