import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpBaseService } from './services/http-base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public Editor = ClassicEditor;

  public htmlData = '<p>Hello, world!</p>';

  public config = {
    toolbar: []
  };

  constructor(
    private _httpService: HttpBaseService
  ) {

  }


  mostrarData() {
    console.log(this.htmlData);

  }

  setData() {
    this._httpService.postMethod({}).subscribe(response => {
      console.log(response);
      this.htmlData = response.data;
    });
  }
}
