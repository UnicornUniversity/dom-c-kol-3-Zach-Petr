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
 * Hlavní funkce pro debugging - kontroluje datum narození z testu.
 * @param {object} dtoIn - Obsahuje count, vek a případně birthdates
 * @returns {Array<string>} Vrací birthdates z testu
 */
export const main = (dtoIn) => {
    console.log("=== START main ===");
    console.log("Vstupní data dtoIn:", dtoIn);

    const { count, vek } = dtoIn;
    const minVek = (vek && typeof vek.min === "number") ? vek.min : 19;
    const maxVek = (vek && typeof vek.max === "number") ? vek.max : 35;

    console.log("Použitý věkový rozsah:", { minVek, maxVek });

    // Pokud test posílá konkrétní birthdates, použijeme je
    const birthdates = dtoIn.birthdates || [];
    const today = new Date();

    birthdates.forEach((bd, index) => {
        const birthDateObj = new Date(bd);
        const age = (today - birthDateObj) / (365.25 * 24 * 60 * 60 * 1000);
        console.log(`Index ${index + 1}: birthdate = ${bd}, věk = ${age.toFixed(6)} let`);
    });

    console.log("=== END main ===");
    return birthdates; // vrací jen hodnoty z testu pro kontrolu
};


