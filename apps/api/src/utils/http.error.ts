class ApiError extends Error {
    public serverStatus: number;
    public message: string;

    /**
     * @param {number} serverStatus - Set Server Status Code
     * @param {string} message - Error message 
     */
    constructor(serverStatus:number, message: string,) {
        super(message);
        this.serverStatus = serverStatus;
        this.message = message;
    }
}

export default ApiError;