const GET_HEADER = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}`,
    },
};

export { GET_HEADER };
