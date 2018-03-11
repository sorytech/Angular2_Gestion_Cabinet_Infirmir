import {Component, Input, OnInit, ViewEncapsulation,  Output, EventEmitter } from '@angular/core';
import {InfirmierInterface} from "../dataInterfaces/nurse";
import {Adresse​} from "../dataInterfaces/adress";
import {PatientInterface​} from "../dataInterfaces/patient";
import {CabinetMedicalService} from "../cabinet-medical.service";
import {NgForm} from "@angular/forms" ;


@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InfirmierComponent implements OnInit {
  //public AdresseInfirmier :string="";
  public photo :string="data/";
  infirmier: InfirmierInterface [] = [];
  @Output() patientEmit= new EventEmitter();
  newPatient :PatientInterface​;

  constructor(private cb:CabinetMedicalService) {
    cb.getData("data/cabinetInfirmier.xml").then( cabinet => {
      this.infirmier = cabinet.infirmiers;
      console.log(this.infirmier);
    })
  }
  addPatientformulaire(patientform:NgForm){
  this.cb.addPatient(patientform).then((patient:PatientInterface​)=>{
  this.newPatient=patient;
  console.log("New Patient add succes "+patient);
  this.patientEmit.emit(this.newPatient);

});
    patientform.reset();
  }

  ngOnInit() {
  }

}
