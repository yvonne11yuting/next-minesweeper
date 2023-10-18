export function contain7(x: number) {
    return x.toString().includes('7');
}

export function counting7s(n: number): number {
    if (!Number.isInteger(n)) throw new Error('n must be an integer');
    if (n < 0) throw new Error('n must be greater than 0');

    let count = 0;
    for (let i = 1; i <= n; i++) {
        if (contain7(i)) {
            count += 1;
        };
    }

    return count;
}