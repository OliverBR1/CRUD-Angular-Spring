import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { CoursesService } from '../services/courses.service';
import { Course } from '../models/course';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  displayedColumns = ['name' , 'category', 'actions'];

  //coursesService: CoursesService;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route : ActivatedRoute
    ) {
    // this.courses = [] estou inicializando o Course[], mas também pode ser inicializado igaul a linha 11;
    //this.coursesService = new CoursesService();
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(_error => {
        this.onError('Erro ao carregar cursos. ');
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {

  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo:this.route}); // relativeTo pega o rota em que estou agora e só adiciona o 'new'
  }

}
