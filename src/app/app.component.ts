import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { NgReactiveFormValidatorService } from "ng-reactive-form-validator";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "CodeSandbox";
  public formObj: FormGroup;
  public addressArray: FormArray;
  public formError: any = {};
  private _formErrorMessage = {
    name: {
      required: "You have to mention name"
    },
    email: {
      required: "You have to mention email",
      email: "Your email id is not valid"
    },
    addresses: [
      {
        stNo: {
          required: "St no is required"
        },
        doorNo: {
          required: "Door no is required"
        },
        pinNo: {
          required: "Pin no is required"
        }
      }
    ]
  };
  constructor(
    public formBuilder: FormBuilder,
    public validatorService: NgReactiveFormValidatorService
  ) {}

  ngOnInit() {
    this.formObj = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      addresses: this.formBuilder.array([this.createAddress()])
    });

    this.addressArray = this.formObj.get("addresses") as FormArray;
  }

  createAddress(): FormGroup {
    return this.formBuilder.group({
      stNo: [null, Validators.required],
      doorNo: [null, Validators.required],
      pinNo: ["", Validators.required]
    });
  }

  addAddress(): void {
    this.addressArray = this.formObj.get("addresses") as FormArray;
    this.addressArray.push(this.createAddress());
  }

  saveForm() {
    if (this.formObj.valid) {
    } else {
      this.formError = this.validatorService.validationError(
        this.formObj,
        this._formErrorMessage
      );
    }
  }
}
