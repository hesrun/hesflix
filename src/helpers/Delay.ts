const Delay = (ms: number = 300) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
export default Delay;
