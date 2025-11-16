//TODO add imports if needed
//TODO doc
/**
*konstanta, která slouží pro vstupní data
*@type {object}
*@property {number} pocet -  je námi požadovaný počet zaměstnanců
*@property {object} vek - věkové rozmezí
*@property {number} vek.minimal -  minimální věk
*@property {number} vek.maximal - maximální věk
*/
const dtoIn ={
    count: 50,
    vek: {
        min: 19,
        max: 35
    }
};
/**
*konstanta, která slouží pro generování pohlaví
*@type {object}
*@property {string} [0] - muž
*@property {string} [1] - žena
*/
const pohlavi = ["male", "female"];

/**
*konstanta, která slouží pro charakterizaci úvazek
*@type {array{typZ: string}
*/
const uvazek = [10, 20, 30, 40];
/**
*konstanta, ve které jsou uloženy mužská jména
*@type {string[]}
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
*konstanta, ve které jsou uloženy ženská jména
*@type {string[]}
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
*konstanta, pole, dělící se na další pole obsahující mužský a ženský rod
*@type {string[[],[]]}
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
]
/**
funkce pro vytvoření náhodného prvku
@param {array} - to z čeho chceme vybírat
*/
const randomPrvek = (array) => array[Math.floor(Math.random() * array.length)];
/**
funkce pro vytvoření náhodného datumu
@param {number} minimal - minimální věk
@param {number} maximal - maximální věk
*/
const randomCas = (minimal, maximal) => {
    const dnes = new Date();
    const currentYear = dnes.getFullYear();

    // minimal a maximal jsou věky, takže rok narození = currentYear - věk
    const maxBirthYear = currentYear - minimal;
    const minBirthYear = currentYear - maximal;

    // generujeme náhodný rok, měsíc, den
    const year = Math.floor(Math.random() * (maxBirthYear - minBirthYear + 1)) + minBirthYear;
    const month = Math.floor(Math.random() * 12); // 0-11
    const day = Math.floor(Math.random() * 28) + 1; // bezpečně 1-28, aby měsíc vždy seděl

    const birthDate = new Date(year, month, day);
    return birthDate.toISOString();
};









/**
 * The main function which calls the application. 
 * Please, add specific description here for the application purpose.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */
export function main(dtoIn) {
    const {count, vek = {} } = dtoIn;
    const {min: minimal, max: maximal} = vek;
    const dtoOut = [];
    let sex;
    let jmeno;
    let prijmeniV;
    for(let i = 0; i < count; i++){
        sex = randomPrvek(pohlavi);
     jmeno = sex === "male" ? randomPrvek(jmenaM) : randomPrvek(jmenaZ);
    prijmeniV = sex === "male" ? randomPrvek(prijmeni)[0] : randomPrvek(prijmeni)[1];
        dtoOut.push({
            gender: sex,
            birthdate: randomCas(minimal, maximal),
            name: jmeno,
            surname: prijmeniV,
            workload: randomPrvek(uvazek)
        });
    }
    return dtoOut;
}
