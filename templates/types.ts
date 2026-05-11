export type Protocol = {
    readonly title: string;
    readonly url: string;
    readonly content: string;
};

export type HomePage = {
    readonly protocols: readonly Protocol[];
};
