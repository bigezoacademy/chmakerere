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

    html2canvas(cardElement, { scale: 1.5 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'px', [842, 595]);
      const imgWidth = 842;
      const imgHeight = canvas.height * (imgWidth / canvas.width);
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('card.pdf');
    });
  }

  downloadAsImage() {
    const cardElement = document.getElementById('card') as HTMLElement;

    html2canvas(cardElement, { scale: 1.5 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'card.png';
      link.click();
    });
  }
}
