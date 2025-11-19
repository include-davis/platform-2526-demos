import Cookies from "js-cookie";

export default async function getHello() {
    const token = Cookies.get("auth_token");
    const helloUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/hello`;
    console.log("sending request to ", helloUrl,);

    const response = await fetch(helloUrl,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
    );

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log("result", result);
    return result;
}
