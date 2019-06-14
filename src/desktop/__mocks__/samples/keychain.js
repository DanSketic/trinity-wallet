/**
 * Argon2 hash for "Foo"
 */
// prettier-ignore
export const passwordMock = new Uint8Array([229, 34, 107, 56, 71, 11, 182, 241, 127, 92, 0, 156, 41, 105, 164, 24, 93, 254, 1, 51, 230, 65, 153, 110, 234, 31, 201, 159, 59, 148, 64, 161]);

export const saltMock = '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0';

/**
 * Decrypted AAA..A seed with passwordMock and saltMock
 */
export const vaultMock =
    '154,69,196,133,104,143,124,56,137,178,155,235|213,183,203,0,35,11,22,63,233,173,222,70,67,202,26,202,155,248,70,178,253,82,156,117,169,199,123,22,108,42,87,179,164,59,43,109,6,165,2,74,7,152,94,50,67,32,115,101,84,30,205,161,89,94,74,51,154,235,72,132,45,91,178,14,218,82,238,104,39,140,20,245,102,125,126,59,79,74,243,181,83,236,2,169,203,56,215,147,71,202,243,76,17,80,86,66,251,139,79,244,52,48,225,177,199,226,84,21,227,167,124,149,86,12,96,136,115,58,86,101,130,69,10,65,88,30,196,120,16,169,63,26,15,197,30,193,161,74,29,92,59,195,200,30,231,71,225,138,13,86,43,52,253,140,146,22,20,195,55,34,37,212,180,44,56,241,35,30,75,95,216,164,167,81,43,201,144,195,63';

export const seedBytesMock = Array(81).fill(1);

export const seedTrytesMock = Array(243)
    .fill(0)
    .map((_i, i) => (i % 3 === 0 ? 1 : 0));

// prettier-ignore
export const addressMocks = [
    [-1,1,-1,0,-1,0,-1,1,-1,0,-1,0,1,1,-1,1,0,1,-1,-1,-1,0,-1,1,-1,-1,1,0,-1,-1,1,-1,-1,0,0,0,0,-1,1,0,1,-1,-1,-1,0,1,0,1,0,-1,-1,1,-1,1,1,-1,-1,1,-1,1,-1,-1,0,-1,-1,1,0,-1,1,0,-1,0,-1,-1,-1,0,-1,0,0,0,0,0,-1,1,-1,0,1,1,1,1,1,1,-1,1,1,1,0,-1,-1,1,1,1,1,-1,-1,-1,-1,1,1,-1,-1,1,-1,0,0,-1,-1,1,0,-1,1,1,-1,1,0,-1,0,1,1,1,1,-1,-1,-1,1,1,-1,-1,-1,1,1,1,-1,1,0,-1,0,0,0,0,1,-1,-1,-1,0,0,0,1,0,1,0,1,1,1,1,1,0,-1,1,-1,0,0,1,1,-1,0,-1,1,0,1,1,1,0,-1,-1,1,1,-1,0,1,1,1,-1,1,1,0,0,-1,-1,1,-1,1,0,-1,1,0,0,0,-1,0,1,0,0,1,-1,-1,-1,0,0,-1,-1,0,-1,0,0,1,-1,-1,1,0,-1,1,0,0,1,1,-1,0,-1,1,1,1,0],[0,-1,0,0,1,-1,-1,-1,1,0,0,-1,1,-1,1,-1,0,1,-1,-1,0,-1,1,-1,1,-1,0,0,0,-1,-1,1,-1,0,-1,1,0,1,-1,1,-1,0,-1,1,1,0,-1,1,-1,1,1,0,-1,0,0,1,-1,0,0,-1,-1,1,1,-1,0,1,1,1,1,0,-1,1,-1,-1,1,1,1,-1,0,1,1,0,-1,-1,0,0,1,0,-1,1,-1,1,-1,-1,1,-1,0,1,0,-1,-1,-1,-1,1,-1,0,-1,0,0,-1,-1,1,-1,1,0,1,1,1,1,0,1,-1,-1,0,1,0,-1,0,0,0,0,0,0,1,0,1,0,1,0,1,1,-1,1,1,-1,0,1,0,0,-1,0,-1,-1,0,-1,-1,1,-1,-1,1,-1,1,-1,-1,-1,1,0,0,-1,0,-1,1,-1,0,0,-1,1,1,0,1,-1,-1,1,1,-1,-1,1,-1,1,-1,1,1,0,0,0,0,-1,-1,-1,1,1,0,1,-1,-1,0,-1,0,0,-1,0,-1,-1,0,1,-1,-1,-1,1,0,1,0,-1,1,0,1,0,0,1,1,-1,-1,-1,-1,0,-1,0,0,0,-1,0,-1,0],[0,0,-1,1,0,1,-1,1,0,1,-1,0,0,1,1,0,1,0,0,0,1,0,-1,-1,0,1,-1,-1,1,1,-1,-1,0,1,0,1,1,1,-1,0,1,0,0,1,-1,-1,1,1,-1,0,0,-1,0,-1,-1,0,0,0,1,0,1,-1,-1,0,0,1,-1,1,1,-1,-1,-1,-1,1,0,0,1,-1,0,-1,-1,1,-1,1,0,0,-1,1,-1,1,1,1,-1,0,-1,0,-1,0,1,0,0,-1,-1,1,-1,-1,1,-1,-1,-1,1,0,0,0,-1,0,0,0,-1,1,1,0,-1,0,1,0,1,-1,1,-1,1,-1,0,-1,1,0,0,-1,-1,1,1,-1,-1,1,0,1,1,1,1,1,1,0,1,-1,1,0,1,1,0,1,1,0,1,0,0,-1,1,1,-1,-1,1,1,-1,0,1,-1,0,0,1,0,0,1,1,-1,0,1,0,1,1,1,0,1,1,1,0,-1,-1,-1,1,0,-1,-1,0,1,-1,0,-1,0,0,0,0,0,-1,-1,1,-1,0,0,1,0,1,-1,0,0,1,1,1,0,0,1,1,1,1,1,0,1,-1,0,-1,-1,-1,1,0],
];
