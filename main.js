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
    console.log("Generované birthdates:", birthdates.slice(0, 5), "... (celkem " + birthdates.length + ")");

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

