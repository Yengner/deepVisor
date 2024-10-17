export const getErrorMessage = (
    error: unknown,
    defaultMessage: string = 'An error occurred. Please try again later.'
) => {
    console.error(error);
    let errorMessage = defaultMessage;
    if (error instanceof Error && error.message.length < 100) {
        errorMessage = error.message;
    }
    return errorMessage
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));
