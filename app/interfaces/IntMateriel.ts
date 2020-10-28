import { Injectable } from '@angular/core';

export interface objMateriel {
    id_materiel: string,
    type: string,
    modele: string,
    N_serie: string,
    id_utilisateur: string,
    etat: string
}

@Injectable()
export abstract class IntMaterielService {
  /**
   * Returns a list of all of the current user's todos.
   */
  abstract getObj(): objMateriel[];
}