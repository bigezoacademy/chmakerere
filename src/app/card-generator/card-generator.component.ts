import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-card-generator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './card-generator.component.html',
  styleUrls: ['./card-generator.component.css']
})
export class CardGeneratorComponent {
  guestName: string = '';

  downloadAsPDF() {
    const cardElement = document.getElementById('card') as HTMLElement;

    html2canvas(cardElement, {
      scale: 3, // Increase scale to preserve image quality
      useCORS: true // Enable cross-origin image loading
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0); // Set quality to max (1.0)
      const pdf = new jsPDF('landscape', 'px', [842, 595]); // A4 size in px
      const imgWidth = 842;
      const imgHeight = canvas.height * (imgWidth / canvas.width);
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('card.pdf');
    });
  }

  downloadAsImage() {
    const cardElement = document.getElementById('card') as HTMLElement;

    html2canvas(cardElement, {
      scale: 3, // Higher scale to retain image resolution
      useCORS: true // Enable cross-origin image loading
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0); // Max quality
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'card.png';
      link.click();
    });
  }
}
