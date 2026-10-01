let demoToken = null;

let demoMode = false;

export function setDemoAuth(token) {
    demoToken = token;
    demoMode = true;
}

export function clearDemoAuth() {
    demoToken = null;
    demoMode = false;
}

export function getAuthToken() {
    if (demoMode && demoToken) {
        return demoToken;
    }

    return localStorage.getItem("token");
}

export function isDemoMode() {
    return demoMode;
}