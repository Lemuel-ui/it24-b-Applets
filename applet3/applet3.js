class Logger {
    constructor() {
        this.logCount = 0;

        this.logEvent = this.logEvent.bind(this);
        this.clearLogs = this.clearLogs.bind(this);

        document.getElementById("logButton").addEventListener("click", this.logEvent);
        document.getElementById("clearButton").addEventListener("click", this.clearLogs);
    }

    logEvent() {
        this.logCount++;
        document.getElementById("logCount").textContent = "Total Logs: " + this.logCount;

        const cardContainer = document.getElementById("cardContainer");
        const logEntry = document.createElement("div");
        logEntry.className = "card mb-2";
        logEntry.innerHTML = `<div class="card-body">Log Entry ${this.logCount}</div>`;
        cardContainer.appendChild(logEntry);
    }

    clearLogs() {
        this.logCount = 0;
        document.getElementById("logCount").textContent = "Total Logs: " + this.logCount;
        document.getElementById("cardContainer").innerHTML = '';
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new Logger();
});
