import { Component, OnInit, ViewEncapsulation,} from '@angular/core';
import {InfirmierInterface} from "../dataInterfaces/nurse";
import {Adresse​} from "../dataInterfaces/adress";
import {PatientInterface​} from "../dataInterfaces/patient";
import {CabinetMedicalService} from "../cabinet-medical.service";

import{CabinetInterface} from "../dataInterfaces/cabinet"


@Component({
  selector: 'formulaire-patient',
  templateUrl: './formulaire-patient.component.html',
  styleUrls: ['./formulaire-patient.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormulairePatientComponent implements OnInit {
  cabinet: CabinetInterface = {
    patientsNonAffectés: [],
    infirmiers: [],
    adresse:undefined,
  }

  state :boolean=false;
  constructor(private cb:CabinetMedicalService) {
    cb.getData("data/cabinetInfirmier.xml").then( cabinet => {
      this.cabinet = cabinet;
      this.state=true;
    })
  }

  ngOnInit() {
  }

}
