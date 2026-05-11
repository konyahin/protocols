export type Protocol = {
    readonly title: string;
    readonly description: string;
    readonly url: string;
    readonly steps: string[];
};

export type HomePage = {
    readonly protocols: readonly Protocol[];
};
