export class SSE {
    constructor(url) {
        this.url = url;
        this.eventSource = null;
    }

    connect() {
        const url = new URL(this.url);
        this.eventSource = new EventSource(url);
    }

    disconnect() {
        if (this.eventSource) {
            this.eventSource.close();
        }
    }

    on(eventName, callback) {
        if (this.eventSource) {
            this.eventSource.addEventListener(eventName, callback);
        }
    }

    off(eventName, callback) {
        if (this.eventSource) {
            this.eventSource.removeEventListener(eventName, callback);
        }
    }
}
