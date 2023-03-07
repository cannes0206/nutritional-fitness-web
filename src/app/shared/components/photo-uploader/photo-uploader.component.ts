import { Component, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { FileItem, FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.scss']
})
export class PhotoUploaderComponent {
  private readonly allowedMimeType = ['image/jpg', 'image/jpeg'];

  uploader: FileUploader = new FileUploader({ allowedMimeType: this.allowedMimeType });
  showExtErrorMessage: boolean = false;
  imageUrl: string = '';

  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef;
  @Output() uploadedFile: EventEmitter<File> = new EventEmitter();

  constructor() {
    this.uploader.onWhenAddingFileFailed = () => {
      this.showExtErrorMessage = true;
      this.imageUrl = '';
    };

    this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
      this.showExtErrorMessage = false;
      this.imageUrl = window.URL ? window.URL.createObjectURL(fileItem._file) : (window as any).webkitURL.createObjectURL(fileItem._file);
      this.uploadedFile.emit(fileItem._file);
    };
  }

  photoSelected(): void {
    this.fileInput.nativeElement.value = '';
  }
}
