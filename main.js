// TODO add imports if needed
// TODO doc

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
const pohlavi = [
    "male",
    "female"
];

/**
 * Úvazky vyjádřené v procentech.
 * @type {number[]}
 */
const uvazek = [
    10,
    20,
    30,
    40
];

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
    "Lukáš"
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
 * Vygeneruje unikátní birthdate pro zadaný počet zaměstnanců.
 * @param {number} count
 * @param {number} minVek
 * @param {number} maxVek
 * @returns {string[]} pole ISO date
 */
const generateUniqueBirthdates = (count, minVek, maxVek) => {
    const today = new Date();
    const result = new Set();

    while (result.size < count) {
        const age = minVek + Math.random() * (maxVek - minVek);
        const birthTime = today.getTime() - age * 365.25 * 24 * 60 * 60 * 1000;
        const birthdate = new Date(birthTime).toISOString();
        result.add(birthdate);

        // log pro kontrolu generovaného věku
        console.log("Generovaný věk:", age.toFixed(2), "=> birthdate:", birthdate);
    }

    return Array.from(result);
};

/**
 * Hlavní funkce generující zaměstnance.
 * @param {object} dtoIn - Obsahuje count a věkové rozmezí
 * @returns {Array<object>} Pole zaměstnanců
 */
export const main = (dtoIn) => {
    console.log("=== START main ===");
    console.log("Vstupní data dtoIn:", dtoIn);

    const { count, vek } = dtoIn;
    const minVek = (vek && typeof vek.min === "number") ? vek.min : 19;
    const maxVek = (vek && typeof vek.max === "number") ? vek.max : 35;

    console.log("Použitý věkový rozsah:", { minVek, maxVek });

    const dtoOut = [];

    // předgenerovat unikátní birthdate
    const birthdates = generateUniqueBirthdates(count, minVek, maxVek);
    console.log("Prvních 5 birthdates:", birthdates.slice(0, 5));

    for (let i = 0; i < count; i++) {
        const gender = randomPrvek(pohlavi);
        const name = gender === "male" ? randomPrvek(jmenaM) : randomPrvek(jmenaZ);
        const prijmeniV = randomPrvek(prijmeni);
        const surname = gender === "male" ? prijmeniV[0] : prijmeniV[1];
        const workload = randomPrvek(uvazek);

        const employee = {
            gender,
            birthdate: birthdates[i],
            name,
            surname,
            workload
        };

        console.log(`Zaměstnanec ${i + 1}:`, employee);

        dtoOut.push(employee);
    }

    console.log("=== END main, generováno celkem:", dtoOut.length, "zaměstnanců ===");

    return dtoOut;
};

