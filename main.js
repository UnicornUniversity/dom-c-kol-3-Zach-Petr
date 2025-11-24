
/**
 * Konstanta sloužící pro vstupní data.
 * @type {object}
 * @property {number} count - Požadovaný počet zaměstnanců
 * @property {object} age - Věkové rozmezí
 * @property {number} age.min - Minimální věk
 * @property {number} age.max - Maximální věk
 */
const dtoIn = {
    count: 50,
    age: {
        min: 19,
        max: 35
    }
};

/**
 * Pole pohlaví 
 * @type {string[]}
 */
const pohlavi = ["male", "female"];

/**
 * Pole možných pracovních úvazků v hodinách za týden.
 * @type {number[]}
 */
const uvazek = [10, 20, 30, 40];

/**
 * Pole mužských jmen pro generování zaměstnanců.
 * @type {string[]}
 */
const jmenaM = [
    "Jakub",
    "Jan",
    "Tomáš",
    "Adam",
    "Matyáš",
    "Filip",
    "Vojtěch",
    "Ondřej",
    "David",
    "Lukáš",
];

/**
 * Pole ženských jmen pro generování zaměstnanců.
 * @type {string[]}
 */
const jmenaZ = [
    "Jana",
    "Eva",
    "Renata",
    "Martina",
    "Božena",
    "Daniela",
    "Růžena",
    "Anna",
    "Kateřina",
    "Radka",
];

/**
 * Pole příjmení.
 * Každý prvek je pole [mužský rod, ženský rod].
 * @type {Array<[string, string]>}
 */
const prijmeni = [
    ["Novotný", "Novotná"],
    ["Dvořák", "Dvořáková"],
    ["Černý", "Černá"],
    ["Procházka", "Procházková"],
    ["Kučera", "Kučerová"],
    ["Veselý", "Veselá"],
    ["Horák", "Horáková"],
    ["Němec", "Němcová"],
    ["Pokorný", "Pokorná"],
    ["Král", "Králová"],
    ["Růžička", "Růžičková"],
    ["Beneš", "Benešová"],
    ["Fiala", "Fialová"],
    ["Sedláček", "Sedláčková"],
    ["Šimek", "Šimková"],
];

/**
 * Vrátí náhodný prvek z pole.
 * @param {Array} array - Pole, ze kterého se vybírá náhodný prvek
 * @returns {*} - Náhodný prvek z pole
 */
const randomPrvek = (array) => array[Math.floor(Math.random() * array.length)];

/**
 * Generuje náhodné datum narození podle min/max věku
 * @param {number} minVek - min věk osoby
 * @param {number} maxVek - max věk osoby
 * @returns {string} ISO datum
 */
const randomCas = (minVek, maxVek) => {
    if (typeof minVek !== "number" || typeof maxVek !== "number") {
        throw new Error("Věk musí být číslo");
    }
    if (minVek > maxVek) {
        [minVek, maxVek] = [maxVek, minVek];
    }

    const ted = new Date();
    const yearMs = 365.25 * 24 * 60 * 60 * 1000;

    const minBirth = ted.getTime() - maxVek * yearMs;
    const maxBirth = ted.getTime() - minVek * yearMs;

    const randomTime = minBirth + Math.random() * (maxBirth - minBirth);

    return new Date(randomTime).toISOString();
};

/**
 * Hlavní funkce generující zaměstnance
 * @param {object} dtoIn - Obsahuje count a age
 * @returns {Array<object>} Pole zaměstnanců
 */
export const main = (dtoIn) => {
    if (!dtoIn.age || typeof dtoIn.age.min !== "number" || typeof dtoIn.age.max !== "number") {
        throw new Error("age.min a age.max musí být zadány");
    }

    const { count, age } = dtoIn;
    const minVek = age.min;
    const maxVek = age.max;

    const dtoOut = [];

    for (let i = 0; i < count; i++) {
        const gender = randomPrvek(pohlavi);
        const name = gender === "male" ? randomPrvek(jmenaM) : randomPrvek(jmenaZ);
        const prijmeniV = randomPrvek(prijmeni);
        const surname = gender === "male" ? prijmeniV[0] : prijmeniV[1];

        dtoOut.push({
            gender,
            birthdate: randomCas(minVek, maxVek), // generuje datum podle zadaného rozsahu
            name,
            surname,
            workload: randomPrvek(uvazek),
        });
    }

    return dtoOut;
};




