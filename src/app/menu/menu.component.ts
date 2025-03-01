import { Component, OnInit } from '@angular/core';
import { MenuItemComponent } from "../menu-item/menu-item.component";
import { ItemfetchService } from '../services/itemfetch.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [MenuItemComponent, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  items: any[]=[];

  constructor(private itemFetchService: ItemfetchService) {}
  
  ngOnInit(): void {
    this.itemFetchService.getItems().subscribe(data=> {
      this.items = data.map(item=> ({
        ...item, 
        customizations: item.customizations || []
      }));
      console.log(this.items)
    });
  }
  
}
