export class Projet {
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
    pays?: Pays[];
    composantes?: any[];
    secteurs?: any[];
    structureResps?: string;
    indicateurs?: any[];
    documents?: any[];
    financements?: any[];
    image: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
        this.idProjet =0;
        this.numProjet= '';
      this.contrePartieEtat= 0;
      this.dateApprobation= null;
      this.dateCloturePrev= null;
      this.dateClotureEff= null;
      this.budjetProjet= 0;
      this.nomProjet= '';
      this.statut= '';
      this.acteurFinance= '';
      this.descriptionProjet= '';
      this.coordonnateurProjet= '';
      this.categorieEnv= '';
      this.objectifGeneral= '';
      this.objectifSpecs= [];
      this.ciblesProjets= [];
      this.infosAdds= [];
      this.contacts= [];
      this.experts= [];
      this.pays= [];
      this.composantes= [];
      this.secteurs= [];
      this.structureResps ='';
      this.indicateurs=[];
      this.documents=[];
      this.financements= [];
    }
}

interface Pays {
    idPays: number;
    codePays: string;
    nomPays: string;
}
