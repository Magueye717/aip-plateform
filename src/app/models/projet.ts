export interface Projet {
    idProjet: number;
    numProjet: string;
    contrePartieEtat: number;
    dateApprobation: Date;
    dateCloturePrev: Date;
    dateClotureEff: Date;
    budjetProjet: number;
    nomProjet: string;
    statut: string;
    acteurFinance: string;
    descriptionProjet: string;
    coordonnateurProjet: string;
    categorieEnv: string;
    objectifGeneral: string;
}

export interface ProjetResponse {
    results: Projet[];
    count: number;
}