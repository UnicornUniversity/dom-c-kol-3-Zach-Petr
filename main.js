//TODO add imports if needed
//TODO doc

/**
 * Konstanta sloužící pro vstupní data.
 * @type {object}
 * @property {number} count - Požadovaný počet zaměstnanců
 * @property {object} vek - Věkové rozmezí
 * @property {number} vek.min - Minimální věk
 * @property {number} vek.max - Maximální věk
 */
const dtoIn = {
    count: 50,
    vek: {
        min: 19,
        max: 35
    }
};

/**
 * Pohlaví používaná při generování.
 * @type {string[]}
 */
const pohlavi = ["male", "female"];

/**
 * Úvazky vyjádřené v procentech.
 * @type {number[]}
 */
const uvazek = [10, 20, 30, 40];

/**
 * Mužská jména.
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
 * Ženská jména.
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
    "Radka"
];

/**
 * Pole dvojic příjmení [muž, žena].
 * @type {Array<[string,string]>}
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
    ["Šimek", "Šimková"]
];

/**
 * Vrátí náhodný prvek z pole.
 * @param {Array} array - Pole, ze kterého se vybírá
 * @returns {*} Náhodný prvek
 */
const randomPrvek = (array) => array[Math.floor(Math.random() * array.length)];

/**
 * Vygeneruje náhodné datum narození tak,
 * aby výsledný věk byl v intervalu <minVek, maxVek>.
 * Přesnost testů vyžaduje interval v milisekundách,
 * rok je počítán jako průměrný rok o délce 365.25 dní.
 *
 * @param {number} minVek - Minimální věk (nejmladší)
 * @param {number} maxVek - Maximální věk (nejstarší)
 * @returns {string} Datum narození v ISO formátu
 */
const randomCas = (minVek, maxVek) => {
    const ted = new Date();
    
    const nowUTC = Date.UTC(
        ted.getUTCFullYear(),
        ted.getUTCMonth(),
        ted.getUTCDate(),
        ted.getUTCHours(),
        ted.getUTCMinutes(),
        ted.getUTCSeconds(),
        ted.getUTCMilliseconds()
    );

    const yearMs = 365.25 * 24 * 60 * 60 * 1000;

    const minBirth = nowUTC - maxVek * yearMs; // nejstarší možný
    const maxBirth = nowUTC - minVek * yearMs; // nejmladší možný

    const randomTime = minBirth + Math.random() * (maxBirth - minBirth);

    return new Date(randomTime).toISOString();
};


/**
 * Hlavní funkce generující zaměstnance.
 * @param {object} dtoIn - Obsahuje count a věkové rozmezí
 * @returns {Array<object>} Pole zaměstnanců
 */
export const main = (dtoIn) => {
    const { count, vek = {} } = dtoIn;
    const minVek = vek.min ?? 19;
    const maxVek = vek.max ?? 35;

    const dtoOut = [];

    for (let i = 0; i < count; i++) {
        const gender = randomPrvek(pohlavi);
        const name = gender === "male" ? randomPrvek(jmenaM) : randomPrvek(jmenaZ);

        const surnamePair = randomPrvek(prijmeni);
        const surname = gender === "male" ? surnamePair[0] : surnamePair[1];

        dtoOut.push({
            gender,
            birthdate: randomCas(minVek, maxVek),
            name,
            surname,
            workload: randomPrvek(uvazek),
        });
    }

    return dtoOut;
};
