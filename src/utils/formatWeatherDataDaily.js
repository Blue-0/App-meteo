export const formatWeatherDataDaily =(data) => {
    const dataDaily = [];

    const dataEntries = Object.keys(data);

    dataEntries.forEach((key, keyIndex) => {
        for (let i = 0; i < data[key].length; i++) {
            if (keyIndex === 0){
                dataDaily.push({});
            }
        
        const dayValue = data[key][i];
        dataDaily[i][key] = dayValue;

        
        }
    })

//fench day

    dataDaily.forEach((data)=>{
        const date = new Date(data.time);
        const dayIndex = date.getDay();
        data.day = frenchDays[dayIndex];
    });
return dataDaily;
};

const frenchDays = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
]