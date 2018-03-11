import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Adresse​} from "../dataInterfaces/adress";
import {PatientInterface​} from "../dataInterfaces/patient";
import {sexeEnum} from "../dataInterfaces/sexe";
import {CabinetMedicalService} from "../cabinet-medical.service";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {InfirmierInterface​} from "../dataInterfaces/nurse";


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PatientComponent implements OnInit {

  patient: PatientInterface [] = [];
  infirmier: InfirmierInterface​ [] =[];

  state:boolean=false;
  constructor(private cb:CabinetMedicalService) {
    cb.getData("data/cabinetInfirmier.xml").then( cabinet => {
      this.patient = cabinet.patientsNonAffectés;
      this.infirmier =cabinet.infirmiers;
    })
  }

  ngOnInit() {
  }

}
