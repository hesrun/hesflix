export default function JsonDisp({ data }: { data: any }) {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
