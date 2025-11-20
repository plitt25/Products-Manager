import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Servicio simple para manejar la autenticación con datos quemados.
 * En una aplicación real, esto se reemplazaría por llamadas a una API de autenticación.
 */
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // Credenciales quemadas (Hardcoded)
  private readonly validUsername = 'admin';
  private readonly validPassword = '12345';

  // Estado reactivo de la sesión usando Angular Signals
  isLoggedIn = signal(false);

  constructor(private router: Router) {
    // Inicializa el estado (útil para revisar si hay sesión activa en un entorno real)
    // Para esta demo simple, siempre inicia en false.
  }

  /**
   * Intenta autenticar al usuario.
   * @param user Nombre de usuario.
   * @param pass Contraseña.
   * @returns true si las credenciales son válidas, false en caso contrario.
   */
  login(user: string, pass: string): boolean {
    if (user === this.validUsername && pass === this.validPassword) {
      this.isLoggedIn.set(true);
      return true;
    }
    this.isLoggedIn.set(false);
    return false;
  }

  /**
   * Cierra la sesión y redirige al login o a la página principal.
   */
  logout(): void {
    this.isLoggedIn.set(false);
    this.router.navigate(['/admin']);
  }

  /**
   * Verifica si el usuario está autenticado.
   */
  checkAuth(): boolean {
    return this.isLoggedIn();
  }
}
