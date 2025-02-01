interface Tokens {
    access: {
        token: string;
        expires: number;
    };
    refresh: {
        token: string;
        expires: number;
    };
}

interface IGuard {
    id: number;
    firstName: string;
    lastName: string;
    licenseNumber: string;
    state: string;
}

interface IAgency {
    id: number;
    companyName: string;
    licenseNumber: string;
    state: string;
}