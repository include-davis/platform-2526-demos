export async function getCats() {
    const url = `http://localhost:3000/cats`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error(error);
    }
}
