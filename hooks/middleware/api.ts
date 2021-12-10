export async function apiGET<T>(path: string): Promise<T> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    type ResponseData = {
        data?: T;
        errors: string;
    };
    const { data, errors }: ResponseData = await res.json();
    if (res.ok) {
        return data;
    } else {
        return Promise.reject(errors);
    }
}

export const apiPOST = async (path: string, body: any) => {
    const resp = await fetch(`api/${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if (resp.ok) {
        return 'success';
    }
};
