export const getDebugInfoFromResponse = async (responseToDebug: Response) => {
    const statusCode = responseToDebug.status;
    const statusText = responseToDebug.statusText;
    const responseText = await responseToDebug.text();
    const debugInfo = `${statusCode} - ${statusText} - ${responseText}`;
    
    return debugInfo;
}