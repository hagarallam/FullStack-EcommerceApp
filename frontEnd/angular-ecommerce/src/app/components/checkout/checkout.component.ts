import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { HKShopFormService } from 'src/app/services/hkshop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number = 0;

  checkoutFormGroup !: FormGroup;

  creaditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingStates : State[] = [];
  billingStates : State[] = [];

  constructor(private formBuilder: FormBuilder,
    private hkShopService: HKShopFormService
  ) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group(
      {
        customer: this.formBuilder.group({
          firstName: [''],
          lastName: [''],
          email: ['']
        }),
        shippingAddress: this.formBuilder.group({
          street: [''],
          city: [''],
          state: [''],
          country: [''],
          zipCode: ['']

        }),
        billingAddress: this.formBuilder.group({
          street: [''],
          city: [''],
          state: [''],
          country: [''],
          zipCode: ['']

        }),
        creditCard: this.formBuilder.group({
          cardType: [''],
          nameOnCard: [''],
          cardNumber: [''],
          securityCode: [''],
          expirationMonth: [''],
          expirationYear: ['']
        })
      });


    // popualte mmonths & years 
    const startMonth: number = new Date().getMonth() + 1;
    this.hkShopService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    );

    this.hkShopService.getCreditCardYears().subscribe(
      data => this.creaditCardYears = data
    );

    // get countries 
    this.hkShopService.getCountries().subscribe(
      data => this.countries = data
    );

  }

  onSubmit() {
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }





  copyShippingAddressToBillingAddress(event: Event) {
    const target = event.target as HTMLInputElement
    if (target && target.checked !== undefined) {
      if (target.checked) {
        this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      
        this.billingStates = this.shippingStates;
      }


      else {
        this.checkoutFormGroup.controls['billingAddress'].reset();
        this.billingStates = [] ; 
      }
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    if (creditCardFormGroup) {
      const currentYear: number = new Date().getFullYear();
      const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

      let startMonth: number = 1;
      if (currentYear === selectedYear) {
        startMonth = new Date().getMonth() + 1;
      }
      else {
        startMonth = 1;
      }

      this.hkShopService.getCreditCardMonths(startMonth).subscribe(
        data => this.creditCardMonths = data
      );
    }
  }

  getStates(formGroupName: string) {  
    const formGroup = this.checkoutFormGroup.get(formGroupName);


    const countryCode = formGroup?.value.country.code;   

    this.hkShopService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress'){
            this.shippingStates = data;
        }
        else{
          this.billingStates = data;
        }
        formGroup?.get("state")?.setValue(data[0]);
      }
    );
  }

}
