import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StadiumService } from '../../services/stadium.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-stadium',
  templateUrl: './add-stadium.component.html',
  styleUrl: './add-stadium.component.css'
})
export class AddStadiumComponent {

  selectedImages: File[] = []; // To store the selected image files

  selectedGouvernoratsName: string | null = null;

  selectedcategoryName: string | null = null;

  gouvernorats = [
    { id: 1, name: 'Tunis' },
    { id: 2, name: 'Bizerte' },
    { id: 3, name: 'Ariana' },
    { id: 4, name: 'Manouba' },
    { id: 5, name: 'Sfax' },
  ];

  categorys = [
    { id: 1, name: 'Football' },
    { id: 2, name: 'Basketball' },
    { id: 3, name: 'Handball' },
    { id: 4, name: 'Volleyball' },
    { id: 5, name: 'Natation' },
    { id: 6, name: 'Baby swimming' },
  ];

  generalForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private stadiumService : StadiumService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Initialize the form group with controls and validators
    this.generalForm = this.fb.group({
      name: ['', Validators.required],

      address: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      matchDuration: ['', [Validators.required]],
      breakDuration: ['', [Validators.required]],
      openingTime: ['', [Validators.required]],
      closingTime: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.generalForm.markAllAsTouched();
    
    
    if (this.generalForm.valid) {
      const data = this.generalForm.value;
      this.stadiumService.createStadium(data).subscribe(
        (response) => {
          console.log("Registration successful")
          this.toastr.success('Stadium added successfully!', 'Success');
          this.generalForm.reset();
        },
        (error) => {
          this.toastr.error('Failed to add stadium.', 'Error');
          console.error('Registration failed', error);
        }
      );
    } else {
      this.toastr.warning('Please fill out all required fields.', 'Validation Warning');
    }
  }

  // onSubmit() {
  //   //  // Append selected images (if any) to the FormData object
  //   //  for (let i = 0; i < this.selectedImages.length; i++) {
  //   //   formData.append('images', this.selectedImages[i], this.selectedImages[i].name);
  //   // }
  //   this.generalForm.markAllAsTouched();
    


  //   if (this.generalForm.valid) {
  //     // const formData = this.generalForm.value;
  //     let formData = new FormData();

  //     // Append form fields to the FormData object
  //     Object.keys(this.generalForm.value).forEach(key => {
  //       formData.append(key, this.generalForm.value[key]);
  //     });



  //     formData.append("category", this.selectedcategoryName ?? '');
  //     formData.append("gouvernorat", this.selectedGouvernoratsName ?? '');

  //     this.stadiumService.createStadium(formData).subscribe(
  //       (response) => {
  //         console.log('Registration successful', response);
  //       },
  //       (error) => {
  //         console.error('Registration failed', error);
  //       }
  //     );
  //   }
  // }

  oncategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedcategoryName = selectElement.value;
  }

  onGouvernoratsChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedGouvernoratsName = selectElement.value;
  }

  

  onImagesChanged(files: File[]) {
    this.selectedImages = files; // Capture selected image files
  }


  get name() {
    return this.generalForm.get('name');
  }
  
  get address() {
    return this.generalForm.get('address');
  }
  
  get capacity() {
    return this.generalForm.get('capacity');
  }
  
  get description() {
    return this.generalForm.get('description');
  }
  
  get latitude() {
    return this.generalForm.get('latitude');
  }
  
  get longitude() {
    return this.generalForm.get('longitude');
  }
  
  get phone() {
    return this.generalForm.get('phone');
  }
  
  get email() {
    return this.generalForm.get('email');
  }
  
  get matchDuration() {
    return this.generalForm.get('matchDuration');
  }
  
  get breakDuration() {
    return this.generalForm.get('breakDuration');
  }
  
  get openingTime() {
    return this.generalForm.get('openingTime');
  }
  
  get closingTime() {
    return this.generalForm.get('closingTime');
  }

}
