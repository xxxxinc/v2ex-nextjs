export type FetchProps = {
    method?: string;
    url: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
};

type ApiResponse<T> = {
    data: T;
    status: number;
    statusText: string;
};

export async function fetchApi<T>({ method = 'GET', url, headers, body }: FetchProps): Promise<ApiResponse<T>> {
    const response = await fetch(url, {
        method,
        headers: {
            // 'Content-Type': 'application/json',
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData?.message || 'Something went wrong.');
    }


    return {
      data: responseData.data,
      status: response.status,
      statusText: response.statusText,
    };
}
