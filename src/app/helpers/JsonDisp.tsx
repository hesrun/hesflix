interface JsonDispProps {
    data: unknown;
}

export default function JsonDisp({ data }: JsonDispProps) {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
