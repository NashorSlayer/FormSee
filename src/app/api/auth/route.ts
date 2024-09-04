import { registerData } from "@/types/authTypes";
import { AuthBackendPaths, urlBackend, HTTPMETHODS } from "@/util/constants";

export async function RegisterApi(data: registerData) {

    const response = await fetch(urlBackend + AuthBackendPaths.REGISTER, {
        method: HTTPMETHODS.POST,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (response.status !== 201) {
        throw new Error('Error en la creación de la cuenta');
    }

    const result = await response.json();
    return {
        status: response.status,
        body: await result

    }
}
