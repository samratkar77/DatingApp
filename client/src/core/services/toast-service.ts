import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {
    this.createToastContainer();
  }

  // private createToastContainer() {
  //   if (!document.getElementById('toast-container')) {
  //     const container = document.createElement('div');
  //     container.id = 'toast-container';
  //     // container.className = 'toast toast-bottom toast-end';
  //     container.className = 'toast toast-top toast-center';
  //     document.body.appendChild(container);
  //   }
  // }
  private createToastContainer() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-bottom toast-left show';
      document.body.appendChild(container);
    }
  }

  private createToastElement(
    message: string,
    alertclass: string,
    duration = 5000
  ) {
    this.createToastContainer();
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.classList.add('alert', alertclass);
    toast.style.marginBottom = '0';
    toast.innerHTML = `
      <span>${message}</span>
      <button class="ml-4 btn btn-sm btn-ghost" >x</button>`;
    toast.querySelector('button')?.addEventListener('click', () => {
      toastContainer.removeChild(toast);
      if (toastContainer.childElementCount === 0) {
        toastContainer.remove();
      }
    });
    toastContainer.append(toast);

    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
        if (toastContainer.childElementCount === 0) {
          toastContainer.remove();
        }
      }
    }, duration);
  }

  // private createToastElement(
  //   message: string,
  //   alertclass: string,
  //   duration = 5000
  // ) {
  //   this.createToastContainer();
  //   const toastContainer = document.getElementById('toast-container');
  //   if (!toastContainer) return;

  //   const toast = document.createElement('div');
  //   toast.style.background = 'black';
  //   toast.style.color = 'white';
  //   toast.style.padding = '1rem';
  //   toast.style.margin = '1rem';
  //   toast.style.borderRadius = '0.5rem';
  //   toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
  //   toast.style.pointerEvents = 'auto'; // allow interaction with the toast
  //   toast.innerText = message;
  //   toastContainer.append(toast);

  //   setTimeout(() => {
  //     if (toastContainer.contains(toast)) {
  //       toastContainer.removeChild(toast);
  //     }
  //   }, duration);
  // }

  success(message: string, duration?: number) {
    console.log('ToastService.success called with:', message);
    this.createToastElement(message, 'alert-success', duration);
  }

  error(message: string, duration?: number) {
    console.log('ToastService.error called with:', message);
    this.createToastElement(message, 'alert-error', duration);
  }

  warning(message: string, duration?: number) {
    this.createToastElement(message, 'alert-warning', duration);
  }

  info(message: string, duration?: number) {
    this.createToastElement(message, 'alert-info', duration);
  }
}
