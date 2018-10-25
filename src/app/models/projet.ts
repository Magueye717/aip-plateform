export interface Projet {
    idProjet?: number;
    numProjet?: string;
    contrePartieEtat?: number;
    dateApprobation?: Date;
    dateCloturePrev?: Date;
    dateClotureEff?: Date;
    budjetProjet?: number;
    nomProjet?: string;
    statut?: string;
    acteurFinance?: string;
    descriptionProjet?: string;
    coordonnateurProjet?: string;
    categorieEnv?: string;
    objectifGeneral?: string;
    objectifSpecs?: any[];
    ciblesProjets?: any[];
    infosAdds?: any[];
    contacts?: any[];
    experts?: any[];
    pays?: any[];
    composantes?: any[];
    secteurs?: any[];
    structureResps?: string;
    indicateurs?: any[];
    documents?: any[];
}



