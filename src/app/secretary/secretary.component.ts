import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {CabinetMedicalService} from "../cabinet-medical.service";
import {InfirmierInterface} from "../dataInterfaces/nurse";
import {Adresse​} from "../dataInterfaces/adress";
import {PatientInterface​} from "../dataInterfaces/patient"
import {MatTableDataSource, MatSort} from '@angular/material';


@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SecretaryComponent implements OnInit {

  cabinet: CabinetInterface = {
    patientsNonAffectés: [],
    infirmiers: [],
    adresse:undefined,
  }
  state:boolean=false;
  patientTab: PatientInterface [] = [];
  constructor(private cb:CabinetMedicalService) {
    cb.getData("data/cabinetInfirmier.xml").then( cabinet => {
      this.cabinet=cabinet;
      this.state=true;
      console.log("Moi test", this.patientTab);
    })
  }
  private getinfirmiers(): InfirmierInterface​[] {
    return this.cabinet.infirmiers;
  }
  private getpatients(): PatientInterface​[] {
    return this.cabinet.patientsNonAffectés;
  }



  private AffecPatientSecretaire(data: {patient: PatientInterface, nurseAssign: InfirmierInterface}, nurseToDoAssign: InfirmierInterface) {
    console.log("Affecter", data.patient, "de", data.nurseAssign, "à", nurseToDoAssign);
    let indexNurse : number;

    this.cb.affectPatient(data.patient, nurseToDoAssign).then( () => {
      if (nurseToDoAssign === null ) {
        this.cabinet.patientsNonAffectés.push(data.patient);

      } else {
        indexNurse = this.cabinet.infirmiers.indexOf(nurseToDoAssign);
        this.cabinet.infirmiers[indexNurse].patients.push(data.patient);
      }

      if (data.nurseAssign === null) {
        this.cabinet.patientsNonAffectés.splice(this.cabinet.patientsNonAffectés.indexOf(data.patient),1);
      } else {
        indexNurse = this.cabinet.infirmiers.indexOf(data.nurseAssign);
        let indexpatient= this.cabinet.infirmiers[indexNurse].patients.indexOf(data.patient);
        this.cabinet.infirmiers[indexNurse].patients.splice(indexpatient,1);
      }
    });
  }



  ngOnInit() {

  }
}


