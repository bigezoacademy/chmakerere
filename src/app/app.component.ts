import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CardGeneratorComponent } from "./card-generator/card-generator.component";
import { SupabaseService } from './supabase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CardGeneratorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pagetitle = 'ecard';
  title = '';
  visitorCount: number = 0;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    // Get the current visitor count on page load
    this.visitorCount = await this.supabaseService.getVisitorCount();

    // Increment the visitor count for every new visit
    await this.supabaseService.incrementVisitorCount();

    // Fetch the updated count after incrementing
    this.visitorCount = await this.supabaseService.getVisitorCount();
  }
}
