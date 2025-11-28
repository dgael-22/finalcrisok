import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    user = {
        name: '',
        email: '',
        password: ''
    };
    errorMessage = '';

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit(): void { }

    onSubmit(): void {
        if (!this.user.name || !this.user.email || !this.user.password) {
            this.errorMessage = 'Por favor completa todos los campos.';
            return;
        }
        this.apiService.registerUser(this.user).subscribe(
            (response: any) => {
                alert('Usuario registrado con éxito!');
                this.router.navigate(['/']);
            },
            (error: any) => {
                console.error(error);
                this.errorMessage = 'Error al registrar usuario. Intenta nuevamente.';
            }
        );
    }
}
