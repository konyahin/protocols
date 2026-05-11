type BaseProps = {
    readonly title: string;
    readonly body: string;
};

export function renderBase({ title, body }: BaseProps): string {
    return `
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#1a1a1a">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Protocols">
    <meta name="mobile-web-app-capable" content="yes">
    <title>${title}</title>
    <link rel="manifest" href="/manifest.json">
    <link rel="icon" type="image/svg+xml" href="/icons/icon-192.svg">
    <link rel="apple-touch-icon" href="/icons/icon-192.svg">
    <link rel="stylesheet" href="/pico.min.css">
    <link rel="stylesheet" href="/app.css">
    <script src="/main.js" defer></script>
</head>
<body>
${body}
</body>
</html>`;
}
