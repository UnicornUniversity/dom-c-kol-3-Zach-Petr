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
 * @param {number} minVek - Minimální věk 
 * @param {number} maxVek - Maximální věk 
 * @returns {string} Datum narození v ISO formátu
 */
const generateUniqueBirthdates = (count, minVek, maxVek) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const allDates = [];

    // vytvoří všechny možné birthdate (dny pevně 1.1, měsíce pevně 0)
    for (let year = currentYear - maxVek; year <= currentYear - minVek; year++) {
        allDates.push(new Date(year, 0, 1).toISOString());
    }

    // pokud chceme víc než dostupných dat, fallback na duplicitní
    const result = [];
    for (let i = 0; i < count; i++) {
        const date = allDates[i % allDates.length]; // opakujeme, pokud je potřeba
        result.push(date);
    }

    // zamíchat výsledky
    return result.sort(() => Math.random() - 0.5);
};





/**
 * Hlavní funkce generující zaměstnance.
 * @param {object} dtoIn - Obsahuje count a věkové rozmezí
 * @returns {Array<object>} Pole zaměstnanců
 */
export const main = (dtoIn) => {
   const { count, vek } = dtoIn;

const minVek = (vek && typeof vek.min === "number") ? vek.min : 19;
const maxVek = (vek && typeof vek.max === "number") ? vek.max : 35;


    const dtoOut = [];
const usedBirthdates = new Set();
    for (let i = 0; i < count; i++) {
        const gender = randomPrvek(pohlavi);
        const name = gender === "male" ? randomPrvek(jmenaM) : randomPrvek(jmenaZ);
        const prijmeniV = randomPrvek(prijmeni);
        const surname = gender === "male" ? prijmeniV[0] : prijmeniV[1];
 let birthdate;
        do {
            birthdate = randomCas(minVek, maxVek);
        } while (usedBirthdates.has(birthdate));
        usedBirthdates.add(birthdate);
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
