import { Injectable } from '@angular/core';
import { CabinetInterface } from './dataInterfaces/cabinet';
import { PatientInterface​ } from './dataInterfaces/patient';
import { InfirmierInterface​ } from './dataInterfaces/nurse';
import​ { sexeEnum ​} from './dataInterfaces/sexe';
import {Http,Response} from "@angular/http";
import {Adresse} from "./dataInterfaces/adress";
import {NgForm} from "@angular/forms";


@Injectable()
export class CabinetMedicalService {

  constructor(private http: Http) {
  }

  getData(url: string): Promise<CabinetInterface> {
    return this.http.get(url).toPromise().then(res => {
      const text = res.text(); // Le texte du documment cabinet mmedical
      const parser = new DOMParser();
      const doc = parser.parseFromString(res.text(), "text/xml");
      console.log(doc);
      if (doc) {
        const cabinet: CabinetInterface = {
          infirmiers: [],
          patientsNonAffectés: [],
          adresse: this.getAdressFrom(doc.querySelector("cabinet"))
        };

        const infirmiersXML = Array.from(doc.querySelectorAll("infirmiers > infirmier"));
        cabinet.infirmiers = infirmiersXML.map(infirmierXML => ({
          id: infirmierXML.getAttribute("id"),
          nom: infirmierXML.querySelector("nom").textContent,
          prénom: infirmierXML.querySelector("prénom").textContent,
          adresse: this.getAdressFrom(infirmierXML.querySelector("adresse")),
          photo: infirmierXML.querySelector("photo").textContent,
          patients: []
        }));

        const patientsXML = Array.from(doc.querySelectorAll("patients > patient"));
        const patients: PatientInterface[] = patientsXML.map(patientXML => ({
          prénom: patientXML.querySelector("prénom").textContent,
          nom: patientXML.querySelector("nom").textContent,
          sexe: this.getSexeFrom(patientXML.querySelector("sexe")),
          numéroSécuritéSociale: patientXML.querySelector("numéro").textContent,
          adresse: this.getAdressFrom(patientXML.querySelector("adresse"))
        }));

        // Tableau des affectations

        let affectations: { inf: InfirmierInterface, pat: PatientInterface​ }[];
        affectations = patientsXML.map(patientXML => {
          const numSecu = patientXML.querySelector("numéro").textContent;
          const patient = patients.find(P => P.numéroSécuritéSociale === numSecu);
          const idInf = patientXML.querySelector("visite").getAttribute("intervenant");
          const inf = cabinet.infirmiers.find(i => i.id === idInf);
          return {inf: inf, pat: patient};
        });

        affectations.forEach(aff => {
          if (aff.inf) {
            aff.inf.patients.push(aff.pat);
          } else {
            cabinet.patientsNonAffectés.push(aff.pat);
          }
        })


        return cabinet;
      }
      return null;
    });
  }

  getAdressFrom(root: Element): Adresse {
    let node: Element;
    return {
      ville: (node = root.querySelector("adresse > ville")) ? node.textContent : "",
      codePostal: (node = root.querySelector("adresse > codePostal")) ? parseInt(node.textContent, 10) : 0,
      rue: (node = root.querySelector("adresse > rue")) ? node.textContent : "",
      numéro: (node = root.querySelector("adresse > numéro")) ? node.textContent : "",
      étage: (node = root.querySelector("adresse > étage")) ? node.textContent : "",
      lat: undefined,
      lng: undefined,
    };
  }

  getSexeFrom(root: Element): sexeEnum {
    if (root.textContent === 'M') {
      return sexeEnum.M;
    } else {
      return sexeEnum.F;
    }
  }

  addPatient(formPatient: NgForm​): Promise<PatientInterface​> {
    let formData = formPatient.form.controls;
    let auxData = {};
    for (let patientData in formData) {
      auxData[patientData] = formData[patientData].value;
    }
    return this.http.post("./addPatient", auxData).toPromise().then(() => {
      let PatientCreat: PatientInterface = {
        prénom: auxData["patientForname"],
        nom: auxData["patientName"],
        sexe: auxData["patientSex"] === "M" ? sexeEnum.M : sexeEnum.F,
        numéroSécuritéSociale: auxData["patientNumber"],
        adresse: {
          ville: auxData["patientCity"],
          codePostal: +auxData["patientPostalCode"],
          rue: auxData["patientStreet"],
          numéro: "",
          étage: auxData["patientFloor"],
          lat: 0,
          lng: 0
        }
      };
      return PatientCreat;
    });
  }

  affectPatient(patient: PatientInterface​, infirmier: InfirmierInterface​): Promise<Response> {
    let id: string = "";
    if (infirmier !== null) {
      id = infirmier.id;
    }
    return this.http.post("./affectation", {
      infirmier: id,
      patient: patient.numéroSécuritéSociale
    }).toPromise();
  }

  deleteAffectPatient(patient: PatientInterface​, infirmier: InfirmierInterface): Promise<Response> {

    let id: string = "d";
    if (infirmier !== null) {
      id = "none";
    }
    return this.http.post("./affectation", {
      infirmier: id,
      patient: patient.numéroSécuritéSociale
    }).toPromise();

  }
}
