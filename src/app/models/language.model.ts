export interface Language {
    label : string;
    intitule : string;
    imageUrl : string;
}

export const languageList : Language[] = [
    {
        label : "fr",
    intitule : "français",
    imageUrl : "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/255px-Flag_of_France.svg.png"
    },
    {
        label : "en",
    intitule : "english",
    imageUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/255px-Flag_of_the_United_Kingdom_%281-2%29.svg.png"
    },
    {
        label : "es",
    intitule : "español",
    imageUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/200px-Bandera_de_Espa%C3%B1a.svg.png"
    }
]