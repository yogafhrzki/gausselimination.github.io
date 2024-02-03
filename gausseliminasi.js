function gaussJordan(x, y, verbose=0) {
    let m = x.length;
    let n = x[0].length;
    let augmentedMat = new Array(m).fill(0).map(() => new Array(n + 1).fill(0));
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            augmentedMat[i][j] = x[i][j];
        }
        augmentedMat[i][n] = y[i];
    }

    if (verbose > 0) {
        console.log('# Matriks tambahan awal');
        console.log(augmentedMat);
    }

    const outerLoop = [[0, m - 1, 1], [m - 1, 0, -1]];
    for (let d = 0; d < 2; d++) {
        for (let i = outerLoop[d][0]; i != outerLoop[d][1]; i += outerLoop[d][2]) {
            const innerLoop = [[i + 1, m, 1], [i - 1, -1, -1]];
            for (let j = innerLoop[d][0]; j != innerLoop[d][1]; j += innerLoop[d][2]) {
                const k = (-1) * augmentedMat[j][i] / augmentedMat[i][i];
                const tempRow = augmentedMat[i].map(val => val * k);
                if (verbose > 1) {
                    console.log(`# Gunakan baris ${i + 1} untuk baris ${j + 1}`);
                    console.log(`k=${k.toFixed(2)} *`, augmentedMat[i], '=', tempRow);
                }
                augmentedMat[j] = augmentedMat[j].map((val, index) => val + tempRow[index]);
                if (verbose > 1) {
                    console.log(augmentedMat);
                }
            }
        }
    }

    for (let i = 0; i < m; i++) {
        augmentedMat[i] = augmentedMat[i].map(val => val / augmentedMat[i][i]);
    }

    if (verbose > 0) {
        console.log('# Normalisasi baris');
        console.log(augmentedMat);
    }

    return augmentedMat.map(row => row[n]);
}

const coefficients = [[2, 1, 1], [1, 1, -2], [1, 2, 1]];
const rightHandSide = [8, -2, 2];

const verboseInput = prompt("Apakah Anda ingin menampilkan langkah-langkahnya? (y/n): ");
const verbose = verboseInput.toLowerCase() === "y" ? 2 : 0;

const hasil = gaussJordan(coefficients, rightHandSide, verbose);
console.log("Hasilnya adalah:", hasil);