export async function addCat(catName: string, catFur: string) {
    const url = `http://localhost:3000/cats`;
    try {
        const formData = {
            name: catName, 
            fur: catFur
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}
