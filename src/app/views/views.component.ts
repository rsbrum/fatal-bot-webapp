import { Component, OnInit } from '@angular/core';
import { PostsService } from '@core/posts.service';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css']
})
export class ViewsComponent implements OnInit {

  /*
  @TODO
  -Validate post link
  -Add spinner to 'Curtir' button
  -Mobile version
  -Success message 
  -Error message
  -deploy it
  */

  mode = 'side';
  nCurtidas = [10, 20, 30, 40, 50];
  nCurtida: Number = null;
  error: Boolean = false;
  clicked: Boolean = false;
  spinner: Boolean = false;
  postLink: string;
  postForm: any;
  invalidLink: boolean;
  apiError: boolean;

  configureSideNav() {

  }

  constructor(
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.onResize();
    this.postForm = this.formBuilder.group({
      postLink: ['', Validators.required],
      nCurtidas: [0, Validators.required]
    });
  }

  openSnackBar() {
    this.snackBar.open('Post adiciona a fila!', 'Ok', {
      duration: 2000,
      panelClass: ['snackbar']
    });
  }

  onResize() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    console.log(width);
    if (width > 959) {
      this.mode = 'side';
    } else {
      this.mode = 'over';
    }
  }

  submitPost(): void {
    this.clicked = true;
    this.apiError = false;
    if (!this.validateLink(this.postForm.get('postLink').value)) {
      this.invalidLink = true;
      return;
    }

    this.invalidLink = false;

    if (this.postForm.get('nCurtidas').value == 0)
      return;

    this.clicked = false;
    this.spinner = true;

    this.postsService.postPost(this.postForm.get('postLink').value, this.postForm.get('nCurtidas').value)
      .subscribe(
        res => {
          this.apiError = false;
          this.openSnackBar();
          this.postForm.reset();
        },
        err => {
          this.apiError = true;
          this.postForm.reset();
        }
      );

    this.spinner = false;
  }

  validateLink(link) {
    //25829/marty-passo-fundo/2857636
    var str = 'https://fatalmodel.com/';
    var len = str.length;
    console.log('called')
    for (var x = 0; x < len; x++) {
      if (str[x] != link[x])
        return false
    }
    return true
  }

  ngOnInit() {
  }

}

