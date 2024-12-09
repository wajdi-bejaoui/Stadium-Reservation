import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Output() imagesChanged = new EventEmitter<File[]>();
  selectedFiles: File[] = [];

  handleImageChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      this.selectedFiles = Array.from(fileInput.files); // Store the selected files in the array
      this.imagesChanged.emit(this.selectedFiles); // Emit the files to the parent component
    }
  }

  ImageToUrl(file: File): void {
    let imageUrl;

    if (file) {
      const reader = new FileReader();

      // Event listener to capture the file data when it’s read
      reader.onload = () => {
        imageUrl = reader.result; // Set the image URL to the result
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
    return imageUrl;
  }


  private emitImages(): void {
    this.imagesChanged.emit(this.selectedFiles);
  }
}
